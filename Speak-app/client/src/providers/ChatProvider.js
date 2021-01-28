import React, { useState, createContext, useContext } from 'react';
import { UserContext } from './UserProvider';


export const ChatContext = createContext();

export const ChatProvider = (props) => {
    const token = localStorage.getItem("token");
    const [chat, setChat] = useState([]);
    const [openModal, setOpenModal] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [userOnline, setUserOnline] = useState(false)
    const { userId } = useContext(UserContext)

    const GetUserChat = () => {
            fetch(`http://localhost:5000/api/chat/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
            .then(res => setChat(res))
    }

    const GetAllUsers = () => {
        fetch('http://localhost:5000/api/user', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(res => setAllUsers(res))
    }

    return (
       <ChatContext.Provider value={{ GetUserChat, chat, openModal, setOpenModal, GetAllUsers,
       allUsers, userOnline, setUserOnline}}>
           {props.children}
       </ChatContext.Provider>
    )
}
