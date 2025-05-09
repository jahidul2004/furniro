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
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("Db user", dbUser);

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

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/user/${user?.email}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setDbUser(data);
                    } else {
                        console.error("User not found in the database");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [user]);

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
        dbUser,
        setDbUser,
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
