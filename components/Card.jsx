import { View, Text, TouchableOpacity } from 'react-native';

export const Card = ({ card, onPress }) => {
    return (
        <TouchableOpacity
            className={`relative aspect-square flex-1 rounded-[15px] ${
                card.isFlipped || card.Matched
                    ? 'bg-[#1e1e1e]'
                    : 'bg-slate-900'
            } ${
                card.Matched
                    ? 'border-2 border-green-400 bg-green-500/20'
                    : 'border-2 border-white/10'
            }`}
            onPress={() => onPress(card)}
            disabled={card.Matched}
            activeOpacity={0.8}
        >
            <View className="flex-1 items-center justify-center">
                <Text className="text-5xl font-bold text-white">
                    {card.isFlipped || card.Matched ? card.value : '?'}
                </Text>
            </View>
        </TouchableOpacity>
    );
};