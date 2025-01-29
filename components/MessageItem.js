import { View, Text } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function MessageItem({ message, currentUser }) {
    console.log('message---->', message, currentUser);

    if (message?.userId === currentUser?.userId) {
        return (

            <View className='flex-row justify-end mb-3 mr-3'>
                <View style={{ with: wp(80) }}>
                    <View className='flex self-end p-3 rounded-2xl bg-white border border-neutral-200'>
                        <Text style={{ fontSize: hp(2) }}>
                            {message?.text}
                        </Text>

                    </View>

                </View>
            </View>


        )
    } else {
        return (
            <View style={{ width: wp(80) }} className='ml-3 mb-3'>
                <View className='flex self-start p-3 rounded-2xl bg-indigo-100 border border-indigo-200'>
                    <Text style={{ fontSize: hp(2) }}>
                        {message?.text}
                    </Text>
                </View>
            </View>

        )
    }


}