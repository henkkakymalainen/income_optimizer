import { Age } from '../types';

export interface IncomeLimit {
    months: number,
    annualIncomeLimit: number,
};

export const incomeLimits: IncomeLimit[] = [
    {
        months: 1,
        annualIncomeLimit: 22557,
    },
    {
        months: 2,
        annualIncomeLimit: 21234,
    },
    {
        months: 3,
        annualIncomeLimit: 19911,
    },
    {
        months: 4,
        annualIncomeLimit: 18588,
    },
    {
        months: 5,
        annualIncomeLimit: 17265,
    },
    {
        months: 6,
        annualIncomeLimit: 15942,
    },
    {
        months: 7,
        annualIncomeLimit: 14619,
    },
    {
        months: 8,
        annualIncomeLimit: 13296,
    },
    {
        months: 9,
        annualIncomeLimit: 11973,
    },
    {
        months: 10,
        annualIncomeLimit: 10650,
    },
    {
        months: 11,
        annualIncomeLimit: 9327,
    },
    {
        months: 12,
        annualIncomeLimit: 8004,
    }
];

/**
 *  NOTE: Doesn't take into account "oppimateriaalilisä",
 *  that'd require parents' incomes as well, 
 *  too complex for now
 */
export interface StudentBenefit {
    age: Age,
    amount: number,
    isGuardian?: boolean,
    isMarried?: boolean,
}

export const studentBenefits: StudentBenefit[] = [
    {
        age: 'NA',
        isGuardian: true,
        amount: 325.28,
    },
    {
        age: 'NA',
        isMarried: true,
        amount: 250.28,
    },
    {
        age: '18+',
        amount: 250.28,
    },
    {
        age: 'u18',
        amount: 101.74,
    },
    {
        age: '20+',
        amount: 81.39,
    },
    {
        age: 'u20',
        amount: 38.66,
    },
];
