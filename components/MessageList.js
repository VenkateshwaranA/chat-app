import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessageList({ message, currentUser }) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }}>

            {
                message.map((msg, index) => (
                    <MessageItem key={index} message={msg} currentUser={currentUser} />
                ))
            }

        </ScrollView>
    )
}