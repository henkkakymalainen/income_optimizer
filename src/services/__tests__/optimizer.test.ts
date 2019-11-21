import casual from 'casual';
import {
    hourlyWageToMonthlySalary,
    generateSalaryDatapoints
} from '../optimizer';
import { CalculatorForm, HourlySalary, StandardSalary } from '../types';
import moment from 'moment';

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

describe('generateSalaryDatapoints()', () => {
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
        const result = generateSalaryDatapoints(singleSalaryForm);
        expect(result.datasets).toHaveLength(12 - moment().add(-1, 'months').month());
        expect(result.labels).toHaveLength(12 - moment().add(-1, 'months').month());
    })

    it('calculates it correctly with single salary', () => {
        const result = generateSalaryDatapoints(doubleSalaryForm);
        expect(result.datasets).toHaveLength(12 - moment().add(-1, 'months').month());
        expect(result.labels).toHaveLength(12 - moment().add(-1, 'months').month());
        expect(result.datasets![0].data![0]).toBe(doubleSalaryForm.grossIncome);
        expect(result.datasets![1].data![0]).toBe(doubleSalaryForm.grossIncome + monthlySalary.amount + (hourlySalary.amount * hourlySalary.monthlyHours));
    });
});

