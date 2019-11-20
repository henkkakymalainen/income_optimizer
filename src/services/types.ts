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
}
