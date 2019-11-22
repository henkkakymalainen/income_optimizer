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

import Graph from '../components/Graph';

import StackedBar from '../components/StackedBar';
import PieChart from '../components/PieChart';
import StatText from '../components/StatText';

import classNames from 'classnames';
import { CalculatorForm, Age, Salary, HourlySalary } from '../services/types';
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
    const [ salaries, setSalaries ] = useState<Salary[]>([
        {
            type: 'monthly',
            amount: 0,
        },
    ]);
    const [ usedMonths, setUsedMonths ] = useState(0);
    const [ housingCosts, setHousingCosts ] = useState<number | ''>('');
    const [ houseHoldSize, setHouseHoldSize ] = useState<number | ''>(1);
    const [ hasHouseMates, setHasHouseMates ] = useState(false);
    const [ graphData, setGraphData ] = useState<chartjs.ChartData>();
    const [ incomeBreakdown, setIncomeBreakdown ] = useState<chartjs.ChartData>();
    const [ incomeLimit, setIncomeLimit ] = useState<number | null>(null);
    const [ remainingMonths, setRemainingMonths ] = useState<number | null>(null);
    const [ monthsToReturn, setMonthsToReturn ] = useState<number>(0);
    const [ isLivingWithParents, setIsLivingWithParents ] = useState<boolean | ''>('');
    const [ isMarried, setIsMarried ] = useState(false);
    const [ kids, setKids ] = useState(0);
    const [ age, setAge ] = useState<Age | ''>('');

    const renderSalaryField = (salary: Salary, index: number) => {

        const handleValueChange = (field: string, value: string, index: number) => {
            const newValue = field === 'type'
                ? value
                : parseInt(value);
            const updatedSalary: Salary = {
                ...salary,
                [field]: newValue,
            };
            const updatedSalaries = [...salaries];
            updatedSalaries.splice(index, 1, updatedSalary);
            setSalaries(updatedSalaries);
        };

        return (
            <Grid container key={index} className={classes.row}>
                <Grid item>
                     <TextField
                        required
                        id="currentSalary"
                        label="Current salary"
                        className={classNames(classes.textField, classes.narrowField)}
                        margin="normal"
                        variant="outlined"
                        value={salary.amount || ''}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => handleValueChange('amount', e.target.value, index)}
                        type="number"
                    />
                </Grid>
                { salary.type === 'hourly' &&
                    <Grid item>
                        <TextField
                            required
                            id="monthlyHours"
                            label="Monthly hours"
                            className={classNames(classes.textField, classes.narrowField)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            value={(salary as HourlySalary).monthlyHours || ''}
                            onChange={e => handleValueChange('monthlyHours', e.target.value, index)}
                            type="number"
                        />
                    </Grid>
                }
                <Grid item>
                    <TextField
                        id='units'
                        name='units'
                        select
                        className={classNames(classes.textField, classes.narrowField)}
                        value={salary.type}
                        onChange={e => handleValueChange('type', e.target.value, index)}
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
                </Grid>
                { (index === salaries.length - 1) &&
                    <Grid item>
                        <FormControl
                            margin="normal"
                            variant="outlined"
                        >
                                <Button
                                    variant="outlined"
                                    onClick={() => setSalaries(
                                        [ ...salaries,
                                            { type: 'monthly', amount: 0 }
                                        ]
                                    )}
                                    className={classes.button}
                                >
                                    Add row
                                </Button>
                        </FormControl>
                    </Grid>
                }
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
                        label="Household size (adults)"
                        className={classNames(classes.row, classes.textField)}
                        value={houseHoldSize}
                        onChange={handleHouseHoldSizeChange}
                        margin="normal"
                        variant="outlined" />
               }
            </>
        );
    };

    const renderIndependenceField = () =>
        <TextField
            required
            id="liveWithParents"
            label="I live with my parents"
            className={classNames(classes.row, classes.textField)}
            margin="normal"
            variant="outlined"
            value={isLivingWithParents}
            onChange={e => e.target.value === 'true'
                ? setIsLivingWithParents(true)
                : e.target.value === 'false'
                    ? setIsLivingWithParents(false)
                    : setIsLivingWithParents('')}
            InputLabelProps={{
                shrink: true,
            }}
            SelectProps={{
                displayEmpty: false,
                native: true,
            }}
            select
        >
            <option value="">Select one</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
        </TextField>;

    const renderAgeField = () => {
        const relevantOptions = isLivingWithParents === true
            ? [
                { value: '', label: 'Choose age group'},
                { value: 'u20', label: '17-19 years old'},
                { value: '20+', label: '20 or older'}
            ]
            : [
                { value: '', label: 'Choose age group'},
                { value: 'u18', label: 'Under 18 years old'},
                { value: '18+', label: '18 or older'}
            ];

        return (
            <TextField
                required
                id="age"
                label="Age"
                className={classNames(classes.row, classes.textField)}
                margin="normal"
                variant="outlined"
                value={age}
                onChange={e => setAge(e.target.value as Age)}
                InputLabelProps={{
                    shrink: true,
                }}
                SelectProps={{
                    displayEmpty: false,
                    native: true,
                }}
                select
            >
                { relevantOptions.map((opt, index) =>
                    <option key={`${index} ${opt.value}`} value={opt.value}>
                        { opt.label }
                    </option>
                ) }
            </TextField>
        );
    };

    const renderMarriedField = () =>
        <TextField
            required
            id="isMarried"
            label="Married"
            className={classNames(classes.row, classes.textField)}
            margin="normal"
            variant="outlined"
            value={isMarried}
            onChange={e => e.target.value === 'true'
                ? setIsMarried(true)
                : setIsMarried(false)}
            InputLabelProps={{
                shrink: true,
            }}
            SelectProps={{
                displayEmpty: false,
                native: true,
            }}
            select
        >
            <option value="true">Yes</option>
            <option value="false">No</option>
        </TextField>;

    const renderKidsField = () =>
        <TextField
            required
            id="kids"
            label="Number of children"
            className={classNames(classes.row, classes.textField)}
            margin="normal"
            variant="outlined"
            value={kids}
            onChange={e => setKids(parseInt(e.target.value))}
            InputLabelProps={{
                shrink: true,
            }}
            type="number"
        />

    const formIsValid = (): boolean => {
        return [
            typeof annualIncome === 'number',
            typeof housingCosts === 'number',
            typeof houseHoldSize === 'number',
            typeof isLivingWithParents === 'boolean',
            age !== '',
        ].every(fieldIsValid => fieldIsValid)
    };

    // We can force the values to numbers, since this
    // function is never called before formIsValid() is called.
    const getFormData = (): CalculatorForm => {
        return {
            grossIncome: annualIncome as number,
            salaries,
            usedMonths,
            housingCosts: housingCosts as number,
            houseHoldSize: houseHoldSize as number,
            age: age as Age,
            isMarried,
            kids,
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
                        label="Annual gross income (€)"
                        className={classNames(classes.row, classes.textField)}
                        value={annualIncome}
                        onChange={e => setAnnualIncome(Number(e.target.value))}
                        color="primary"
                        margin="normal"
                        variant="outlined" />
                    { salaries.map(renderSalaryField) }
                    { renderUsedBenefitMonths() }
                    <TextField
                        required
                        id="housingCosts"
                        label="Housing costs (€ / mo)"
                        className={classNames(classes.row, classes.textField)}
                        value={housingCosts}
                        onChange={e => setHousingCosts(Number(e.target.value))}
                        margin="normal"
                        variant="outlined" />
                    { renderIndependenceField() }
                    { typeof isLivingWithParents === 'boolean' &&
                        renderAgeField()
                    }
                    { renderHouseholdSizeFields() }
                    { renderMarriedField() }
                    { renderKidsField() }
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
            { monthsToReturn && age !== '' &&
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
            maxWidth: 200,
        },
        narrowField: {
            maxWidth: 150,
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
            maxWidth: 600,
        },
        button: {
            height: theme.spacing(7),
        },
        radios: {
            paddingLeft: theme.spacing(1),
        },
}));

export default Calculator;
