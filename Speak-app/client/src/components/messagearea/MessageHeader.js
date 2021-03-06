import React, { useState } from 'react';
import {
    Divider,
    makeStyles,
    createStyles,
    AppBar,
    Toolbar,
    IconButton,
    ThemeProvider,
    Tooltip,
    ButtonBase,
    Avatar
} from '@material-ui/core';
import AssistantOutlinedIcon from '@material-ui/icons/AssistantOutlined';
import { headerTheme } from '../../customtheme/MaterialTheme';
import { AvatarGroup } from '@material-ui/lab';
import avatar from '../../images/headshot.jpg';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { handleOpen } from '../../utilis/utils'


const useStyles = makeStyles(() =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        topic: {

        },
        active: {
            backgroundColor: '#36454f',
            boxShadow: 'inset 0px 0px 5px #c1c1c1',
            outline: 'none'
        }
    }),
);





const MessageHeader = ({ openMenu, setOpenMenu, chatContainer, sideContainer }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [initWidth, setInitWidth] = useState(0)


    window.onresize = function(){
        let width1 = chatContainer.current.offsetWidth;
        setInitWidth(width1)
        if(width1 !== initWidth && openMenu === true){
            document.documentElement.style.setProperty('--msg-width', `${width1}px`)
        }
    }
    
    const handleResize = () => {
        let width1 = chatContainer.current.offsetWidth;
        let width2 = sideContainer.current.offsetWidth;
        openMenu? document.documentElement.style.setProperty('--msg-width', '100%') : 
        document.documentElement.style.setProperty('--msg-width', `${width1 - width2}px`)
    }

    return (
        <ThemeProvider theme={headerTheme}>
            <AppBar position="relative" style={{ backgroundColor: '#1dcaff', border: '1px solid white' }}>
                <Toolbar>
                    <IconButton color="inherit" title="Pin">
                        <AssistantOutlinedIcon />
                    </IconButton>
                    <Divider orientation="vertical" flexItem variant="middle" />
                    <ButtonBase>
                        <Tooltip
                            data-testid="handleOpen"
                            onClick={() => handleOpen(open, setOpen)}
                            open={open}
                            title="Add"
                            color="inherit"
                        >
                            <div>Topic</div>
                        </Tooltip>

                    </ButtonBase>

                    <AvatarGroup className="avatar" max={2} title={`View all 3 members`}>
                        <Avatar alt="Remy Sharp" src={avatar} />
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </AvatarGroup>

                    <IconButton data-testid="handleMenu" onClick={() => {
                        handleOpen(openMenu, setOpenMenu)
                        handleResize()
                    }} color="inherit">
                        <MenuOpenIcon className={openMenu ? classes.active : undefined} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default MessageHeader;