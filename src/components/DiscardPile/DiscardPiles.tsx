import { useDrop } from "react-dnd";

import { Card, CardBorder, CardPlaceholder } from "../Card/Cards";
import { canPlaceCard, useGameStore } from "../../gameState";
import { useSettingsStore } from "../../settings";

function ClickableDiscardPile({ i }: { i: number }) {
    const selectedCard = useGameStore(state => state.selectedCard);
    const selectCard = useGameStore(state => state.selectCard);

    const discardPiles = useGameStore(state => state.discardPiles);
    const placeCard = useGameStore(state => state.placeCard);

    const topCard = discardPiles[i][discardPiles[i].length - 1];

    const active = Boolean(selectedCard) && canPlaceCard(selectedCard, discardPiles, i);
    function handleClick() {
        if (active) {
            placeCard(selectedCard, i);
            selectCard(0);
        }
    }

    return (
        <div onClick={handleClick} style={{ cursor: active ? "pointer" : undefined }}>
            <CardBorder color={active ? "green" : "none"}>
                {topCard ? <Card number={topCard} /> : <CardPlaceholder />}
            </CardBorder>
        </div>
    );
}

function DroppableDiscardPile({ i }: { i: number }) {
    const discardPiles = useGameStore(state => state.discardPiles);
    const placeCard = useGameStore(state => state.placeCard);

    const topCard = discardPiles[i][discardPiles[i].length - 1] ?? 0;

    function handleDrop({ card }: { card: number }) {
        if (canPlaceCard(card, discardPiles, i)) {
            placeCard(card, i);
        }
    }

    const [{ card }, drop] = useDrop({
        accept: "card",
        drop: handleDrop,
        collect: monitor => ({
            card: monitor.getItem()?.card,
        }),
    });

    const active = Boolean(card) && canPlaceCard(card, discardPiles, i);

    return (
        <div ref={drop}>
            <CardBorder color={active ? "green" : "none"}>
                {topCard ? <Card number={topCard} /> : <CardPlaceholder />}
            </CardBorder>
        </div>
    );
}

export function InteractiveDiscardPile({ i }: { i: number }) {
    const dragAndDrop = useSettingsStore(state => state.dragAndDrop);

    if (dragAndDrop) {
        return <DroppableDiscardPile i={i} />;
    } else {
        return <ClickableDiscardPile i={i} />;
    }
}
