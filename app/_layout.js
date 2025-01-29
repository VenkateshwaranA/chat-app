import { Slot, useRouter, useSegments } from "expo-router";

// Import your global CSS file
import "../global.css";
import { Text, View } from "react-native";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useEffect } from "react";

import { MenuProvider } from 'react-native-popup-menu';
const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments()
    const router = useRouter();

    useEffect(() => {

        if (typeof isAuthenticated === "undefined") return;

        const inApp = segments[0] == "(app)";

        if (!inApp && isAuthenticated) {

            router.replace("home");
        } else if (isAuthenticated == false) {
            router.replace("signIn");

        }


    }, [isAuthenticated])

    return <Slot />

}
export default function RootLayout() {
    return (
        <MenuProvider>
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>

        </MenuProvider>
    );
}