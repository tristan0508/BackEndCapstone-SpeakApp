import React, { useContext, useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { ChatContext } from '../../providers/ContextProvider';
import { makeStyles } from '@material-ui/core/styles';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Container, Grid } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';


const useStyles = makeStyles((theme) => ({
    
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      height: 300,
      overflow: 'auto',
      backgroundColor: '#192734',
      border: '2px solid white',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      color: 'white'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'fixed',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
  }));


export const GroupList = () => {
    const classes = useStyles();
    const userId = localStorage.getItem("userId");
    const { groupChats, openGroupModal, setOpenGroupModal, AddUserChat } = useContext(ChatContext)
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredGroup, setFilteredGroup] = useState([]);

    useEffect(() => {
        console.log(groupChats)
        if (searchTerms !== "") {
            const subset = groupChats.filter(group => group.name.toLowerCase().includes(searchTerms.toLowerCase().trim()))
            console.log(subset)
            setFilteredGroup(subset)
        } else {
            setFilteredGroup(groupChats)
        }
    }, [searchTerms, groupChats])

  const handleChatRoute = (id) => {
      const UserChat = {
        chatId: id,
        userId: userId
      }
      AddUserChat(UserChat)
      setOpenGroupModal(false)
  }

    return (
        <div>
            <Modal
                className={classes.modal}
                open={openGroupModal}
                onBackdropClick={() => setOpenGroupModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Container className={classes.paper}>
                <Grid container >
                    <Grid item xs={12}>
                    <InputBase
                    placeholder={`Search groups...`}
                    inputProps={{ 'aria-label': 'search' }}
                    style={{ border: '1px solid white', width: '100%', height: '40px',
                             borderRadius: '5px', padding: '5px' }}
                    onKeyUp={
                        (keyEvent) => setSearchTerms(keyEvent.currentTarget.value)
                    }
                    onChange={(keyEvent) => keyEvent.currentTarget.value === ''? setSearchTerms('') : null}
                    />
                    
                    </Grid>
                    <Grid item xs={12}>
                        {filteredGroup.map(g => {
                        return  <ListItem button key={g.id} onClick={() =>  handleChatRoute(g.id)}>
                            <PeopleAltIcon />
                            <ListItemText className="chatListText" key={g.id} primary={g.name} />
                        </ListItem>
                
                        })}
                    </Grid>

                </Grid>

                </Container>
            </Modal>
        </div>
    )
}