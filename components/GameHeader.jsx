import { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

// Affiche une valeur qui "rebondit" à chaque changement
const AnimatedValue = ({ value }) => {
    const scale = useSharedValue(1);

    useEffect(() => {
        scale.value = withSequence(
            withTiming(1.4, { duration: 120 }),
            withTiming(1, { duration: 120 })
        );
    }, [value]);

    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.Text
            style={style}
            className="text-[32px] font-bold text-indigo-400"
        >
            {value}
        </Animated.Text>
    );
};

export const GameHeader = ({ score, moves, onReset }) => {
    return (
        <View className="w-full max-w-[600px] flex-col items-center gap-5 rounded-[20px] border border-white/10 bg-slate-900/90 p-[30px]">

            <Text className="text-center text-4xl font-bold text-white">
                🎮 Memory Card Game
            </Text>

            <View className="flex w-full flex-row justify-center gap-[30px]">
                <View className="flex flex-col items-center gap-[5px]">
                    <Text className="text-sm font-semibold uppercase tracking-[1px] text-zinc-400">
                        Score
                    </Text>

                    <AnimatedValue value={score} />
                </View>

                <View className="flex flex-col items-center gap-[5px]">
                    <Text className="text-sm font-semibold uppercase tracking-[1px] text-zinc-400">
                        Moves
                    </Text>

                    <AnimatedValue value={moves} />
                </View>
            </View>

            <TouchableOpacity
                className="rounded-[10px] bg-indigo-500 px-[30px] py-3"
                onPress={onReset}
                activeOpacity={0.8}
            >
                <Text className="text-[17px] font-semibold text-white">
                    New Game
                </Text>
            </TouchableOpacity>

        </View>
    );
};