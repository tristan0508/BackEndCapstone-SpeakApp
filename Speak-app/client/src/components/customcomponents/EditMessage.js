import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ChatContext, ChatHubContext } from '../../providers/ContextProvider';



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
        editField: {
            color: 'white !important',
            width: '100%',
        },
        inputLabel: {
            color: 'white',
        },
        notchedOutline: {
          borderWidth: "1px",
          borderColor: "white !important"
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }),
);


export const EditMessage = ({msg, msgId, chatId, setEditMsg}) => {
    const classes = useStyles();
    const [message, setMessage] = useState(msg);
    const { Update } = useContext(ChatHubContext);

    
    
    return (
        <div>
            <TextField
                InputLabelProps={{
                classes: {
                root: classes.inputLabel
                },
                }}
                color="secondary"
                className={classes.editField}
                label="Edit"
                variant="filled"
                onChange={(e) => setMessage(e.currentTarget.value)}
                value={message}/>
                    <Button
                        style={{ border: '1px solid white'}}
                        id='addChannel'
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={async() => {
                           await Update(msgId, message, chatId)
                            setEditMsg("")
                        }}
                        >
                        Save Changes
                    </Button>
        </div>
    )
}