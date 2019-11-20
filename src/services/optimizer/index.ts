import { incomeLimits } from '../data/studentBenefits';
import { CalculatorForm, HourlySalary, StandardSalary } from '../types';
import moment from 'moment';


// TODO: Just on example, probably not ideal implementation, and not
// sure at all if this works or not
export const calculateRemainingIncomeBeforeNextStep = (annualIncome: number) => {
    const availableMonths = incomeLimits
        .sort((a, b) => a.annualIncomeLimit - b.annualIncomeLimit)
        .filter(limit => limit.annualIncomeLimit > annualIncome);
    return availableMonths.length
        ? availableMonths[0].annualIncomeLimit - annualIncome
        : 0;
};

export const hourlyWageToMonthlySalary = (salary: HourlySalary): StandardSalary => {
    return {
        amount: salary.monthlyHours * salary.amount,
        type: 'monthly',
    };
};

export const generateSalaryDatapoints = (form: CalculatorForm): number[] => {
    const { grossIncome, salaries } = form;
    const monthlySalaries = salaries
        .filter(salary => salary.type === 'hourly')
        .map(salary => salary as HourlySalary) // Gotta force this type for the compiler
        .map(hourlyWageToMonthlySalary)
        .concat(salaries.filter(salary => salary.type === 'monthly'))
    const singleMonthsIncome = monthlySalaries.reduce((total, salary) => total + salary.amount, 0);
    const datapoints = new Array<number>(12 - moment().add(-1, 'months').month()).fill(0);
    const result = datapoints.map((_, index) => grossIncome + index * singleMonthsIncome);
    return result;
};
