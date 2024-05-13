import { useDrag } from "react-dnd";
import { useGameStore } from "../../gameState";
import { useSettingsStore } from "../../settings";

import "./Cards.css";

interface CardProps {
    number: number;
}

export function Card({ number }: CardProps) {
    return (
        <div className="cardShape card">
            <span className="cardNumber">{number}</span>
        </div>
    );
}

export function CardPlaceholder() {
    return <div className="cardShape cardPlaceholder" />;
}

interface CardBorderProps {
    color: "green" | "blue" | "none";
    children: JSX.Element;
}

export function CardBorder({ color, children }: CardBorderProps) {
    const className = {
        green: "cardShape cardBorderGreen",
        blue: "cardShape cardBorderBlue",
        none: undefined,
    }[color];

    if (!className) {
        return children;
    }

    return <div className={className}>{children}</div>;
}

function DraggableCard({ number }: CardProps) {
    const handCards = useGameStore(state => state.handCards);

    const [{ opacity }, drag] = useDrag(
        () => ({
            type: "card",
            item: { card: number },
            collect: monitor => ({
                opacity: monitor.isDragging() ? 0 : 1,
            }),
        }),
        [handCards]
    );

    return (
        <div className="cardShape cardPlaceholder">
            <div style={{ cursor: "grab", opacity }} ref={drag}>
                <Card number={number} />
            </div>
        </div>
    );
}

function ClickableCard({ number }: CardProps) {
    const selectedCard = useGameStore(state => state.selectedCard);
    const selectCard = useGameStore(state => state.selectCard);

    return (
        <div style={{ cursor: "pointer" }} onClick={() => selectCard(number !== selectedCard ? number : 0)}>
            <CardBorder color={number === selectedCard ? "blue" : "none"}>
                <Card number={number} />
            </CardBorder>
        </div>
    );
}

function InteractiveCard({ number }: CardProps) {
    const dragAndDrop = useSettingsStore(state => state.dragAndDrop);

    if (dragAndDrop) {
        return <DraggableCard number={number} />;
    } else {
        return <ClickableCard number={number} />;
    }
}

export function HandCard({ index }: { index: number }) {
    const handCards = useGameStore(state => state.handCards);
    const number = handCards[index];

    return number ? <InteractiveCard number={number} /> : <CardPlaceholder />;
}
