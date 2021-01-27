import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import avatar from '../../images/Sam.png';

const StyledBadge = withStyles((theme) =>
    createStyles({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
    }),
)(Badge);

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                marginLeft: '-8px' ,
            },
        },
    }),
);

const AvatarStatus = () => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <StyledBadge

                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
                <Avatar alt="avatar" src={avatar} />
            </StyledBadge>
        </div>
    );
};

export default AvatarStatus;