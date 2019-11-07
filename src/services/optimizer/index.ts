import { incomeLimits } from '../data/studentBenefits';

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
