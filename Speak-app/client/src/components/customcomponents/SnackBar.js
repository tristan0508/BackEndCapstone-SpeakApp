import React, {useContext} from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ChatHubContext } from '../../providers/ContextProvider';


// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
//   }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));




export const SnackBar = () => {

    const classes = useStyles();
    const { openSnack, setOpenSnack } = useContext(ChatHubContext)



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenSnack(false);
  };
    return (
    <div className={classes.root}>
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center"}}>
        <Alert onClose={handleClose} severity="error">
          Already Exists!
        </Alert>
        </Snackbar>
    </div>
    )
}