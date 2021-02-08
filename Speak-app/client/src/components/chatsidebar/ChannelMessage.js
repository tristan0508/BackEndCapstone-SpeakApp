import React, { useContext, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { ChatContext, ChatHubContext, UserContext } from '../../providers/ContextProvider';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, ThemeProvider } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { headerTheme } from '../../customtheme/MaterialTheme';


const useStyles = makeStyles((theme) => ({
    
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 300,
      height: 230,
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
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
  }));


export const ChannelMessage = () => {
    const classes = useStyles();
    const { openChannelModal, setOpenChannelModal, GetUserChat } = useContext(ChatContext);
    const { AddChat } = useContext(ChatHubContext);
    const { displayName } = useContext(UserContext);
    const [channelName, setChannelName] = useState("");

  const handleChannel = () => {
    const Chat = {
        name: channelName,
        type: "Channel",
        sender: displayName,

    }
    AddChat(Chat)
    .then(() => GetUserChat())
    setOpenChannelModal(false)
    setChannelName("")
  }

    return (
        <div>
            <ThemeProvider theme={headerTheme}>
            <Modal
                className={classes.modal}
                open={openChannelModal}
                onBackdropClick={() => setOpenChannelModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Container className={classes.paper}>
                <Grid container >
                    <Grid item xs={12}>
                    <h4>Channel</h4>
                    <InputBase
                    placeholder={`Channel Name...`}
                    inputProps={{ 'aria-label': 'search' }}
                    style={{ border: '1px solid white', width: '100%', height: '40px',
                             borderRadius: '5px', padding: '5px' }}
                    value={channelName}
                    onChange={(e) => setChannelName(e.currentTarget.value)}
                    />
                    
                    </Grid>
                    <Grid item xs={12}>
                    <Button
                        style={{ border: '1px solid white'}}
                        onClick={() => {
                        handleChannel()
                        }}
                        id='addChannel'
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Add Channel
                    </Button>
                    </Grid>

                </Grid>

                </Container>
            </Modal>
            </ThemeProvider>
        </div>
    )
}