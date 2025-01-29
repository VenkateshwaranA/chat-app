import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState, useContext } from "react";
import { createContext } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { use } from "react";

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);




    useEffect(() => {

        const unsububscribe = onAuthStateChanged(auth, (user) => {
            console.log('user', user);

            if (user) {
                setUser(user)
                setIsAuthenticated(true)
                updateUserData(user.uid);
            } else {
                setUser(null)
                setIsAuthenticated(false)
            }
        })
        return unsububscribe;

    }, []);


    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true }
        } catch (error) {
            console.log('error in register', error);

            // Handle specific Firebase error messages
            let msg = error.message;

            // You can also check for other specific error codes from Firebase
            if (msg.includes('auth/invalid-email')) {
                msg = "Invalid email address";
            } else if (msg.includes('auth/invalid-credential')) {
                msg = "Invalid credential";
            } else if (msg.includes('auth/weak-password')) {
                msg = "Password should be at least 6 characters";
            } else {
                msg = "An error occurred. Please try again.";
            }

            return {
                success: false, // Changed to false because the registration failed
                msg
            };
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            return { success: true }
        } catch (error) {
            return { success: false, msg: error.message }
        }
    }
    const register = async (email, password, username, profileUrl) => {
        try {
            // Check if auth is defined
            if (!auth) {
                throw new Error("Authentication service not initialized");
            }

            console.log('email, password, username, profileUrl', email, password, username, profileUrl);

            // Create user with email and password
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response', response?.user);

            // Set user data in Firestore
            await setDoc(doc(db, "users", response?.user?.uid), {
                username: username,
                profileUrl: profileUrl, // Default to empty string if profileUrl is null
                userId: response?.user?.uid
            });

            return {
                success: true,
                data: response.user
            };
        } catch (error) {
            console.log('error in register', error);

            // Handle specific Firebase error messages
            let msg = error.message;

            // You can also check for other specific error codes from Firebase
            if (msg.includes('auth/email-already-in-use')) {
                msg = "Email is already in use";
            } else if (msg.includes('auth/invalid-email')) {
                msg = "Invalid email address";
            } else if (msg.includes('auth/weak-password')) {
                msg = "Password should be at least 6 characters";
            } else {
                msg = "An error occurred. Please try again.";
            }

            return {
                success: false, // Changed to false because the registration failed
                msg
            };
        }
    }

    const updateUserData = async (userId) => {
        try {
            const userDocRef = doc(db, "users", userId);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                setUser({ ...user, username: userData.username, profileUrl: userData.profileUrl, userId: userData.userId });
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };
    return (

        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>


    )

}

export const useAuth = () => {
    const value = useContext(AuthContext)
    if (!value) throw new Error("useAuth must be used within a AuthProvider")
    return value
}