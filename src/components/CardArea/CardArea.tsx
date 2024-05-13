import { HandCard } from "../Card/Cards";

import "./CardArea.css";

export function CardArea() {
    const cardSlots = [];
    for (let i = 0; i < 8; i++) {
        cardSlots.push(<HandCard key={i} index={i} />);
    }

    return (
        <div className="cardArea">
            <div>{cardSlots}</div>
        </div>
    );
}
