import { useGameStore } from "../../gameState";
import { useSettingsStore } from "../../settings";
import { Button } from "../Button/Button";

import "./Bar.css";

export function BarTop() {
    const dragAndDrop = useSettingsStore(state => state.dragAndDrop);
    const toggleDragAndDrop = useSettingsStore(state => state.toggleDragAndDrop);
    const newGame = useGameStore(state => state.newGame);

    return (
        <div className="bar barTop">
            <div>
                <span className="titleTextSmall">THE </span>
                <span className="titleText">GAME</span>
            </div>
            <div className="barTopButtonContainer">
                <Button onClick={toggleDragAndDrop}>Mode: {dragAndDrop ? "Drag & Drop" : "Clicking"}</Button>
                <Button onClick={newGame}>New Game</Button>
            </div>
        </div>
    );
}

export function BarCenter() {
    const remainingCards = useGameStore(state => state.remainingCards());
    const canUndo = useGameStore(state => state.canUndo());
    const undo = useGameStore(state => state.undo);
    const canRedraw = useGameStore(state => state.canRedraw());
    const drawNewCards = useGameStore(state => state.drawNewCards);

    return (
        <div className="bar barCenter">
            <div>
                <div>
                    <b>{remainingCards}</b> Card{remainingCards !== 1 && "s"} left
                </div>
                <div>
                    <Button onClick={undo} disabled={!canUndo}>
                        Undo
                    </Button>
                </div>
                <div>
                    <Button disabled={!canRedraw} onClick={drawNewCards}>
                        Draw Cards
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function BarBottom() {
    return (
        <div className="bar barBottom">
            <a href="https://github.com/leon-w/the-game">Github</a>
        </div>
    );
}
