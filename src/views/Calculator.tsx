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

import StackedBar from '../components/StackedBar';
import PieChart from '../components/PieChart';
import StatText from '../components/StatText';

import classNames from 'classnames';
import { CalculatorForm, Age } from '../services/types';
import { incomeLimits, studentBenefits } from '../services/data/studentBenefits';
import {
    getIncomeProjectionDataset,
    getIncomeBreakdownDataset,
    calculateIncomeUntilNineMonths,
    calculateRemainingBenefitMonths,
    benefitsToReturn,
    getMonthlyBenefitAmount,
} from '../services/optimizer';
import * as chartjs from 'chart.js';
import moment from 'moment';

const Calculator = () => {
    const classes = useStyles();
    const [ annualIncome, setAnnualIncome ] = useState<number | ''>('');
    const [ salaryRow, setSalaryRow ] = useState<number | ''>('');
    const [ salaryRowType, setSalaryRowType ] = useState<'monthly' | 'hourly'>('monthly');
    const [ usedMonths, setUsedMonths ] = useState(0);
    const [ housingCosts, setHousingCosts ] = useState<number | ''>('');
    const [ houseHoldSize, setHouseHoldSize ] = useState<number | ''>(1);
    const [ hasHouseMates, setHasHouseMates ] = useState(false);
    const [ graphData, setGraphData ] = useState<chartjs.ChartData>();
    const [ incomeBreakdown, setIncomeBreakdown ] = useState<chartjs.ChartData>();
    const [ incomeLimit, setIncomeLimit ] = useState<number | null>(null);
    const [ remainingMonths, setRemainingMonths ] = useState<number | null>(null);
    const [ monthsToReturn, setMonthsToReturn ] = useState<number>(0);
    const [ age, setAge ] = useState<Age>('18+');

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
        return [
            typeof annualIncome === 'number',
            typeof salaryRow === 'number',
            typeof housingCosts === 'number',
            typeof houseHoldSize === 'number',
        ].every(fieldIsValid => fieldIsValid)
    };

    // We can force the values to numbers, since this
    // function is never called before formIsValid() is called.
    const getFormData = (): CalculatorForm => {
        return {
            grossIncome: annualIncome as number,
            salaries: [{
                type: salaryRowType,
                amount: salaryRow as number,
                ...(salaryRowType === 'hourly' && { monthlyHours: 60 })
            }],
            usedMonths,
            housingCosts: housingCosts as number,
            houseHoldSize: houseHoldSize as number,
        };
    };

    const handleCalculateButton = () => {
        if (!formIsValid()) return;
        const form = getFormData();
        const salaryData = getIncomeProjectionDataset(form);
        const breakdown = getIncomeBreakdownDataset(form);
        const incomeUntilNineMonthLimit = calculateIncomeUntilNineMonths(incomeLimits, form.grossIncome);
        const remainingBenefitMonths = calculateRemainingBenefitMonths(
            incomeLimits,
            form.grossIncome,
            form.usedMonths,
            moment());
        const benefitMonthsToReturn = benefitsToReturn(incomeLimits, form.grossIncome, form.usedMonths);
        console.log(`How much can I still make and still withdraw 9 months of benefits? ${incomeUntilNineMonthLimit}`);
        salaryData && setGraphData(salaryData);
        breakdown && setIncomeBreakdown(breakdown);
        setIncomeLimit(incomeUntilNineMonthLimit);
        setRemainingMonths(remainingBenefitMonths);
        setMonthsToReturn(benefitMonthsToReturn);
    };

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
                        color="primary"
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
                        disabled={!formIsValid()}
                    >
                        Calculate
                    </Button>
                </div>
            </Container>
        )
    };

    return (
        <>

        <div>


            {renderCalculatorForm()}
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
            { typeof incomeLimit === 'number' &&
                <StatText
                    label="Salary left to earn to still be able to withdraw 9 months of student benefits:"
                    value={`${incomeLimit} €`}
                />
            }
            { typeof remainingMonths === 'number' &&
                <StatText
                    label="Number of months you can still withdraw benefits from this year:"
                    value={`${remainingMonths}`}
                />
            }
            { monthsToReturn &&
                <StatText
                    label="You have withdrawn benefits from too many months. You must return them from"
                    value={`${monthsToReturn} months = ${monthsToReturn * getMonthlyBenefitAmount(studentBenefits, age)} €`}
                />
            }

        </div>
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
