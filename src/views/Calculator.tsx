import React from 'react';
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core';

type Props = WithStyles<typeof styles>;

const Calculator = (props: Props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            Income optimizer
        </div>
    );
};

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: '#777',
    }
})

export default withStyles(styles)(Calculator);
