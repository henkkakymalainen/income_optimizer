import { calculateHousingBenefit } from '../optimizer';


describe('calculateHousingBenefit()', () => {
    it('returns correct value for single person household in Tampere', () => {
        const income = 900;
        const rent = 720;
        //const deductible = Math.max(0.42 * (income - (597 + 99)), 0);
        const expectedResult = (0.8 * 396);
        const result = calculateHousingBenefit(
            income,
            rent,
            'Tampere',
            1,
            0,
            1);
        expect(result).toBe(Math.round(expectedResult));
    });

    it('returns correct value for 2 adult 1 child family in group 4 city', () => {
        const adults = 2;
        const kids = 1;
        const income = 1300;
        const rent = 640;
        const deductible = Math.max(0.42 * ((income - 2*300) - (597 + 99 * adults + 221 * kids)), 0);
        const expectedResult = (0.8 * (rent - deductible));
        const result = calculateHousingBenefit(
            income,
            rent,
            'Salla',
            adults,
            kids,
            adults);
        expect(result).toBe(expectedResult);
    });

    it('returns correct value for a couple in Helsinki', () => {
        const adults = 2;
        const kids = 0;
        const income = 1200;
        const rent = 670;
        const deductible = Math.max(0.42 * ((income - 300) - (597 + 99 * adults + 221 * kids)), 0);
        const maxBenefit = 746;
        const costsUsedInCalculation = Math.min(maxBenefit, rent) === maxBenefit
            ? maxBenefit
            : rent - deductible;
        const expectedResult = (0.8 * costsUsedInCalculation);
        const result = calculateHousingBenefit(
            income,
            rent,
            'Helsinki',
            adults,
            kids,
            1);
        expect(result).toBe(Math.round(expectedResult));
    });

    it('returns zero if income is more than maximum', () => {
        const adults = 1;
        const kids = 0;
        const income = 2900;
        const rent = 670;
        const result = calculateHousingBenefit(
            income,
            rent,
            'Helsinki',
            adults,
            kids,
            adults);
        expect(result).toBe(0);
    });

    it('single person in Turku', () => {
        const adults = 1;
        const kids = 0;
        const income = 696;
        const rent = 615;
        const expectedResult = 317;
        const result = calculateHousingBenefit(
            income,
            rent,
            'Turku',
            adults,
            kids,
            2);
        expect(result).toBe(expectedResult);
    });

    it('3 people in Tampere', () => {
        const adults = 2;
        const kids = 1;
        const income = 3003;
        const rent = 720;
        const expectedResult = 110;
        const result = calculateHousingBenefit(
            income,
            rent,
            'Tampere',
            adults,
            kids,
            2);
        expect(result).toBe(expectedResult);
    });
});
