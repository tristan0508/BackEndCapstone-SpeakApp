import React, { useEffect, useState, useContext } from 'react';
import { Grid } from '@material-ui/core';
import MessageArea from '../messagearea/MessageArea';
import MessageHeader from '../messagearea/MessageHeader';
import MessageLayout from '../messagearea/MessageLayout';
import { ChatHubContext } from '../../providers/ChatHubProvider';
import ChatSideBar from '../chatsidebar/ChatSideBar';
import { ChatDirectMessage } from '../chatsidebar/ChatDirectMessage';
import { ChatContext } from '../../providers/ChatProvider';



const Dashboard = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const { HubConnection } = useContext(ChatHubContext);
    const { GetUserChat } = useContext(ChatContext)

   
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
                        <ChatDirectMessage />
                        <MessageLayout />
                    </Grid>
                </Grid>

                <Grid container item className="messageContainer">
                    <Grid item className="message-area-item">
                        <MessageArea />
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid id="side-container" container item className="maybe" xs={2}>

            </Grid>
        </Grid>
    )
}

export default Dashboard;