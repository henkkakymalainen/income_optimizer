import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ChartData } from 'react-chartjs-2';
import * as chartjs from 'chart.js';

interface OwnProps {
    width: number,
    data: ChartData<chartjs.ChartData>,
    title: string,
};

type Props = OwnProps;

const PieChart = (props: Props) => {
    const classes = useStyles();
    const { width, data } = props;

    return (
        <div className={classes.container}>
            <Typography
                variant="h4"
                className={classes.title}
            >
                { props.title }
            </Typography>
            <div className={classes.graph}>
                <Pie
                    data={data}
                    width={width}
                    height={width}
                    options={{
                        cutoutPercentage: 0,
                    }}
                />
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingTop: theme.spacing(3),
            flexDirection: 'column',
        },
        graph: {
            maxWidth: 600,
        },
        title: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
}));

export default PieChart;
