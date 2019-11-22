export interface StandardSalary {
    type: 'monthly' | 'hourly',
    amount: number,
}

export interface HourlySalary extends StandardSalary {
    monthlyHours: number,
}

export type Salary = StandardSalary | HourlySalary;

export interface CalculatorForm {
    grossIncome: number,
    salaries: Salary[],
    usedMonths: number,
    housingCosts: number,
    houseHoldSize: number,
    age: Age,
    isMarried: boolean,
    kids: number,
}

/**
 *   - u18: under 17 yo.
 *   - u20: 17-19 yo.
 *   - 20+: Over 20 yo.
 *   - 18+: Over 18 yo.
 *   - NA: doesn't affect benefit amount
 */
export type Age = 'u18' | 'u20' | '20+' | '18+' | 'NA';

export type CityGroup = 'I' | 'II' | 'III' | 'IV';
