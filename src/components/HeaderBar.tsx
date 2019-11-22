import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import history from '../services/history';

const HeaderBar = () => {
    const classes = useStyles();
    return (
        <AppBar
            position="static"
            classes={{
                colorPrimary: classes.primary
            }}
            color="primary"
        >
            <Toolbar>
                <IconButton
                    edge={false}
                    className={classes.menuButton}
                    onClick={() => history.push('/')}
                >
                    Calculator
                </IconButton>
                <IconButton
                    edge={false}
                    className={classes.menuButton}
                    onClick={() => history.push('/stats')}
                >
                    Stats
                </IconButton>
                <IconButton
                    edge={false}
                    className={classes.menuButton}
                    onClick={() => history.push('/news')}
                >
                    News
                </IconButton>
                <IconButton
                    edge={false}
                    className={classes.menuButton}
                    onClick={() => history.push('/about')}
                >
                    About
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        primary: {
            backgroundColor: theme.palette.blue.dark,
        },
        menuButton: {
            marginRight: 8,
            color: '#fafafa',
        },
}));

export default HeaderBar;
