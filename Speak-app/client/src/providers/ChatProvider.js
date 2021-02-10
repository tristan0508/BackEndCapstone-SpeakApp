import React, { useState, useContext } from 'react';
import { ChatContext, UserContext, ChatHubContext } from './ContextProvider';




export const ChatProvider = (props) => {
    const token = localStorage.getItem("token");
    const [chatList, setChatList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openChannelModal, setOpenChannelModal] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [userOnline, setUserOnline] = useState(false);
    const [groupChats, setGroupChats] = useState([]);
    const [openGroupModal, setOpenGroupModal] = useState(false);
    const { userId } = useContext(UserContext);
    const { setChatHub } = useContext(ChatHubContext);

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

    const DeleteMessage = (msgId, chatId) => {
        fetch(`http://localhost:5000/api/message/${msgId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => GetMessages(chatId))
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

    const UpdateMessage = (msgId, body, chatId) => {
        const data = { body: body }
        fetch(`http://localhost:5000/api/message/${msgId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => GetMessages(chatId))
    }

    const GetGroups = () => {
        fetch('http://localhost:5000/api/chat', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(res => setGroupChats(res))
    }

    const AddUserChat = (userChat) => {
        fetch('http://localhost:5000/api/userchat', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userChat)
        }).then(() => GetUserChat())
    }


    return (
       <ChatContext.Provider value={{ GetUserChat, chatList, openModal, setOpenModal, GetAllUsers,
       allUsers, userOnline, setUserOnline, GetMessages, AddChat, openChannelModal, setOpenChannelModal,
       DeleteMessage, UpdateMessage, groupChats, GetGroups, openGroupModal, setOpenGroupModal,
       AddUserChat}}>
           {props.children}
       </ChatContext.Provider>
    )
}
