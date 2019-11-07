import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import HeaderBar from '../components/HeaderBar';

type Props = WithStyles<typeof styles>;

const Calculator = (props: Props) => {
    return (
        <>
            <HeaderBar />
        </>
    );
};

const styles = {};

export default withStyles(styles)(Calculator);
