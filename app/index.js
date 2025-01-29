import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react';
// import { green } from 'react-native-reanimated/lib/typescript/Colors';
// import "../global.css";

export default function StartPage() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="blue" />
    </View>
  )
}  