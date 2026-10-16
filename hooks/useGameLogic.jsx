import { useEffect, useRef, useState } from "react";

const MATCH_DELAY = 600;    // laisse le temps de voir le flip (400 ms) avant l'effet "pop"
const MISMATCH_DELAY = 1000; // laisse le joueur mémoriser les deux cartes

const shuffleArray = (array) => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

export const useGameLogic = (cardValues) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [gameId, setGameId] = useState(0);

    // Garde l'id du timeout en cours pour pouvoir l'annuler
    const timeoutRef = useRef(null);

    const clearPendingTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const initializeGame = () => {
        // Évite qu'un ancien timeout modifie le nouveau plateau
        clearPendingTimeout();

        const finalCards = shuffleArray(cardValues).map((value, index) => ({
            id: index,
            value,
            isFlipped: false,
            isMatched: false,
        }));

        setCards(finalCards);
        setFlippedCards([]);
        setScore(0);
        setMoves(0);
        setIsLocked(false);
        setGameId((prev) => prev + 1);
    };

    useEffect(() => {
        initializeGame();

        // Nettoyage au démontage du composant
        return clearPendingTimeout;
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

        // Retourne la carte cliquée
        setCards((prev) =>
            prev.map((c) =>
                c.id === card.id ? { ...c, isFlipped: true } : c
            )
        );

        // Première carte : on attend la seconde
        if (flippedCards.length === 0) {
            setFlippedCards([card.id]);
            return;
        }

        // Seconde carte : on compare
        const firstCard = cards.find((c) => c.id === flippedCards[0]);

        setFlippedCards([firstCard.id, card.id]);
        setIsLocked(true);
        setMoves((prev) => prev + 1);

        const isMatch = firstCard.value === card.value;

        timeoutRef.current = setTimeout(() => {
            setCards((prev) =>
                prev.map((c) => {
                    if (c.id !== firstCard.id && c.id !== card.id) {
                        return c;
                    }

                    return isMatch
                        ? { ...c, isMatched: true }
                        : { ...c, isFlipped: false };
                })
            );

            if (isMatch) {
                setScore((prev) => prev + 1);
            }

            setFlippedCards([]);
            setIsLocked(false);
            timeoutRef.current = null;
        }, isMatch ? MATCH_DELAY : MISMATCH_DELAY);
    };

    const isGameComplete = cards.length > 0 && cards.every((c) => c.isMatched);

    return {
        cards,
        score,
        moves,
        gameId,
        isGameComplete,
        initializeGame,
        handleCardPress,
    };
};