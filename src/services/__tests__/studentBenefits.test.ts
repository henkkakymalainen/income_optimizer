import { incomeLimits } from '../data/studentBenefits';
import { calculateRemainingIncomeBeforeNextStep } from '../optimizer';
import casual from 'casual';

describe('calculateRemainingIncomeBeforeNextStep()', () => {
    let annualIncome: number;

    beforeEach(() => {
        // This is how you can generate random values between certain ranges
        annualIncome = casual.integer(13500, 14500);
    });

    it('returns correct value', () => {
        annualIncome = 14500;
        const result = calculateRemainingIncomeBeforeNextStep(annualIncome);
        expect(result).toBe(14619 - 14500);
    })
});
