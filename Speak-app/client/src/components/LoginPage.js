import React, { useContext, useState} from 'react';
import { UserContext } from '../providers/UserProvider';
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
import { history } from '../index'

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

const LoginPage = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setIsLoggedIn, login } = useContext(UserContext);
  

  const handleLogin = () => {
    login(email, password) ? setIsLoggedIn(true) : setIsLoggedIn(false)
    history.push("/dashboard")
  }

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
            Sign in
            </Typography>
            <form className={classes.form} noValidate>
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
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                onClick={handleLogin}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                as={Link}
                to="/dashboard"
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
                <Link href="#" variant="body2">
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
  );
}
export default LoginPage;