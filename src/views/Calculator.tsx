import * as React from 'react';
import { useState } from 'react';
import {
    TextField,
    Container,
    Grid, Button,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import HeaderBar from '../components/HeaderBar';
import StackedBar from '../components/StackedBar';
import PieChart from '../components/PieChart';
import classNames from 'classnames';
import { CalculatorForm } from '../services/types';
import {
    getIncomeProjectionDataset,
    getIncomeBreakdownDataset,
} from '../services/optimizer';
import * as chartjs from 'chart.js';

const Calculator = () => {
    const classes = useStyles();
    const [ annualIncome, setAnnualIncome ] = useState<number | ''>('');
    const [ salaryRow, setSalaryRow ] = useState<number | ''>('');
    const [ salaryRowType, setSalaryRowType ] = useState<'monthly' | 'hourly'>('monthly');
    const [ usedMonths, setUsedMonths ] = useState(0);
    const [ housingCosts, setHousingCosts ] = useState<number | ''>('');
    const [ houseHoldSize, setHouseHoldSize ] = useState<number | ''>('');
    const [ hasHouseMates, setHasHouseMates ] = useState(false);
    const [ graphData, setGraphData ] = useState<chartjs.ChartData>();
    const [ incomeBreakdown, setIncomeBreakdown ] = useState<chartjs.ChartData>();

    const renderSalaryField = () => {

        const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === 'monthly' || event.target.value === 'hourly') {
                setSalaryRowType(event.target.value);
            }
        };

        return (
            <Grid container className={classes.row}>
                <Grid item>
                     <TextField
                        required
                        id="currentSalary"
                        label="Current salary"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={salaryRow}
                        onChange={e => setSalaryRow(parseInt(e.target.value) || '')}
                    />
                    <TextField
                        id='units'
                        name='units'
                        select
                        className={classes.textField}
                        value={salaryRowType}
                        onChange={handleTypeChange}
                        InputLabelProps={{
                            shrink: true,
                            style: {
                                maxWidth: 120,
                            },
                        }}
                        SelectProps={{
                            displayEmpty: false,
                            native: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        type="text"
                    >
                        <option value="monthly">
                            € / mo
                        </option>
                        <option value="hourly">
                            € / h
                        </option>
                    </TextField>
                    <FormControl
                        margin="normal"
                        variant="outlined"
                    >
                        <Button
                            variant="outlined"
                            onClick={() => {}}
                            className={classes.button}
                        >
                            Add row
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        )
    };

    const renderUsedBenefitMonths = () => {
        return (
            <TextField
                required
                id="usedMonths"
                label="Used benefit months"
                className={classNames(classes.row, classes.textField)}
                margin="normal"
                variant="outlined"
                value={usedMonths}
                onChange={e => setUsedMonths(parseInt(e.target.value))}
                InputLabelProps={{
                    shrink: true,
                }}
                SelectProps={{
                    displayEmpty: false,
                    native: true,
                }}

                select
            >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
            </TextField>
        );
    };

    const renderHouseholdSizeFields = () => {

        const handleHouseMateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setHasHouseMates((event.target as HTMLInputElement).value === 'true')
        };

        const handleHouseHoldSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setHouseHoldSize(parseInt(event.target.value) || '');
        };

        return (
            <>
                <FormControl component="fieldset" className={classes.radios}>
                    <RadioGroup name="houseHoldSize" value={hasHouseMates} onChange={handleHouseMateChange}>
                        <FormControlLabel value={false} control={<Radio />} label="I live alone" />
                        <FormControlLabel value={true} control={<Radio />} label="I live with others" />
                    </RadioGroup>
                </FormControl>
                { hasHouseMates &&
                     <TextField
                        required
                        id="houseMateCount"
                        label="Household size"
                        className={classNames(classes.row, classes.textField)}
                        value={houseHoldSize}
                        onChange={handleHouseHoldSizeChange}
                        margin="normal"
                        variant="outlined" />
               }
            </>
        );
    };

    const formIsValid = (): boolean => {
        return false;
    };

    const getFormData = (): CalculatorForm => {
        return {
            grossIncome: typeof annualIncome === 'number'
                ? annualIncome
                : 0,
            salaries: [{
                type: salaryRowType,
                amount: typeof salaryRow === 'number'
                    ? salaryRow
                    : 0,
                ...(salaryRowType === 'hourly' && { monthlyHours: 60 })
            }],
            usedMonths,
            housingCosts: typeof housingCosts === 'number'
                ? housingCosts
                : 0,
            houseHoldSize: typeof houseHoldSize === 'number'
                ? houseHoldSize
                : 1,
        };
    };

    const handleCalculateButton = () => {
        const form = getFormData();
        const salaryData = getIncomeProjectionDataset(form);
        const breakdown = getIncomeBreakdownDataset(form);
        salaryData && setGraphData(salaryData);
        breakdown && setIncomeBreakdown(breakdown);
    }

    const renderCalculatorForm = () => {
        return (
            <Container className={classes.center}>
                <div className={classNames(classes.column, classes.section)}>
                    <TextField
                        required
                        id="annualIncome"
                        label="Total annual gross income (€)"
                        className={classNames(classes.row, classes.textField)}
                        value={annualIncome}
                        onChange={e => setAnnualIncome(Number(e.target.value))}
                        margin="normal"
                        variant="outlined" />
                    { renderSalaryField() }
                    { renderUsedBenefitMonths() }
                    <TextField
                        required
                        id="housingCosts"
                        label="Monthly housing costs (€)"
                        className={classNames(classes.row, classes.textField)}
                        value={housingCosts}
                        onChange={e => setHousingCosts(Number(e.target.value))}
                        margin="normal"
                        variant="outlined" />
                    { renderHouseholdSizeFields() }
                    <Button
                        className={classes.textField}
                        variant="contained"
                        color="primary"
                        onClick={handleCalculateButton}
                    >
                        Calculate
                    </Button>
                </div>
            </Container>
        )
    };

    return (
        <>
            <HeaderBar />
            {renderCalculatorForm()}
            {
            // 1. whole year's income breakdown
            // 2. Projected income for the coming months until EOY
            // 3. How much more can I make to not lose any benefits (or
            //    to withdraw 9 months of benefits)
            }
            { incomeBreakdown &&
                <PieChart
                    width={600}
                    data={incomeBreakdown}
                    title="Income breakdown"
                />
            }
            { graphData &&
                <StackedBar
                    width={600}
                    data={graphData}
                    title="Income projections until end of year"
                />
            }
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            maxWidth: 250,
        },
        center: {
            display: 'flex',
            justifyContent: 'center',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
        },
        section: {
            marginTop: theme.spacing(3),
        },
        row: {
            maxWidth: 500,
        },
        button: {
            height: theme.spacing(7),
        },
        radios: {
            paddingLeft: theme.spacing(1),
        },
}));

export default Calculator;
