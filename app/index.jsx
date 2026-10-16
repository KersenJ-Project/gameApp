import '../global.css';
import { View, ScrollView } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

import { useGameLogic } from 'hooks/useGameLogic';
import { cardValues } from 'assets/cardValues';

import { GameHeader } from 'components/GameHeader';
import { WinMessage } from 'components/WinMessage';
import { Card } from 'components/Card';

export default function Index() {
    const {
        cards,
        score,
        moves,
        gameId,
        isGameComplete,
        initializeGame,
        handleCardPress,
    } = useGameLogic(cardValues);

    return (
        <ScrollView
            className="flex-1 bg-[#0a0a0a]"
            contentContainerClassName="flex-grow items-center gap-[30px] p-5"
        >
            <GameHeader
                score={score}
                moves={moves}
                onReset={initializeGame}
            />

            {isGameComplete && <WinMessage moves={moves} />}

            {/* Le key change à chaque nouvelle partie : la grille est remontée
                et l'animation d'entrée en cascade est rejouée */}
            <View
                key={gameId}
                className="w-full max-w-[600px] flex-row flex-wrap justify-center gap-[10px]"
            >
                {cards.map((card, index) => (
                    <Animated.View
                        key={card.id}
                        className="w-[22%]"
                        entering={ZoomIn.delay(index * 40).duration(300)}
                    >
                        <Card card={card} onPress={handleCardPress} />
                    </Animated.View>
                ))}
            </View>
        </ScrollView>
    );
}