
import { useEffect, useState } from "react";

export const useGameLogic = (cardValues) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const shuffleArray = (array) => {
        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    };

    const initializeGame = () => {
        const shuffled = shuffleArray(cardValues);

        const finalCards = shuffled.map((value, index) => ({
            id: index,
            value,
            isFlipped: false,
            isMatched: false,
        }));

        setCards(finalCards);
        setIsLocked(false);
        setMoves(0);
        setScore(0);
        setMatchedCards([]);
        setFlippedCards([]);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handleCardPress = (card) => {
        if (
            card.isFlipped ||
            card.isMatched ||
            isLocked ||
            flippedCards.length === 2
        ) {
            return;
        }

        const newCards = cards.map((c) => {
            if (c.id === card.id) {
                return { ...c, isFlipped: true };
            }

            return c;
        });

        setCards(newCards);

        const newFlippedCards = [...flippedCards, card.id];
        setFlippedCards(newFlippedCards);

        if (flippedCards.length === 1) {
            setIsLocked(true);

            const firstCard = cards.find(
                (c) => c.id === flippedCards[0]
            );

            if (firstCard.value === card.value) {
                setTimeout(() => {
                    setMatchedCards((prev) => [
                        ...prev,
                        firstCard.id,
                        card.id,
                    ]);

                    setScore((prev) => prev + 1);

                    setCards((prev) =>
                        prev.map((c) => {
                            if (
                                c.id === card.id ||
                                c.id === firstCard.id
                            ) {
                                return { ...c, isMatched: true };
                            }

                            return c;
                        })
                    );

                    setFlippedCards([]);
                    setIsLocked(false);
                }, 500);
            } else {
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((c) => {
                            if (
                                c.id === firstCard.id ||
                                c.id === card.id
                            ) {
                                return { ...c, isFlipped: false };
                            }

                            return c;
                        })
                    );

                    setFlippedCards([]);
                    setIsLocked(false);
                }, 1000);
            }

            setMoves((prev) => prev + 1);
        }
    };

    const isGameComplete =
        cards.length > 0 &&
        matchedCards.length === cards.length;

    return {
        cards,
        score,
        moves,
        isGameComplete,
        initializeGame,
        handleCardPress,
    };
};