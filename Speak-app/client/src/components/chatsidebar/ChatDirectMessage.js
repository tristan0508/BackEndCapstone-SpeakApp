import React, { useContext, useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { ChatContext } from '../../providers/ContextProvider';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { UserList } from './UserList';


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


export const ChatDirectMessage = () => {
    const classes = useStyles();
    const { openModal, setOpenModal, allUsers } = useContext(ChatContext)
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        console.log(allUsers)
        if (searchTerms !== "") {
            const subset = allUsers.filter(user => user.displayName.toLowerCase().includes(searchTerms.toLowerCase().trim()))
            console.log(subset)
            setFilteredUsers(subset)
        } else {
            setFilteredUsers(allUsers)
        }
    }, [searchTerms, allUsers])

  

    return (
        <div>
            <Modal
                className={classes.modal}
                open={openModal}
                onBackdropClick={() => setOpenModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Container className={classes.paper}>
                <Grid container >
                    <Grid item xs={12}>
                    <InputBase
                    placeholder={`Type the name of the person...`}
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
                        <UserList filteredUsers={filteredUsers}/>
                    </Grid>

                </Grid>

                </Container>
            </Modal>
        </div>
    )
}