import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../firebase/firebase.config";
import {toast} from "react-hot-toast"



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    


    // create a user with user an password
    const createNewUser = async (email, password) => {
        try {
            setLoading(true);
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    // log out user 
    const logOut = async () => {
        try {
            setLoading(true);
            return await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Log in user with email and password
    const loginUser = async (email, password) => {
        try {
            setLoading(true);
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error logging in:", error.message);
            toast.error('Invalid Email and Password')
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // sign in with google
    const googleProvider = new GoogleAuthProvider();

    const loginUserWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // send a password reset email
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    // Update profile
    const updateProfileInfo = (name, photo) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
    }

   


    // setup a observer and un mount observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        
        user,
        setUser,
        createNewUser,
        logOut,
        loginUser,
        loginUserWithGoogle,
        resetPassword,
        updateProfileInfo,
        loading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
