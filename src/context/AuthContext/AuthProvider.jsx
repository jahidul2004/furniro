import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth).finally(() => setLoading(false));
    };

    const updateDisplayName = (displayName) => {
        return updateProfile(auth.currentUser, {
            displayName,
        });
    };

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const data = {
        user,
        setUser,
        registerUser,
        updateDisplayName,
        login,
        logout,
        loading,
        setLoading,
        googleLogin,
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
