import React, { useContext } from 'react';
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { headerTheme } from '../../customtheme/MaterialTheme';
import imageIcon from '../../images/messageicon.png'
import { StyledBadge } from '../customcomponents/AvartarStatus';
import UserContext from '../../providers/UserContext';

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
        },
        
    }),
);

const useStylesBadge = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                marginLeft: '-8px' ,
            },
        },
    }),
);


const Header = () => {
    const classes = useStyles();
    const image = localStorage.getItem("userImage");
    const classesBadge = useStylesBadge();
    const { logout } = useContext(UserContext);

    return (
        <div className={classes.root}>
            <ThemeProvider theme={headerTheme}>
                <AppBar position="static" color='primary' style={{borderBottom: '1px solid white'}}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color='inherit' aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography className={classes.title}>
                            <img src={imageIcon} alt="avatar" className={classes.img} />
                        </Typography>
                            <div className={classesBadge.root}>
                                <StyledBadge

                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant={'dot'}
                                >
                                    <Avatar key={1} alt="avatar" src={image ? image : ""} />
                                </StyledBadge>
                            </div>
                        <Button onClick={logout} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
};

export default Header;
