import { View, Text, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from 'expo-image';
import { blurhash, getRoomId } from "../utils/common"
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
export default function ChatItem({ item, router, noBorder, currentUser }) {
    const [lastMessage, setLastMessage] = useState(undefined);
    useEffect(() => {
        let roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'dsc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const allMessages = querySnapshot.docs.map((doc) => doc.data());
            setLastMessage(allMessages[0] ? allMessages[0] : null);
        })
        return unsubscribe;
    }, [])
    const openChatRoom = () => {
        router.push({
            pathname: "/chatRoom",
            params: item,
        })
    }

    const renderTime = () => {
        return "time"
    }
    const renderLastMessage = () => {
        if (typeof lastMessage == "undefined") return 'loading...';
        if (lastMessage) {
            if (currentUser?.userId == lastMessage?.userId) return 'You: ' + lastMessage?.text;
            return lastMessage?.text;
        } else {
            return "Say Hi 😍"
        }
    }
// console.log('lastMessage', lastMessage);

    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between items-center mx-4 mb-4 gap-3 pb-2 ${noBorder ? "" : 'border-b border-b-neutral-200'}`}>

            {/* <Image source={require('../assets/images/avatar.jpg')}
                style={{ height: hp(6), width: hp(6) }}
                className='rounded-full'
            /> */}
            <Image
                style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
                source={item?.profileUrl || require('../assets/images/avatar.jpg')}
                placeholder={blurhash}
                transition={500}
            />

            <View className='flex-1 gap-1'>
                <View className='flex-row justify-between'>
                    <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-800'>{item?.username}</Text>
                    <Text style={{ fontSize: hp(1.8) }} className='font-medium text-neutral-500'>{renderTime()}</Text>
                </View>
                <Text style={{ height: hp(1.6) }} className='font-medium text-neutral-500'>{renderLastMessage()}</Text>
            </View>

        </TouchableOpacity>
    )
}