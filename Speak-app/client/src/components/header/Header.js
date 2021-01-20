import React, { useContext } from 'react';
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { headerTheme } from '../../customtheme/MaterialTheme';
import image from '../../images/messageicon.png'
import AvatarStatus from '../customcomponents/AvartarStatus';
import { UserContext } from '../../providers/UserProvider';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        img: {
            height: 50
        }
    }),
);

const Header = () => {
    const classes = useStyles();
    const { logout } = useContext(UserContext);

    return (
        <div className={classes.root}>
            <ThemeProvider theme={headerTheme}>
                <AppBar position="static" color='primary'>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color='inherit' aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography className={classes.title}>
                            <img src={image} alt="avatar" className={classes.img} />
                        </Typography>
                        <AvatarStatus />
                        <Button onClick={logout} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
};

export default Header;
