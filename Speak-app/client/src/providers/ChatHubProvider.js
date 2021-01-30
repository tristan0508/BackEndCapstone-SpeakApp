import React, { useState, createContext, useRef, useContext } from "react";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { UserContext } from './UserProvider';


export const ChatHubContext = createContext();

export const ChatHubProvider = (props) => {

    const { token, displayName, userImage } = useContext(UserContext);
    const [chatHub, setChatHub] = useState([]);
    const [selectedChat, setSelectedChat] = ([]);
    const [hubConnection, setHubConnection] = useState();
    const [receiverId, setReceiverId] = useState(0);
    const [receiverFirebaseId, setReceiverFirebaseId] = useState("");
    const [ receiverName, setReceiverName] = useState("");
    const [currentChatParam, setCurrentChatParam] = useState(0)
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
                let Who = {
                   firebaseUserId: receiverFirebaseId,
                   ReceiverUserId: receiverId,
                   fullName: receiverName
                }
                await hubConnection.invoke("SendMessage", Message, Who)
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
       <ChatHubContext.Provider value={{ HubConnection, GetName, hubConnection, addMessage, AddChannel, chatHub,
        setReceiverId, setReceiverFirebaseId, setReceiverName, setCurrentChatParam, setChatHub, selectedChat,
        setSelectedChat, currentChatParam}}>
           {props.children}
       </ChatHubContext.Provider>
    )
}