import React, { useEffect, useState, useContext, useRef } from 'react';
import { Grid } from '@material-ui/core';
import MessageArea from '../messagearea/MessageArea';
import MessageHeader from '../messagearea/MessageHeader';
import MessageLayout from '../messagearea/MessageLayout';
import ChatSideBar from '../chatsidebar/ChatSideBar';
import { ChatDirectMessage } from '../chatsidebar/ChatDirectMessage';
import { ChatContext, ChatHubContext } from '../../providers/ContextProvider';
import { ChannelMessage } from '../chatsidebar/ChannelMessage';
import { GroupList } from '../chatsidebar/GroupList';

const Dashboard = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const { HubConnection } = useContext(ChatHubContext);
    const { GetUserChat, GetGroups } = useContext(ChatContext)

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
        GetUserChat()
        GetGroups()
    }, [])

 

    const chatContainer = useRef();
    const sideContainer = useRef();

    return (
        <Grid container >
            <Grid container item xs={1} >
                
            </Grid>
            <Grid container item xs={3} justify="flex-end">
                <ChatSideBar />
            </Grid>

            <Grid id="chat-container" className="chat-grid-item" container item xs={openMenu ? 6 : 8}>
                <MessageHeader 
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                chatContainer={chatContainer}
                sideContainer={sideContainer} />

                <Grid id="chat-grid-container" ref={chatContainer} container item className="chat-grid-container" alignItems="flex-start" >
                    <Grid id="chat" className="messages" container item xs={8}>
                        <ChannelMessage />
                        <ChatDirectMessage />
                        <GroupList />
                        <MessageLayout />
                    </Grid>
                </Grid>

                <Grid container item className="messageContainer">
                    <Grid item className="message-area-item">
                        <MessageArea />
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid id="side-container" ref={sideContainer} container item className="maybe" xs={2}>

            </Grid>
        </Grid>
    )
}

export default Dashboard;