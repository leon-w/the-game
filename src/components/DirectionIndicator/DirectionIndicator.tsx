import "./DirectionIndicator.css";

interface DirectionIndicatorProps {
    asc?: boolean;
}

export function DirectionIndicator({ asc }: DirectionIndicatorProps) {
    if (asc) {
        return (
            <div className="directionIndicator">
                <span className="bigText">100</span>
                <span>⇣</span>
                <span>2</span>
            </div>
        );
    }

    return (
        <div className="directionIndicator">
            <span>99</span>
            <span>⇡</span>
            <span className="bigText">1</span>
        </div>
    );
}
