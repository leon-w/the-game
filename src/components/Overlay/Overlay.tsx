import Confetti from "react-confetti";

import { useGameStore } from "../../gameState";

import "./Overlay.css";

export function Overlay() {
    const isWon = useGameStore(state => state.isWon());
    const isLost = useGameStore(state => state.isLost());
    const cardsRemaining = useGameStore(state => state.remainingCards());

    const newGame = useGameStore(state => state.newGame);

    if (isWon || isLost) {
        return (
            <div className="overlay">
                {isWon && <Confetti />}
                <span className="titleText">{isWon ? "You won!" : "You lost!"}</span>
                {isLost && (
                    <span className="subtitle">
                        <b>{cardsRemaining}</b> cards remaining
                    </span>
                )}
                <button className="button" onClick={newGame}>
                    New Game
                </button>
            </div>
        );
    }

    return null;
}
