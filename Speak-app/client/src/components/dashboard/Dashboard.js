import React, { useEffect, useState, useContext } from 'react';
import {Container, Grid, TextField} from '@material-ui/core';
import MessageArea from '../messagearea/MessageArea';
import MessageHeader from '../messagearea/MessageHeader';
import MessageLayout from '../messagearea/MessageLayout';
import { ChatContext } from '../../providers/ChatProvider';
import ChatSideBar from '../chatsidebar/ChatSideBar';
// import { UserContext } from '../../providers/UserProvider'



const Dashboard = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const { chat, AddChannel, HubConnection, GetName } = useContext(ChatContext);
    const [chatName, setChatName] = useState("")
   
    const scrollToEnd = () => {
        let chatElement = document.getElementById('chat');
        if (!chatElement) {
            return 0;
        }
        chatElement.scrollTop = chatElement.scrollHeight;
    }

    useEffect(() => {
        scrollToEnd()
        HubConnection()
    }, [])

    return (
        <Grid container >
            <Grid container item xs={1} >
                
            </Grid>
            <Grid container item xs={3} justify="flex-end">
                <ChatSideBar />
            </Grid>

            <Grid id="chat-container" className="chat-grid-item" container item xs={openMenu ? 6 : 8}>
                <MessageHeader openMenu={openMenu} setOpenMenu={setOpenMenu} />

                <Grid id="chat-grid-container" container item className="chat-grid-container" alignItems="flex-start" >
                    <Grid id="chat" className="messages" container item xs={8}>
                        
                          <MessageLayout  />
                       
                    </Grid>
                </Grid>

                <Grid container item className="messageContainer">
                    <Grid item className="message-area-item">
                        <MessageArea />
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid id="side-container" container item className="maybe" xs={2}>
                <Container>
                <h1>CREATE CHAT</h1>
               <TextField 
               placeholder="Chat Name"
               onChange={(e) => setChatName(e.currentTarget.value)}
               value={chatName}
               />
                   <TextField 
               placeholder="Type"
               value="Channel"
               />
               <button onClick={() => {
                   AddChannel(chatName)
               }}>
                   Submit Chat
                </button>
                <button onClick={() => {
                    GetName()
                }}>
                    Getname
                </button>
               </Container>
            </Grid>
        </Grid>
    )
}

export default Dashboard;