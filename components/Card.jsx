import { useEffect } from 'react';
import { Text, Pressable } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    interpolate,
    interpolateColor,
} from 'react-native-reanimated';

const FLIP_DURATION = 400;

const faceBase = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backfaceVisibility: 'hidden',
};

export const Card = ({ card, onPress }) => {
    const rotation = useSharedValue(0); // 0 = cachée, 1 = visible
    const matched = useSharedValue(0);  // 0 = normale, 1 = trouvée
    const scale = useSharedValue(1);

    const faceUp = card.isFlipped || card.isMatched;

    // Flip progressif quand la carte se retourne
    useEffect(() => {
        rotation.value = withTiming(faceUp ? 1 : 0, { duration: FLIP_DURATION });
    }, [faceUp]);

    // Effet "pop" + couleur verte quand la paire est trouvée
    useEffect(() => {
        matched.value = withTiming(card.isMatched ? 1 : 0, { duration: 300 });

        if (card.isMatched) {
            scale.value = withSequence(
                withTiming(1.15, { duration: 150 }),
                withTiming(1, { duration: 150 })
            );
        }
    }, [card.isMatched]);

    const containerStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    // Face cachée : 0° -> 180° (disparaît après 90°)
    const backStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 800 },
            { rotateY: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` },
        ],
    }));

    // Face visible : 180° -> 360° (apparaît après 90°)
    const frontStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 800 },
            { rotateY: `${interpolate(rotation.value, [0, 1], [180, 360])}deg` },
        ],
        backgroundColor: interpolateColor(
            matched.value,
            [0, 1],
            ['#1e1e1e', 'rgba(34,197,94,0.2)']
        ),
        borderColor: interpolateColor(
            matched.value,
            [0, 1],
            ['rgba(255,255,255,0.1)', '#4ade80']
        ),
    }));

    return (
        <Pressable
            onPress={() => onPress(card)}
            disabled={card.isMatched}
        >
            <Animated.View className="aspect-square w-full" style={containerStyle}>
                {/* Face cachée */}
                <Animated.View
                    className="items-center justify-center rounded-[15px] border-2 border-white/10 bg-slate-900"
                    style={[faceBase, backStyle]}
                >
                    <Text className="text-5xl font-bold text-white">?</Text>
                </Animated.View>

                {/* Face visible */}
                <Animated.View
                    className="items-center justify-center rounded-[15px] border-2"
                    style={[faceBase, frontStyle]}
                >
                    <Text className="text-5xl font-bold text-white">{card.value}</Text>
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
};