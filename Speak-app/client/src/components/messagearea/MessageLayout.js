import React, { useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ChatHubContext } from '../../providers/ChatHubProvider';



const useStyles = makeStyles(() =>
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
    const { chatHub, currentChatParam } = useContext(ChatHubContext)



    return (
        <List id='layout' className={classes.root}>
           { chatHub.map((c) => {
            if (c.chatId === currentChatParam) {

                let time = new Date(c.dateCreated).toLocaleTimeString()
                let date = new Date(c.dateCreated).toLocaleDateString()
                
                return  <ListItem key={c.id} id={c.chatId} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={c.userImage ? c.userImage : ""} />
                        </ListItemAvatar>
                            <ListItemText
                                key={c.id}
                                primary={`${c.displayName} -  ${date} - ${time}`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            >
                                            {c.body}
                                        </Typography>
                                    </React.Fragment>
                                }
                                />
               
                    </ListItem>
                }
                return null;
            })
            
        }

        </List>
    );
}

export default MessageLayout;