import React, { useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginTheme } from '../customtheme/MaterialTheme'
import { useHistory } from 'react-router-dom';




const Copyright = () => {
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
    marginTop: theme.spacing(1),
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



export const LoginPage = ({login}) => {
  const classes = useStyles();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const history = useHistory()


  const handleLogin = () => {
      login(email, password)
  }

  const handleRegisterPush = () => {
    history.push("/register")
  }

  return (
    <div>
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
            Sign in
            </Typography>
            <form id="loginForm" className={classes.form} noValidate>
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
                data-testid="email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="text"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
            />
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
                data-testid="password"
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                data-testid="signIn"
                onClick={handleLogin}
                id='signIn'
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link style={{ cursor: 'pointer'}} variant="body2" onClick={handleRegisterPush}>
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    </ThemeProvider>
    </div>
  );
}
