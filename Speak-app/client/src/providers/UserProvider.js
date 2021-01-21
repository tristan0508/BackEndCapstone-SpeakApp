import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import LoginPage from "../components/LoginPage";
import { history } from "../index"
import RegisterPage from "../components/RegisterPage"

export const UserContext = createContext();

export function UserProvider(props) {
    const apiUrl = "/api/user";

    const user = localStorage.getItem("user");
    const [isLoggedIn, setIsLoggedIn] = useState(user != null);
    const [isRegister, setIsRegister] = useState(false)
    const [isFirebaseReady, setIsFirebaseReady] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {
        return firebase.auth().signInWithEmailAndPassword(email, pw)
        .then((signInResponse) => getUser(signInResponse.user.uid))
        .then((user) => {
            localStorage.setItem("user", JSON.stringify(user));
            setIsLoggedIn(true);
        });
    };
    
    const logout = () => {
        return firebase.auth().signOut()
        .then(() => {
            localStorage.clear()
            setIsLoggedIn(false);
            history.push("/")
            window.onresize = null;
        });
    };


    const register = (user, password) => {
        return firebase.auth().createUserWithEmailAndPassword(user.email, password)
            .then((createResponse) => saveUser({ ...user, firebaseUserId: createResponse.user.uid }))
            .then((savedUser) => {
                localStorage.setItem("user", JSON.stringify(savedUser));
                setIsLoggedIn(true);
            });
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUser = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };


    const saveUser = (user) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(resp => resp.json()));
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, isFirebaseReady, setIsLoggedIn, login, logout, register, getToken, setIsRegister }}>
        {props.children}
        </UserContext.Provider>
    );
}