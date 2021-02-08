import React, { useState, useRef, useContext } from "react";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ChatHubContext, UserContext } from './ContextProvider';



export const ChatHubProvider = (props) => {
    const paramId = localStorage.getItem("params")
    const { token, displayName, userImage } = useContext(UserContext);
    const [chatHub, setChatHub] = useState([]);
    const [hubConnection, setHubConnection] = useState();
    const [chatType, setChatType] = useState("");
    const [currentChatParam, setCurrentChatParam] = useState(paramId ? paramId : 0)
    const currentChat = useRef(null);

    currentChat.current = chatHub;

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

                    connection.on('Send', (e) => {
                        console.log(e)
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
            console.log(err)
        }
    }


    return (
       <ChatHubContext.Provider value={{ HubConnection, hubConnection, addMessage, AddChat, chatHub,
      setCurrentChatParam, setChatHub, currentChatParam, chatType, setChatType}}>
           {props.children}
       </ChatHubContext.Provider>
    )
}