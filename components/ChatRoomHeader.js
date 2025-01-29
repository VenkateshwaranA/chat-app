import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Stack } from 'expo-router';
import { Image } from 'expo-image';

export default function ChatRoomHeader({ user, router }) {
    return (
        <Stack.Screen
            options={{
                title: "",
                headerShadowVisible: false,
                headerLeft: () => (

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: hp(2) }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={hp(4)} color="#737373" />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: hp(1) }}>
                            <Image
                                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
                                source={user?.profileUrl || require('../assets/images/avatar.jpg')}
                            />
                            <Text style={{ fontSize: hp(2.5), color: '#737373', fontWeight: '500' }}>
                                {user?.username}
                            </Text>
                        </View>
                    </View>
                ),

                headerRight: () => (
                    <View className='flex-row items-center gap-8'>
                        <Ionicons name="call" size={hp(2.8)} color="#737373" />
                        <Ionicons name="videocam" size={hp(2.8)} color="#737373" />

                    </View>


                )
            }}
        />
    );
}
