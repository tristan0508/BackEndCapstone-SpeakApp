import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// import avatar from '../../images/headshot.jpg';


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

let name = `Tristan Wyatt - Date: 01/11/2021`

const MessageLayout = ({ text }) => {
    const classes = useStyles();

    return (
        <List id='layout' className={classes.root}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp"  />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                            >
                                {text.body}
              </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>

        </List>
    );
}

export default MessageLayout;