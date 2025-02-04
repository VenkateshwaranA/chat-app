import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { StatusBar } from 'expo-status-bar';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from '../../components/ChatList';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';
export default function Home() {
  const [users, setUsers] = useState([])
  const { logout, user } = useAuth();
  console.log('user---->', user);
  useEffect(() => {
    if (user?.uid) getUsers();
  }, [])
  const getUsers = async () => {
    const q = query(usersRef, where('userId', '!=', user?.uid));
    const querySnapshot = await getDocs(q);
    let listAllUsers = []
    querySnapshot.forEach((doc) => {
      listAllUsers.push({ ...doc.data() })
    })

    setUsers(listAllUsers)
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style='light' />
      {users.length > 0 ?
        (<ChatList  currentUser={user} users={users} />) : (
          <View className='flex items-center' style={{ top: hp(30) }}>
             <ActivityIndicator size="large" />
          </View>
        )
      }
    </View>
  )
}