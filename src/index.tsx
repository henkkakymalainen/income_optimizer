import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { withStyles, WithStyles } from '@material-ui/core';
import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
import { globalStyles } from './theme';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

const AppRoot = (props: WithStyles<typeof globalStyles>) => {
    return (<AppRouter />);
}

const AppRootWithStyles = withStyles(globalStyles)(AppRoot);

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <AppRootWithStyles />
    </MuiThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
