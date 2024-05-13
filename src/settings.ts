import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Settings {
    dragAndDrop: boolean;
    toggleDragAndDrop: () => void;
}

export const useSettingsStore = create(
    persist<Settings>(
        set => ({
            dragAndDrop: true,
            toggleDragAndDrop: () => set(state => ({ dragAndDrop: !state.dragAndDrop })),
        }),
        {
            name: "settings",
        }
    )
);
