import React from 'react';
import { db } from '../services/firebase';
import { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import LineChart from '../components/LineChart';
import * as chartjs from 'chart.js';
import moment from 'moment';

const Stats = () => {

    const theme = useTheme();
    const [ data, setData ] = useState<chartjs.ChartData>()

    const fetchData = async () => {
        const prev_2 = moment().add(-2, 'months').format('MMM');
        const prev_1 = moment().add(-1, 'months').format('MMM');
        const curr = moment().format('MMM');
        const snap = await db
            .collection('queries')
            .where('timestamp', '>', moment().add(-2, 'months').startOf('month').toISOString()).get();
        console.log(snap.docs);
        const timestamps = snap
            .docs
            .map(doc => moment(doc.data().timestamp));
        const twoAgo = timestamps
            .filter(time => time.isBefore(moment().add(-1, 'months').startOf('month')));
        const oneAgo = timestamps
            .filter(time => time.isBefore(moment().startOf('month')));
        const thisMonth = timestamps
            .filter(time => time.isAfter(moment().startOf('month')))
        const dataset = {
            labels: [prev_2, prev_1, curr],
            datasets: [{
                data: [twoAgo.length, oneAgo.length, thisMonth.length],
                label: 'Frequency',
                backgroundColor: theme.palette.blue.main,
            }],
        };
        setData(dataset);
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            { data &&
                <LineChart
                    data={data}
                    width={600}
                    title="Frequency of queries"
                />
            }
        </div>
    );
};

export default Stats;
