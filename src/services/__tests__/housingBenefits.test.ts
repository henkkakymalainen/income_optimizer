import { calculateHousingBenefit } from '../optimizer';


describe('calculateHousingBenefit()', () => {
    it('returns correct value for single person household in Helsinki', () => {
        const result = calculateHousingBenefit(
            1200,
            700,
            'Helsinki',
            1,
            0);
    });
    it('returns correct value for single person household in Espoo', () => {});
    it('returns correct value for single person household in Hyvinkää', () => {});

    it('returns correct value for 1 adult 1 child family in group 4 city', () => {});
    it('', () => {});
});
