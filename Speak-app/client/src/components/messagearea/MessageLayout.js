import React, { useContext, useEffect, useState } from 'react';
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ChatContext, ChatHubContext } from '../../providers/ContextProvider';
import groupMessagesByDate from '../customcomponents/GroupMessageByDate';
import { Fragment } from 'react';
import { Divider } from '@material-ui/core';
import { headerTheme } from '../../customtheme/MaterialTheme';
import { EditMessage } from '../customcomponents/EditMessage';




const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            backgroundColor: 'transparent',
            color: 'white',
        },
        inline: {
            display: 'inline',
            color: 'white',
            flexWrap: 'wrap'
        },
    }),
);


const MessageLayout = () => {
    const classes = useStyles();
    const userId = localStorage.getItem("userId");
    const { chatHub, currentChatParam, DeleteUpdate } = useContext(ChatHubContext);
    const [groupedChat, setGroupedChat] = useState([]);
    const [todaysDate, setTodaysDate] = useState();
    const [yesterdaysDate, setYesterdaysDate] = useState([]);
    const [editMsg, setEditMsg] = useState("");

    const toTimeString = (time) => {
      let newTime = new Date(time).toLocaleTimeString()
      return newTime
    }

    useEffect(() => {
        let filteredChat = chatHub.filter(msg => msg.chatId === currentChatParam)
        let chat = groupMessagesByDate(filteredChat)
        setGroupedChat(chat)

        let date = new Date(Date.now()).toLocaleString().split(",")[0]
        setTodaysDate(date)

        let today = new Date();
        let dayBefore = new Date(today);
        let yesterday = dayBefore.setDate(dayBefore.getDate() - 1)
        let formatYesterday = new Date(yesterday).toLocaleString().split(",")[0]
        setYesterdaysDate(formatYesterday)
    }, [chatHub, currentChatParam])

    const deleteMessage = (msgId, chatId) => {
        DeleteUpdate(msgId, chatId)
    }

    return (
    <ThemeProvider theme={headerTheme}>
        <List id='layout' className={classes.root}>
           {groupedChat.map(([date, messages]) => (
               <Fragment key={date}>
                    <Divider style={{ backgroundColor: "white"}} key={date}/>
                    <h4 style={{ textAlign: "center"}}>{date === todaysDate ? "Today" : date === yesterdaysDate ? "Yesterday" : date}</h4>
                   {messages.map(msg => (
                        <ListItem key={msg.id} id={msg.chatId} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={msg.userImage ? msg.userImage : ""} />
                        </ListItemAvatar>
                            <ListItemText
                                key={msg.id}
                                primary={`${msg.displayName} -  ${toTimeString(msg.dateCreated)}`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            >
                                            {msg.userId === parseInt(userId) && msg.id === editMsg ? 
                                            <EditMessage msg={msg.body}
                                             setEditMsg={setEditMsg}
                                             msgId={msg.id}
                                             chatId={msg.chatId}/> : msg.body}
                                        </Typography>
                                    </React.Fragment>
                                }
                                />
                                   {msg.userId === parseInt(userId) ? 
                                   <div className="editDeleteBtn">
                                        <DeleteOutlineIcon id={msg.id} onClick={() => deleteMessage(msg.id, msg.chatId)} style={{ cursor: "pointer"}} fontSize="small"/>
                                        <CreateIcon onClick={() => setEditMsg(msg.id)} id={msg.id} style={{ cursor: "pointer"}} fontSize="small"/>
                                    </div> 
                                : null}


                        </ListItem>
                   ))}
               </Fragment>
           ))}
        </List>
    </ThemeProvider>
    );
}

export default MessageLayout;