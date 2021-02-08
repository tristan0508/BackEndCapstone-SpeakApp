import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Button, Container, ThemeProvider } from '@material-ui/core';
import { headerTheme } from '../../customtheme/MaterialTheme';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import AvatarStatus from '../customcomponents/AvatarStatus';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { UserContext, ChatHubContext, ChatContext } from '../../providers/ContextProvider';


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
    const { chatList, openModal, setOpenModal, GetMessages } = useContext(ChatContext);
    const { setCurrentChatParam, setChatType } = useContext(ChatHubContext);
    const { displayName } = useContext(UserContext);
    const history = useHistory();




    const handleDirectModal = (e) => {
      setChatType(e)
      if(openModal === false){
        setOpenModal(true)
      } else {
        setOpenModal(false)
      }
    }

    const handleChatRoute = (id) => {
      setCurrentChatParam(id)
      GetMessages(id)
      history.push(`/dashboard/chat/${id}`)
    }


    return (
        <div className={classes.root}>
        <ThemeProvider theme={headerTheme}>
          <List component="nav" aria-label="main mailbox folders">
            <Container>
                <h4>Channels</h4>
                <Button variant="outlined" color="secondary" onClick={() => setChatType("Channel")}>
                Add Channel
                </Button>
            </Container>
            <Container>
                {  chatList.map(c => {
                        if(c.type === 'Channel'){
                        return  <ListItem button key={c.id}>
                                    <PeopleAltIcon />
                                    <ListItemText className="chatListText" key={c.id} primary={c.name} />
                                </ListItem>
                        }
                        return null;
                    })
                }
            </Container>
          </List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folders">
            <Container>
                <h4>Direct Messages</h4>
               
                <Button variant="outlined" color="secondary" onClick={() => {
                  handleDirectModal()
                  setChatType("Direct Message")
                }}>
                New Direct Message
                </Button>
            </Container>
            <Container>
                {  chatList.map(c => {
                        if(c.type === 'Direct Message'){

                        return  <ListItem button key={c.id} onClick={() => handleChatRoute(c.id)}>
                                    <AvatarStatus src={c.sender === displayName ? c.receiverImage : c.senderImage}
                                    alt="avatar"/>
                                    <ListItemText 
                                      className="chatListText"
                                      key={c.id}
                                      primary={c.sender === displayName ? c.receiver : c.sender}
                                       />
                                </ListItem>
                        }
                        return null;
                    })
                }
            </Container>
          </List>
        </ThemeProvider>
        </div>
      );
}
export default ChatSideBar;