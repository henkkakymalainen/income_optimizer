import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ChartData } from 'react-chartjs-2';
import * as chartjs from 'chart.js';

interface OwnProps {
    width: number,
    data: ChartData<chartjs.ChartData>,
};

type Props = OwnProps;

const Graph = (props: Props) => {
    const classes = useStyles();
    const { width, data } = props;

    return (
        <div className={classes.container}>
            <div className={classes.graph}>
                <Bar
                    data={data}
                    width={width}
                    height={width * 0.5}
                    options={{
                        scales: {
                            yAxes: [{
                                stacked: true,
                            }],
                            xAxes: [{
                                stacked: true,
                            }],
                        }
                    }}
                    legend={{
                        display: false,
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
            justifyContent: 'center',
            paddingTop: theme.spacing(3),
        },
        graph: {
            maxWidth: 600,
        },
}));

export default Graph;
