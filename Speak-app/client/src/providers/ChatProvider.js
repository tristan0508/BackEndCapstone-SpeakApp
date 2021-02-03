import React, { useState, createContext, useContext } from 'react';
import { ChatHubContext } from './ChatHubProvider';
import UserContext from './UserContext';



export const ChatContext = createContext();

export const ChatProvider = (props) => {
    const token = localStorage.getItem("token");
    const [chatList, setChatList] = useState([]);
    const [openModal, setOpenModal] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [userOnline, setUserOnline] = useState(false)
    const { userId } = useContext(UserContext)
    const { setChatHub } = useContext(ChatHubContext)

    const GetUserChat = () => {
            fetch(`http://localhost:5000/api/chat/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
            .then(res => setChatList(res))
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

    const GetMessages = (chatId) => {
        fetch(`http://localhost:5000/api/message/${chatId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(res => setChatHub(res))
    }

    const AddChat = (chat) => {
        fetch('http://localhost:5000/api/chat', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chat)
        }).then(() => GetUserChat())
    }


    return (
       <ChatContext.Provider value={{ GetUserChat, chatList, openModal, setOpenModal, GetAllUsers,
       allUsers, userOnline, setUserOnline, GetMessages, AddChat}}>
           {props.children}
       </ChatContext.Provider>
    )
}
