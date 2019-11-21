import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

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
                <IconButton edge="start" className={classes.menuButton}>
                    Calculator
                </IconButton>
                <IconButton edge="start" className={classes.menuButton}>
                    Stats
                </IconButton>
                <IconButton edge="start" className={classes.menuButton}>
                    Info
                </IconButton>
                <IconButton edge="start" className={classes.menuButton}>
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
