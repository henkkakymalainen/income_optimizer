import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

const months = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface OwnProps {
    width: number,
    data: number[],
};

type Props = OwnProps;

const Graph = (props: Props) => {
    const classes = useStyles();
    const { width } = props;

    const data = {
        labels: months.slice(moment().add(-1, 'months').month()),
        datasets: [
            {
                label: '',
                fill: false,
                data: props.data,
            },
        ],
    };


    return (
        <div className={classes.container}>
            <div className={classes.graph}>
                <Line
                    data={data}
                    width={width}
                    height={width * 0.5}
                    options={{
                        maintainAspectRatio: false,
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
