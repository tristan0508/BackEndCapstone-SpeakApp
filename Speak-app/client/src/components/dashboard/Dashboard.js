import React, { useEffect, useState } from 'react';
import {Grid} from '@material-ui/core';
import MessageArea from '../messagearea/MessageArea';
import MessageHeader from '../messagearea/MessageHeader';
import MessageLayout from '../messagearea/MessageLayout';


const Dashboard = () => {
    const [openMenu, setOpenMenu] = useState(false)
   
    const scrollToEnd = () => {
        let chat = document.getElementById('chat');
        if (!chat) {
            return 0;
        }
        chat.scrollTop = chat.scrollHeight;
    }

    useEffect(() => {
        scrollToEnd()
    }, [])

    
    return (
        <Grid container >
            <Grid container item xs={4} >
                <div className={'grid'}></div>
            </Grid>

            <Grid id="chat-container" className="chat-grid-item" container item xs={openMenu ? 6 : 8}>
                <MessageHeader openMenu={openMenu} setOpenMenu={setOpenMenu} />

                <Grid id="chat-grid-container" container item className="chat-grid-container" alignItems="flex-start" >
                    <Grid id="chat" className="messages" container item xs={8}>
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