import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export let headerTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#192734'
        },
        secondary: {
            main: '#8899A6',
        },

    },
});

export let buttonTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#029EE5'
        },
        secondary: {
            main: '#22303C'
        },
    }
});

export let messageAreaTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#8899A6'
        },
        secondary: {
            main: '#192734'
        }
    }
});

export let blueTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#00aced'
        },
        secondary: {
            main: '#0084b4'
        }
    }
})


headerTheme = responsiveFontSizes(headerTheme);
buttonTheme = responsiveFontSizes(buttonTheme);
messageAreaTheme = responsiveFontSizes(messageAreaTheme);
blueTheme = responsiveFontSizes(blueTheme);

