import '../global.css';
import { View, ScrollView } from 'react-native';

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

            {isGameComplete && (
                <WinMessage moves={moves} />
            )}

            <View className="w-full max-w-[600px] flex-row flex-wrap justify-center gap-[10px]">
                {cards.map((card) => (
                    <View key={card.id} className="w-[22%]">
                        <Card
                            card={card}
                            onPress={handleCardPress}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
