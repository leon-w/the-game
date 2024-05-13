import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { BarBottom, BarCenter, BarTop } from "./components/Bar/Bar";
import { CardArea } from "./components/CardArea/CardArea";
import { DiscardArea } from "./components/DiscardArea/DiscardArea";
import { Overlay } from "./components/Overlay/Overlay";
import { useSettingsStore } from "./settings";

export default function Game() {
    const dragAndDrop = useSettingsStore(state => state.dragAndDrop);

    const game = (
        <>
            <Overlay />
            <BarTop />
            <DiscardArea />
            <BarCenter />
            <CardArea />
            <BarBottom />
        </>
    );

    if (!dragAndDrop) {
        return game;
    } else {
        return <DndProvider backend={window.ontouchstart ? TouchBackend : HTML5Backend}>{game}</DndProvider>;
    }
}
