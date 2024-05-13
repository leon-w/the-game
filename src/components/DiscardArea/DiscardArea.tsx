import { DirectionIndicator } from "../DirectionIndicator/DirectionIndicator";
import { InteractiveDiscardPile } from "../DiscardPile/DiscardPiles";

import "./DiscardArea.css";

export function DiscardArea() {
    return (
        <div className="discardArea">
            <div>
                <InteractiveDiscardPile i={0} />
                <DirectionIndicator asc />
                <InteractiveDiscardPile i={1} />
                <InteractiveDiscardPile i={2} />
                <DirectionIndicator />
                <InteractiveDiscardPile i={3} />
            </div>
        </div>
    );
}
