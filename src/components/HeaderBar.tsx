import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

type Props = WithStyles<typeof styles>;

const HeaderBar = (props: Props) => {
    const { classes } = props;
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton}>
                    Calculator
                </IconButton>
                <IconButton edge="start" className={classes.menuButton}>
                    Stats
                </IconButton>
                <IconButton edge="start" className={classes.menuButton}>
                    News
                </IconButton>
                <IconButton edge="start" className={classes.menuButton}>
                    About
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

const styles = {
    menuButton: {
        marginRight: 8,
        color: '#fafafa',
    },
};

export default withStyles(styles)(HeaderBar);
