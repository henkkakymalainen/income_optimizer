import casual from 'casual';
import {
    hourlyWageToMonthlySalary,
    getIncomeProjectionDataset,
    calculateRemainingIncomeBeforeNextStep,
    getStudentBenefitDataset,
} from '../optimizer';
import { CalculatorForm, HourlySalary, StandardSalary } from '../types';
import moment from 'moment';
import { studentBenefits, incomeLimits } from '../data/studentBenefits';

describe('calculateRemainingIncomeBeforeNextStep()', () => {
    let annualIncome: number;

    beforeEach(() => {
        // This is how you can generate random values between certain ranges
        annualIncome = casual.integer(13500, 14500);
    });

    it('returns correct value', () => {
        annualIncome = 14500;
        const result = calculateRemainingIncomeBeforeNextStep(incomeLimits, annualIncome);
        expect(result).toBe(14619 - 14500);
    })
});

describe('hourlyWageToMonthlySalary()', () => {
    let hourlySalary: HourlySalary;

    beforeEach(() => {
        hourlySalary = {
            type: 'hourly',
            monthlyHours: casual.integer(0, 80),
            amount: casual.integer(9, 20),
        };
    });

    it('calculates it correctly', () => {
        const result = hourlyWageToMonthlySalary(hourlySalary);
        expect(result.amount).toBe(hourlySalary.monthlyHours * hourlySalary.amount);
    })
});

describe('getIncomeProjectionDataset()', () => {
    let singleSalaryForm: CalculatorForm;
    let doubleSalaryForm: CalculatorForm;
    let hourlySalary: HourlySalary;
    let monthlySalary: StandardSalary;

    beforeEach(() => {
        hourlySalary = {
            type: 'hourly',
            monthlyHours: casual.integer(0, 80),
            amount: casual.integer(9, 20),
        };
        monthlySalary = {
            type: 'monthly',
            amount: casual.integer(2100, 4700),
        };
        singleSalaryForm = {
            grossIncome: casual.integer(4000, 15000),
            salaries: [ monthlySalary ],
            usedMonths: casual.integer(0, 9),
            housingCosts: casual.integer(150, 1500),
            houseHoldSize: casual.integer(1, 4),
        };
        doubleSalaryForm = {
            grossIncome: casual.integer(4000, 15000),
            salaries: [ hourlySalary, monthlySalary ],
            usedMonths: casual.integer(0, 9),
            housingCosts: casual.integer(150, 1500),
            houseHoldSize: casual.integer(1, 4),
        }      
    });

    it('calculates it correctly with single salary', () => {
        const result = getIncomeProjectionDataset(singleSalaryForm);
        expect(result.datasets).toHaveLength(12 - moment().month());
        expect(result.labels).toHaveLength(12 - moment().month());
        expect(result.datasets![0].data![0]).toBe(monthlySalary.amount);
    })

    it('calculates it correctly with two salaries', () => {
        const result = getIncomeProjectionDataset(doubleSalaryForm);
        expect(result.datasets).toHaveLength(12 - moment().month());
        expect(result.labels).toHaveLength(12 - moment().month());
        expect(result.datasets![0].data![0]).toBe(monthlySalary.amount + (hourlySalary.amount * hourlySalary.monthlyHours));
        expect(result.datasets![0].data![1]).toBe(monthlySalary.amount + (hourlySalary.amount * hourlySalary.monthlyHours));
    });
});

describe('getStudentBenefitDataset()', () => {
    let annualIncome: number;
    let monthlyIncome: number;
    let usedBenefitMonths: number;
    const currentMonth = moment().month();

    beforeEach(() => {
        annualIncome = casual.integer(7000, 25000);
        monthlyIncome = casual.integer(500, 2700);
        usedBenefitMonths = casual.integer(0, 9);
    });

    it('returns zeroes, when all remaining benefit months are used', () => {
        const dataset = getStudentBenefitDataset(
            incomeLimits,
            studentBenefits,
            annualIncome,
            monthlyIncome,
            12,
            'NA');
        expect(dataset).toHaveLength(12 - currentMonth);
        expect(dataset[0]).toBe(0);
        expect(dataset[dataset.length - 1]).toBe(0);
    });
    it('returns correct values for guardians', () => {
        const dataset = getStudentBenefitDataset(
            incomeLimits,
            studentBenefits,
            incomeLimits[0].annualIncomeLimit - 500,
            500,
            0,
            'NA',
            true);
        expect(dataset).toHaveLength(12 - currentMonth);
        const guardianAmount = studentBenefits.find(b => b.isGuardian)!.amount;
        expect(dataset[0]).toBe(guardianAmount);
        expect(dataset[dataset.length - 1]).toBe(guardianAmount);
    });
    it('returns correct values for married people who are not guardians', () => {
        const dataset = getStudentBenefitDataset(
            incomeLimits,
            studentBenefits,
            incomeLimits[0].annualIncomeLimit - 500,
            500,
            0,
            'NA',
            false,
            true);
        expect(dataset).toHaveLength(12 - currentMonth);
        const marriedAmount = studentBenefits.find(b => b.isMarried)!.amount;
        expect(dataset[0]).toBe(marriedAmount);
        expect(dataset[dataset.length - 1]).toBe(marriedAmount);
    });
    it('returns correct values for adults living alone', () => {
        const dataset = getStudentBenefitDataset(
            incomeLimits,
            studentBenefits,
            incomeLimits[0].annualIncomeLimit - 500,
            500,
            0,
            '18+');
        expect(dataset).toHaveLength(12 - currentMonth);
        const regularAmount = studentBenefits.find(b => b.age === '18+')!.amount;
        expect(dataset[0]).toBe(regularAmount);
        expect(dataset[dataset.length - 1]).toBe(regularAmount);
    });
    it('returns correct values for underage people living alone', () => {
        const dataset = getStudentBenefitDataset(
            incomeLimits,
            studentBenefits,
            incomeLimits[0].annualIncomeLimit - 500,
            500,
            0,
            'u18');
        expect(dataset).toHaveLength(12 - currentMonth);
        const childAmount = studentBenefits.find(b => b.age === 'u18')!.amount;
        expect(dataset[0]).toBe(childAmount);
        expect(dataset[dataset.length - 1]).toBe(childAmount);
    });
    it('returns correct values for over 20-year-olds living with parents', () => {
        const dataset = getStudentBenefitDataset(
            incomeLimits,
            studentBenefits,
            incomeLimits[0].annualIncomeLimit - 500,
            500,
            0,
            '20+');
        expect(dataset).toHaveLength(12 - currentMonth);
        const adultWithParentsAmount = studentBenefits.find(b => b.age === '20+')!.amount;
        expect(dataset[0]).toBe(adultWithParentsAmount);
        expect(dataset[dataset.length - 1]).toBe(adultWithParentsAmount);
    });
    it('returns correct values for under 20-year-olds living with parents', () => {
        const dataset = getStudentBenefitDataset(
            incomeLimits,
            studentBenefits,
            incomeLimits[0].annualIncomeLimit - 500,
            500,
            0,
            'u20');
        expect(dataset).toHaveLength(12 - currentMonth);
        const youngWithParentsAmount = studentBenefits.find(b => b.age === 'u20')!.amount;
        expect(dataset[0]).toBe(youngWithParentsAmount);
        expect(dataset[dataset.length - 1]).toBe(youngWithParentsAmount);
    });
    it('returns some benefit months and rest zero months, when only some benefit months are remaining', () => {
        annualIncome = casual.integer(13500, 14500);
        monthlyIncome = 0;
        usedBenefitMonths = 6
        const dataset = getStudentBenefitDataset(
            incomeLimits,
            studentBenefits,
            annualIncome,
            monthlyIncome,
            usedBenefitMonths,
            '18+');
        expect(dataset).toHaveLength(12 - currentMonth);
        expect(dataset[0]).toBeGreaterThan(0);
        expect(dataset[dataset.length - 1]).toBe(0);
    });
    it('returns some benefit months and rest zero months, when only some benefit months are remaining', () => {
        annualIncome = casual.integer(13500, 14500);
        monthlyIncome = casual.integer(300, 500);
        usedBenefitMonths = 6
        const dataset = getStudentBenefitDataset(
            incomeLimits,
            studentBenefits,
            annualIncome,
            monthlyIncome,
            usedBenefitMonths,
            '18+');
        console.log(dataset)
        expect(dataset).toHaveLength(12 - currentMonth);
        expect(dataset[0]).toBeGreaterThan(0);
        expect(dataset[dataset.length - 1]).toBe(0);
    });
});
