import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

interface OwnProps {
    label: string,
    value: string,
}

type Props = OwnProps;

const StatText = (props: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid container className={classes.stat}>
                <Grid item xs={7}>
                    <Typography>
                        <strong>{ props.label }</strong>
                    </Typography>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={3}>
                    <Typography>
                        { props.value }
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingTop: theme.spacing(3),
            flexDirection: 'column',
        },
        stat: {
            maxWidth: 500,
            padding: theme.spacing(2),
        },
}));

export default StatText;
