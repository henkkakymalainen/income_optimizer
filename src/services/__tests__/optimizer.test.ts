import casual from 'casual';
import {
    hourlyWageToMonthlySalary,
    generateSalaryDatapoints
} from '../optimizer';
import { CalculatorForm, HourlySalary, MonthlySalary } from '../types';
import moment from 'moment';

describe('hourlyWageToMonthlySalary()', () => {
    let hourlySalary: HourlySalary;

    beforeEach(() => {
        hourlySalary = {
            salaryType: 'hourly',
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
    let monthlySalary: MonthlySalary;

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

    it.only('calculates it correctly with single salary', () => {
        const result = generateSalaryDatapoints(singleSalaryForm);
        expect(result).toHaveLength(12 - moment().add(-1, 'months').month());
        expect(result[0]).toBe(singleSalaryForm.grossIncome);
        expect(result[1]).toBe(singleSalaryForm.grossIncome + monthlySalary.amount);
    })

    it('calculates it correctly with single salary', () => {
        const result = generateSalaryDatapoints(doubleSalaryForm);
        expect(result).toHaveLength(12 - moment().add(-1, 'months').month());
        expect(result[0]).toBe(doubleSalaryForm.grossIncome);
        expect(result[1]).toBe(doubleSalaryForm.grossIncome + monthlySalary.amount + (hourlySalary.amount * hourlySalary.monthlyHours));
    });
        
});

