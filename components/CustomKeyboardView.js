import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { Children } from 'react'


const ios = Platform.OS === 'ios'
export default function CustomKeyboardView({ children, inChat }) {
    let kavConfig = {};
    let scrolViewConfig = {};
    if (inChat) {
        kavConfig = { keyboardVerticalOffset: 90 }
        scrolViewConfig = { contentContainerStyle: { flex: 1 } }
    }

    return (
        <KeyboardAvoidingView
            behavior={ios ? 'padding' : 'height'}
            style={{ flex: 1 }}
            {...kavConfig}
        >
            <ScrollView
                style={{ flex: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                {...scrolViewConfig}
            >


                {
                    children

                }

            </ScrollView>



        </KeyboardAvoidingView>
    )
}