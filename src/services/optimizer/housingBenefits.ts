import { CityGroup } from '../types';
import {
    maximumHousingBenefits,
    extraBenefit,
    cityGroups,
    housingBenefitIncomeLimit,
    incomeReduction,
} from '../data/housingBenefits';

export const getCityGroup = (city: string): CityGroup => {
    if (city === 'Helsinki') return 'I'
    else if (cityGroups['II'].includes(city)) return 'II'
    else if (cityGroups['III'].includes(city)) return 'III'
    else return 'IV';
}

export const getExtraBenefitAmount = (
    people: number,
    city: CityGroup,
) => {
    return extraBenefit
        .find(b => b.cityGroup === city)!
        .extraBenefit * people;
}

export const getMaxBenefitAmount = (
    houseHoldSize: number,
    cityGroup: CityGroup
) => {
    const extraPeople = houseHoldSize - 4;
    const extraBenefit = extraPeople > 0
        ? getExtraBenefitAmount(extraPeople, cityGroup)
        : 0;
    return maximumHousingBenefits
        .find(m => m.houseHoldSize ===
            Math.min(houseHoldSize, 4) &&
            m.cityGroup === cityGroup)!
        .maxBenefit + extraBenefit;
}

export const isEligibleForHousingBenefits = (
    adults: number,
    kids: number,
    income: number,
    city: CityGroup,
) => {
    const maxKids = adults === 1
        ? 7
        : adults === 2
            ? 6
            : 5;
    const incomeLimit = housingBenefitIncomeLimit.find(limit => 
        limit.adults === Math.min(adults, 3) &&
        limit.kids === Math.min(kids, maxKids) &&
        limit.cityGroup === city)!
            .totalIncome;
    return income > incomeLimit;
}

const getDeductible = (
    totalIncome: number,
    adults: number,
    kids: number,
) => Math.max(0.42 * (totalIncome - (597 + 99 * adults + 221 * kids)), 0);

const getBenefitAmount = (
    housingCosts: number,
    deductible: number,
    maxBenefit: number,
) => {
    const actualCost = housingCosts > maxBenefit
        ? maxBenefit
        : housingCosts - deductible
    const benefit = 0.8 * actualCost;
    return benefit < 15
        ? 0
        : Math.round(benefit);
};

export const calculateHousingBenefit = (
    totalIncome: number,
    housingCosts: number,
    municipality: string,
    adults: number,
    kids: number,
    salariedPeople: number,
) => {
    const incomeForCalculation = totalIncome - incomeReduction * salariedPeople;
    const city = getCityGroup(municipality);
    const hasTooHighIncome = isEligibleForHousingBenefits(
        adults,
        kids,
        incomeForCalculation,
        city);
    hasTooHighIncome && console.log(`${incomeForCalculation} is too high for housing benefits`);
    if (hasTooHighIncome) return 0;
    const maxBenefit = getMaxBenefitAmount(adults + kids, city);
    console.log(`Max benefit for ${adults} adults and ${kids} kids in ${city} is ${maxBenefit}`);
    const deductible = getDeductible(incomeForCalculation, adults, kids);
    console.log(`Deductible is ${deductible}`);
    return getBenefitAmount(housingCosts, deductible, maxBenefit);
}
