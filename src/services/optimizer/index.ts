import {
    IncomeLimit,
    StudentBenefit,
    incomeLimits,
    studentBenefits,
} from '../data/studentBenefits';
import { CalculatorForm, HourlySalary, StandardSalary, Age } from '../types';
import { ChartData } from 'react-chartjs-2';
import * as chartjs from 'chart.js';
import moment from 'moment';
export * from './housingBenefits';

const months = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const calculateIncomeUntilNineMonths = (
    incomeLimits: IncomeLimit[],
    annualIncome: number,
) => {
    const nineMonthLimit = incomeLimits.find(limit => limit.months === 9)!;
    const incomeLeft = nineMonthLimit.annualIncomeLimit - annualIncome;
    return Math.max(incomeLeft, 0);
}

export const calculateRemainingIncomeBeforeNextStep = (
    incomeLimits: IncomeLimit[],
    annualIncome: number,
) => {
    const availableMonths = incomeLimits
        .sort((a, b) => a.annualIncomeLimit - b.annualIncomeLimit)
        .filter(limit => limit.annualIncomeLimit > annualIncome);
    return availableMonths.length
        ? availableMonths[0].annualIncomeLimit - annualIncome
        : 0;
};

export const benefitsToReturn = (
    incomeLimits: IncomeLimit[],
    annualIncome: number,
    usedMonths: number,
) => {
    const limitsLeft = incomeLimits
        .sort((a, b) => a.annualIncomeLimit - b.annualIncomeLimit)
        .filter(limit => limit.annualIncomeLimit > annualIncome);
    const availableMonths = limitsLeft.length
        ? limitsLeft[0].months
        : 0;
    return Math.max(usedMonths - availableMonths, 0);
};

// Meaning benefit months left this year that you actually can use
export const calculateRemainingBenefitMonths = (
    incomeLimits: IncomeLimit[],
    annualIncome: number,
    usedMonths: number,
    date: moment.Moment,
) => {
    const availableMonths = incomeLimits
        .sort((a, b) => a.annualIncomeLimit - b.annualIncomeLimit)
        .filter(limit => limit.annualIncomeLimit > annualIncome)
        .length;
    const monthsLeftThisYear = 11 - moment(date).month();
    const unusedMonths = Math.max(availableMonths - usedMonths, 0);
    return Math.min(unusedMonths, monthsLeftThisYear);
};

export const hourlyWageToMonthlySalary = (salary: HourlySalary): StandardSalary => {
    return {
        amount: salary.monthlyHours * salary.amount,
        type: 'monthly',
    };
};

export const getStudentBenefitDataset = (
    incomeLimits: IncomeLimit[],
    studentBenefits: StudentBenefit[],
    annualIncome: number,
    monthlyIncome: number,
    usedBenefitMonths: number,
    ageGroup: Age,
    isGuardian?: boolean,
    isMarried?: boolean,
): number[] => {
    const currentMonth = moment().month();
    const dataset = new Array(12 - currentMonth).fill(0);
    return dataset.map((_, index) => {
        const remainingBenefitMonths = calculateRemainingBenefitMonths(
            incomeLimits,
            annualIncome + index * monthlyIncome,
            usedBenefitMonths + index,
            moment());
        if (remainingBenefitMonths <= 0) return 0;
        else if (isGuardian) return studentBenefits.find(b => b.isGuardian)!.amount;
        else if (isMarried) return studentBenefits.find(b => b.isMarried)!.amount;
        else if (ageGroup === '18+') return studentBenefits.find(b => b.age === '18+')!.amount;
        else if (ageGroup === 'u18') return studentBenefits.find(b => b.age === 'u18')!.amount;
        else if (ageGroup === '20+') return studentBenefits.find(b => b.age === '20+')!.amount;
        else if (ageGroup === 'u20') return studentBenefits.find(b => b.age === 'u20')!.amount;
        return 0;
    });
};

const getHousingBenefitDataSet = (benefitAmount: number) => {
    const currentMonth = moment().month();
    const dataset = new Array(12 - currentMonth).fill(0);
    return dataset.map((_, index) => benefitAmount);
};

export const getIncomeProjectionDataset = (form: CalculatorForm, housingBenefit: number): chartjs.ChartData => {
    const { grossIncome, salaries, usedMonths } = form;
    const monthlySalaries = salaries
        .filter(salary => salary.type === 'hourly')
        .map(salary => salary as HourlySalary) // Gotta force this type for the compiler
        .map(hourlyWageToMonthlySalary)
        .concat(salaries.filter(salary => salary.type === 'monthly'))
    const singleMonthsIncome = monthlySalaries.reduce((total, salary) => total + salary.amount, 0);
    const nextMonth = moment().add(1, 'months').month();
    const labels = months.slice(nextMonth);
    const datapoints = new Array<number>(12 - nextMonth).fill(singleMonthsIncome);
    const salaryDatasets = {
        data: datapoints,
        label: 'Gross salary YTD',
        backgroundColor: 'rgba(255, 99, 132)',
    };
    const benefitDatapoints = getStudentBenefitDataset(
        incomeLimits,
        studentBenefits,
        grossIncome,
        singleMonthsIncome,
        usedMonths,
        '18+');
    const benefitDatasets = {
        data: benefitDatapoints,
        label: 'Student benefits',
        backgroundColor: 'rgba(54, 162, 235)',
    };
    const housingBenefitDatasets = {
        data: getHousingBenefitDataSet(housingBenefit),
        label: 'Housing benefits',
        backgroundColor: '#FFCC56',
    };
    return {
        labels,
        datasets: [salaryDatasets, benefitDatasets, housingBenefitDatasets],
    }
};

export const getIncomeBreakdownDataset = (form: CalculatorForm, housingBenefit: number): chartjs.ChartData => {
    const { age } = form;
    const monthlyBenefit = studentBenefits.find(b => b.age === age)!.amount;
    const currentMonth = moment().month()
    return {
        labels: [
            'Salary',
            'Student benefits',
            'Housing benefits',
        ],
        datasets: [{
            data: [form.grossIncome, monthlyBenefit * form.usedMonths, housingBenefit * currentMonth],
            backgroundColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)', 'rgba(255, 205, 86)'],
        }],
    };
};

export const getMonthlyBenefitAmount = (studentBenefits: StudentBenefit[], age: Age): number => {
    return studentBenefits.find(b => b.age === age)!.amount;
};
