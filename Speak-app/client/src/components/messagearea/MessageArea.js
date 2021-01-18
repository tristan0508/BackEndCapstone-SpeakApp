import React from 'react';
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

const useStyles = makeStyles(() =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
    }),
);


const MessageArea = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={headerTheme}>

            <AppBar position="relative" >
                <TextField
                    className="textarea"
                    multiline variant="outlined"
                    id="outline-multiline-flexible"
                    aria-label="empty textarea"
                    placeholder="Message"
                />
                <Toolbar style={{
                    backgroundColor: '#1dcaff'
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