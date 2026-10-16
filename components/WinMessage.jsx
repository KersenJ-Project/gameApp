import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const WinMessage = ({ moves }) => {
    return (
        <View className='items-center rounded-[15px] border border-white/10 bg-[#0f172af2] px-[30px] py-[30px] shadow-2xl'>
            <Text className='mb-[10px] text-center text-[32px] font-bold text-white'>Congratulations!</Text>
            <Text className='text-center text-xl text-zinc-400'>You completed the game in {moves} moves!</Text>
        </View>
    )
}