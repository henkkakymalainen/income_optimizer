import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/core';

export const theme = createMuiTheme({
    spacing: 8,
    typography: {
        fontFamily: '"Roboto", "Arial", sans-serif',
        htmlFontSize: 10,
    },
    shape: {
        borderRadius: 4,
    },
    // Add more properties here as necessary
});

export const globalStyles = createStyles({
    '@global': {
        html: {
            backgroundColor: '#fafafa',
            boxSizing: 'border-box',
            height: '100%',
            width: '100%',
            fontSize: '62.5%',
            '&.large-font': {
                fontSize: '68.75%',
            },
        },
        body: {
            margin: 0,
            padding: 0,
            height: '100%',
            width: '100%',
            '#root': {
                height: '100%',
                width: '100%',
            },
        },
    },
});

export default theme;
