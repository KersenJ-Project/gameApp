import { Text } from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';

export const WinMessage = ({ moves }) => {
    return (
        <Animated.View
            entering={ZoomIn.springify().damping(12)}
            exiting={FadeOut.duration(300)}
            className="items-center rounded-[15px] border border-white/10 bg-[#0f172af2] px-[30px] py-[30px] shadow-2xl"
        >
            <Text className="mb-[10px] text-center text-[32px] font-bold text-white">
                🎉 Congratulations!
            </Text>
            <Text className="text-center text-xl text-zinc-400">
                You completed the game in {moves} moves!
            </Text>
        </Animated.View>
    );
};