import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { history } from "../index"


export const UserContext = createContext();

export function UserProvider(props) {
    const apiUrl = "/api/user";
    const user = localStorage.getItem("user");
    const userToken = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const displayName = localStorage.getItem("displayName");
    const userImage = localStorage.getItem("userImage");
    const firebaseId = localStorage.getItem("firebaseId");
    const [isRegister, setIsRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(user != null);
    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    const [token, setToken] = useState(userToken ? userToken : "");

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
            localStorage.setItem("userImage", user.image !== null ? user.image : "");
            localStorage.setItem("userId", user.id);
            localStorage.setItem("displayName", user.displayName);
            localStorage.setItem("firebaseId", user.firebaseUserId);
            setIsLoggedIn(true);
        })
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

    const getToken = () => firebase.auth().currentUser.getIdToken()
        .then(res => {
            localStorage.setItem("token", res)
            setToken(res)
        })

    const getUser = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        )};


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
        <UserContext.Provider value={{ isLoggedIn, isFirebaseReady, token, setIsLoggedIn, login, logout, register, getToken, setIsRegister, userId, displayName,
        userImage, firebaseId }}>
        {props.children}
        </UserContext.Provider>
    );
}
