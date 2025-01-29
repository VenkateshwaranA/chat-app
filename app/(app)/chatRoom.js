import { View, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useAuth } from "../../context/authContext";
import { getRoomId } from '../../utils/common';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ChatRoom() {

    const item = useLocalSearchParams();
    const { user } = useAuth();
    console.log('item', item);
    const router = useRouter()
    const [message, setMessage] = useState([]);
    const textRef = useRef('');
    const inuputRef = useRef("");
    useEffect(() => {
        createRoomInfoExistes();

        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const allMessages = querySnapshot.docs.map((doc) => doc.data());
            setMessage([...allMessages]);
        })
        return unsubscribe;
    }, [])
    const createRoomInfoExistes = async () => {
        let roomID = getRoomId(user?.userId, item?.userId)
        await setDoc(doc(db, "rooms", roomID), {
            roomID,
            createdAt: Timestamp.fromDate(new Date()),
        })
    }

    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        if (!message) return;
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, "rooms", roomId);
            const messageRef = collection(docRef, "messages");
            textRef.current = "";
            if (inuputRef) {
                inuputRef.current.clear();
            }
            const newDoc = await addDoc(messageRef, {
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date()),
            })
            // console.log('newDoc', newDoc.id);

        } catch (error) {

        }
    }
    // console.log('message', message);
    
    return (
        <CustomKeyboardView inChat={true}>
            <View className='flex-1 bg-white'>
                <StatusBar style='dark' />
                <ChatRoomHeader user={item} router={router} />
                <View className='h-3 border-b border-neutral-300' />
                <View className='flex-1 justify-between bg-neutral-100 overflow-visible '>
                    <MessageList message={message} currentUser={user} />
                </View>
                <View style={{ marginBottom: hp(1.7) }} className='pt-2'>

                    <View className='flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5'>
                        <TextInput
                            ref={inuputRef}
                            onChangeText={text => textRef.current = text}
                            placeholder='type something...' style={{ fontSize: hp(2) }} className='flex-1 mr-2' />
                        <TouchableOpacity
                            onPress={handleSendMessage}
                            className='bg-neutral-300 p-4 mr-[1px] rounded-full' >
                            <Feather name="send" size={hp(2.7)} color="#737373" />
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </CustomKeyboardView>
    )
}