import React, { useState, useContext, useEffect } from 'react';
import { ChatHubContext } from '../../providers/ChatHubProvider'
import {
    makeStyles,
    TextField,
    createStyles,
    AppBar,
    Toolbar,
    IconButton,
    ThemeProvider
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { headerTheme } from '../../customtheme/MaterialTheme';
import { ChatContext } from '../../providers/ChatProvider';

const useStyles = makeStyles(() =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
    }),
);

const MessageArea = () => {
    const classes = useStyles();
    const [input, setInput] = useState("")
    const { addMessage, currentChatParam } = useContext(ChatHubContext);
    const { GetMessages } = useContext(ChatContext)
  

    useEffect(() => {

    }, [GetMessages, currentChatParam, addMessage])
 

    return (
        <ThemeProvider theme={headerTheme}>

            <AppBar position="relative" >
                <TextField
                    className="textarea"
                    multiline variant="outlined"
                    id="outline-flexible"
                    aria-label="empty textarea"
                    placeholder="Message"
                    onChange={(e) => {
                        if (e.nativeEvent.inputType !== 'insertLineBreak'){
                            setInput(e.currentTarget.value)
                        }
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter' && input.length !== 1){
                            addMessage(input)
                            GetMessages(currentChatParam)
                            setInput("")
                        }
                    }}
                    value={input}
                />
                <Toolbar style={{
                    backgroundColor: '#1dcaff',
                    borderTop: '1px solid white'
                }}>
                    < div className={classes.grow} />
                    <IconButton edge="start" color="inherit" aria-label="open drawer">
                        <InsertEmoticonIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit">
                        <SendIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

        </ThemeProvider>
    )
}

export default MessageArea;