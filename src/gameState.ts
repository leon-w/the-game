import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
    hiddenCards: number[];
    handCards: number[];
    discardPiles: number[][];
    placedCards: number;
    history: number[][];
    selectedCard: number;

    newGame: () => void;
    placeCard: (card: number, pile: number) => void;
    drawNewCards: () => void;
    canRedraw: () => boolean;
    remainingCards: () => number;
    undo: () => void;
    canUndo: () => boolean;
    isLost(): boolean;
    isWon(): boolean;

    selectCard: (card: number) => void;
}

export const useGameStore = create(
    persist<GameState>(
        (set, get) => {
            function initGameState() {
                const cards = Array.from({ length: 98 }, (_, i) => i + 2);
                shuffleCards(cards);
                const handCards = cards.splice(0, 8);
                return {
                    hiddenCards: cards,
                    handCards,
                    discardPiles: [[], [], [], []],
                    placedCards: 0,
                    history: [],
                    selectedCard: 0,
                };
            }

            return {
                ...initGameState(),

                newGame: () => set(initGameState()),

                placeCard: (card: number, pile: number) => {
                    const { handCards, discardPiles, placedCards, history } = get();
                    const idx = handCards.findIndex(c => c === card);
                    if (idx === -1) return;

                    if (!canPlaceCard(card, discardPiles, pile)) return;

                    const handCardsNew = [...handCards];
                    handCardsNew[idx] = 0;

                    const discardPilesNew = [...discardPiles];
                    discardPilesNew[pile] = [...discardPilesNew[pile], card];

                    const historyNew = [...history, [idx, pile, card]];

                    set({
                        handCards: handCardsNew,
                        discardPiles: discardPilesNew,
                        placedCards: placedCards + 1,
                        history: historyNew,
                    });
                },

                drawNewCards: () => {
                    if (!get().canRedraw()) return;

                    const { hiddenCards, handCards } = get();
                    const newHiddenCards = [...hiddenCards];
                    const newHandCards = handCards.map(c => c || newHiddenCards.pop() || 0);
                    set({ hiddenCards: newHiddenCards, handCards: newHandCards, placedCards: 0, history: [] });
                },

                canRedraw: () => {
                    const { placedCards, hiddenCards } = get();
                    return placedCards >= 2 && hiddenCards.length > 0;
                },

                remainingCards: () => {
                    const { hiddenCards, handCards } = get();
                    return hiddenCards.length + handCards.filter(c => c).length;
                },

                undo: () => {
                    const { handCards, discardPiles, history, placedCards } = get();
                    if (placedCards === 0 || history.length === 0) return;

                    const [idx, pile, card] = history[history.length - 1];
                    const handCardsNew = [...handCards];
                    handCardsNew[idx] = card;

                    const discardPilesNew = [...discardPiles];
                    discardPilesNew[pile] = discardPilesNew[pile].slice(0, -1);

                    set({
                        handCards: handCardsNew,
                        discardPiles: discardPilesNew,
                        placedCards: placedCards - 1,
                        history: history.slice(0, -1),
                    });
                },

                canUndo: () => {
                    return get().history.length > 0;
                },

                isLost: () => {
                    if (get().isWon() || get().canRedraw()) return false;

                    const { handCards, discardPiles } = get();

                    for (let i = 0; i < 4; i++) {
                        if (handCards.some(c => canPlaceCard(c, discardPiles, i))) return false;
                    }

                    return true;
                },

                isWon: () => {
                    return get().remainingCards() === 0;
                },

                selectCard: card => set({ selectedCard: card }),
            };
        },
        {
            name: "game-state",
        }
    )
);

export function canPlaceCard(card: number, piles: number[][], i: number) {
    if (!card) return false;
    const topCard = piles[i][piles[i].length - 1];
    if (!topCard) return true;

    if (Math.abs(card - topCard) === 10) return true;

    if (i >= 2) {
        return card > topCard;
    } else {
        return card < topCard;
    }
}

function shuffleCards(cards: number[]) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}
