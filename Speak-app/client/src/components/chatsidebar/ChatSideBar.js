import React, { useContext, useEffect } from 'react';
import { ChatContext } from '../../providers/ChatProvider';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Button, Container, ThemeProvider } from '@material-ui/core';
import { headerTheme } from '../../customtheme/MaterialTheme';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import AvatarStatus from '../customcomponents/AvartarStatus';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';


const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: 360,
    backgroundColor: '#192734',
    color: 'white',
    border: '1px solid white',
    overflow: 'scroll',
  },
}));

const ChatSideBar = () => {
    const classes = useStyles();
    const { GetUserChat, chat, openModal, setOpenModal } = useContext(ChatContext)

    const handleModal = () => {
      if(openModal === false){
        setOpenModal(true)
      } else {
        setOpenModal(false)
      }
    }

   

    return (
        <div className={classes.root}>
        <ThemeProvider theme={headerTheme}>
          <List component="nav" aria-label="main mailbox folders">
            <Container>
                <h4>Channels</h4>
                <Button variant="outlined" color="secondary">
                Add Channel
                </Button>
            </Container>
            <Container>
                {  chat.map((c) => {
                        if(c.type === 'Channel'){
                        return  <ListItem button key={c.id}>
                                    <PeopleAltIcon />
                                    <ListItemText className="chatListText" key={c.id} primary={c.name} />
                                </ListItem>
                        }
                    })
                }
            </Container>
          </List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folders">
            <Container>
                <h4>Direct Messages</h4>
               
                <Button variant="outlined" color="secondary" onClick={handleModal}>
                New Direct Message
                </Button>
            </Container>
            <Container>
                {  chat.map((c) => {
                        if(c.type === 'Direct Message'){

                        return  <ListItem button key={c.id}>
                                    <AvatarStatus />
                                    <ListItemText className="chatListText" key={c.id} primary={c.name} />
                                </ListItem>
                        }
                    })
                }
            </Container>
          </List>
        </ThemeProvider>
        </div>
      );
}
export default ChatSideBar;