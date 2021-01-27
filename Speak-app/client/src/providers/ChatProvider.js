import React, { useState, createContext, useRef, useContext } from "react";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { UserContext } from './UserProvider';


export const ChatContext = createContext();

export const ChatProvider = (props) => {

    const [chat, setChat] = useState([]);
    const currentChat = useRef(null);
    const { token } = useContext(UserContext);
    const [hubConnection, setHubConnection] = useState();

    currentChat.current = chat;

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
                        setChat(updateChat);
                        console.log(updateChat)
                    })

                    connection.on('Send', (e) => {
                        console.log(e)
                    })
                   
                })
                .catch(e => console.log('Connection failed: ', e));
                setHubConnection(connection);
    }

    const addMessage = async (input, chatId) => {
        if(input.length !== 0) {
            try {
                let Message = {
                    body: input,
                    chatId: chatId,
                }
                await hubConnection.invoke("SendMessage", Message)
            } catch (err) {
                console.log(err)
            }
        }
    }

    const AddChannel = async (groupName) => {
        try{
            await hubConnection.invoke("AddToGroup", groupName)
            console.log(groupName)
        } catch (err) {
            console.log(err)
        }
    }

    const GetName = async () => {
        await hubConnection.invoke("GetUserId")
        .then(res => console.log(res))
    }






    return (
       <ChatContext.Provider value={{ HubConnection, GetName, hubConnection, addMessage, AddChannel, chat}}>
           {props.children}
       </ChatContext.Provider>
    )
}