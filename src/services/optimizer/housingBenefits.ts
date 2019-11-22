const getDeductible = (
    totalIncome: number,
    adults: number,
    kids: number,
) => 0.42 * (totalIncome - (597 + 99*adults + 221*kids));

const getBenefitAmount = (
    housingCosts: number,
    deductible: number,
) => {
    const benefit = 0.8 * (housingCosts - deductible);
    return benefit < 15
        ? 0
        : benefit;
};

export const calculateHousingBenefit = (
    totalIncome: number,
    housingCosts: number,
    municipality: string,
    adults: number,
    kids: number,
) => {
    return 0;
}
