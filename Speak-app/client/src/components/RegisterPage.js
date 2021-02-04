import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginTheme } from '../customtheme/MaterialTheme'
import { history } from '../index'
import UserContext from '../providers/UserContext';

function Copyright() {
  return (
    <Typography variant="body2" color="primary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputLabel: {
    color: 'white',
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important"
  }
}));


const RegisterPage = () =>  {
  const classes = useStyles();
  const {register} = useContext(UserContext);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")

  const handleLoginPush = () => {
    history.push("/")
  }

  const handleRegister = () => {
    if (password && password !== confirmPass) {
      alert("Passwords don't match.")
    } else {
      const user = { firstName, lastName, displayName, email };
      register(user, password)
      .then(() => history.push('/dashboard'));
    }
  };

  return (
    <ThemeProvider theme={loginTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h2">
            Speak - App
            </Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{
                    classes: {
                        root: classes.inputLabel
                    },
                  }}
                  InputProps={{
                      classes: {
                      notchedOutline: classes.notchedOutline
                      }
                  }}
                  
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                InputLabelProps={{
                  classes: {
                      root: classes.inputLabel
                      },
                  }}
                  InputProps={{
                      classes: {
                      notchedOutline: classes.notchedOutline
                      }
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e) => setLastName(e.currentTarget.value)}
                />
              </Grid>
              <Grid item xs={12} >
              <TextField
                InputLabelProps={{
                  classes: {
                      root: classes.inputLabel
                      },
                  }}
                  InputProps={{
                      classes: {
                      notchedOutline: classes.notchedOutline
                      }
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  name="displayName"
                  onChange={(e) => setDisplayName(e.currentTarget.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                InputLabelProps={{
                  classes: {
                      root: classes.inputLabel
                      },
                  }}
                  InputProps={{
                      classes: {
                      notchedOutline: classes.notchedOutline
                      }
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                InputLabelProps={{
                  classes: {
                      root: classes.inputLabel
                  },
                  }}
                  InputProps={{
                      classes: {
                      notchedOutline: classes.notchedOutline
                      }
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{
                    classes: {
                        root: classes.inputLabel
                    },
                    }}
                    InputProps={{
                        classes: {
                        notchedOutline: classes.notchedOutline
                        }
                    }}
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPass(e.currentTarget.value)}
                  />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleRegister}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link style={{ cursor: "pointer"}} variant="body2" onClick={handleLoginPush}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterPage;