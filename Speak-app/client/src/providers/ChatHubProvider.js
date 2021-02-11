import React, { useState, useRef, useContext } from "react";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ChatContext, ChatHubContext, UserContext } from './ContextProvider';



export const ChatHubProvider = (props) => {
    const paramId = localStorage.getItem("params")
    const { token, displayName, userImage } = useContext(UserContext);
    const [chatHub, setChatHub] = useState([]);
    const [hubConnection, setHubConnection] = useState();
    const [chatType, setChatType] = useState("");
    const [currentChatParam, setCurrentChatParam] = useState(paramId ? paramId : 0)
    const [openSnack, setOpenSnack] = useState(false);
    const currentChat = useRef(null);

    currentChat.current = chatHub;

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

    const HubConnection = () => {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/chatHub', {
                accessTokenFactory: () => token
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

            connection.start()
                .then(() => {
                    console.log('Connected!');

                    connection.on('ReceiveMessage', message => {
                        const updateChat = [...currentChat.current];
                        updateChat.push(message);
                        setChatHub(updateChat);
                        console.log(updateChat)
                    })

                    connection.on('Update', (e) => {
                        GetMessages(e)
                    })

                   
                })
                .catch(e => console.log('Connection failed: ', e));
                setHubConnection(connection);
    }

    const addMessage = async (input) => {
        if(input.length !== 0) {
            try {
                let Message = {
                    body: input,
                    chatId: currentChatParam,
                    displayName,
                    userImage
                }
                await hubConnection.invoke("SendMessage", Message)
            } catch (err) {
                console.log(err)
            }
        }
    }

    const AddChat = async (groupName) => {
        try{
            await hubConnection.invoke("AddToDirectChat", groupName)
            console.log(groupName)
        } catch (err) {
            setOpenSnack(true)
        }
    }

    const Update = async (msgId, body, chatId) => {
        try{
            await hubConnection.invoke("UpdateMessage", msgId, body, chatId)
        } catch (err) {
            console.log(err)
        }
    }

    const DeleteUpdate = async (msgId, chatId) => {
        try{
            await hubConnection.invoke("DeleteMessage", msgId, chatId)
        } catch (err) {
            console.log(err)
        }
    }


    return (
       <ChatHubContext.Provider value={{ HubConnection, hubConnection, addMessage, AddChat, chatHub,
      setCurrentChatParam, setChatHub, currentChatParam, chatType, setChatType, openSnack, setOpenSnack,
      Update, GetMessages, DeleteUpdate}}>
           {props.children}
       </ChatHubContext.Provider>
    )
}