import { Text, View, TouchableOpacity } from 'react-native';

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

                    <Text className="text-[32px] font-bold text-indigo-400">
                        {score}
                    </Text>
                </View>

                <View className="flex flex-col items-center gap-[5px]">
                    <Text className="text-sm font-semibold uppercase tracking-[1px] text-zinc-400">
                        Moves
                    </Text>

                    <Text className="text-[32px] font-bold text-indigo-400">
                        {moves}
                    </Text>
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