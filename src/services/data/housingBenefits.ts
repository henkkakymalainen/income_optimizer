import { CityGroup } from '../types';

export interface HousingBenefitIncomeLimit {
    adults: number,
    kids: number,
    totalIncome: number,
    cityGroup: CityGroup,
}

export const cityGroups = {
    'I': ['Helsinki'],
    'II': ['Espoo', 'Kauniainen', 'Vantaa'],
    'III': ['Hyvinkää', 'Hämeenlinna', 'Joensuu', 'Jyväskylä', 'Järvenpää', 'Kajaani', 'Kerava', 'Kirkkonummi', 'Kouvola', 'Kuopio', 'Lahti', 'Lappeenranta', 'Lohja', 'Mikkeli', 'Nokia', 'Nurmijärvi', 'Oulu', 'Pori', 'Porvoo', 'Raisio', 'Riihimäki', 'Rovaniemi', 'Seinäjoki', 'Sipoo', 'Siuntio', 'Tampere', 'Turku', 'Tuusula', 'Vaasa', 'Vihti'],
}

const singleParentGroup_1: HousingBenefitIncomeLimit[] = [
    {
        adults: 1,
        kids: 0,
        totalIncome: 1879,
        cityGroup: 'I',
    },
    {
        adults: 1,
        kids: 1,
        totalIncome: 2648,
        cityGroup: 'I',
    },
    {
        adults: 1,
        kids: 2,
        totalIncome: 3357,
        cityGroup: 'I',
    },
    {
        adults: 1,
        kids: 3,
        totalIncome: 3959,
        cityGroup: 'I',
    },
    {
        adults: 1,
        kids: 4,
        totalIncome: 4511,
        cityGroup: 'I',
    },
    {
        adults: 1,
        kids: 5,
        totalIncome: 5063,
        cityGroup: 'I',
    },
    {
        adults: 1,
        kids: 6,
        totalIncome: 5615,
        cityGroup: 'I',
    },
    {
        adults: 1,
        kids: 7,
        totalIncome: 6167,
        cityGroup: 'I',
    },
];

const singleParentGroup_2: HousingBenefitIncomeLimit[] = [
    {
        adults: 1,
        kids: 0,
        totalIncome: 1839,
        cityGroup: 'II',
    },
    {
        adults: 1,
        kids: 1,
        totalIncome: 2579,
        cityGroup: 'II',
    },
    {
        adults: 1,
        kids: 2,
        totalIncome: 3243,
        cityGroup: 'II',
    },
    {
        adults: 1,
        kids: 3,
        totalIncome: 3823,
        cityGroup: 'II',
    },
    {
        adults: 1,
        kids: 4,
        totalIncome: 4359,
        cityGroup: 'II',
    },
    {
        adults: 1,
        kids: 5,
        totalIncome: 4894,
        cityGroup: 'II',
    },
    {
        adults: 1,
        kids: 6,
        totalIncome: 5429,
        cityGroup: 'II',
    },
    {
        adults: 1,
        kids: 7,
        totalIncome: 5965,
        cityGroup: 'II',
    },
];

const singleParentGroup_3: HousingBenefitIncomeLimit[] = [
    {
        adults: 1,
        kids: 0,
        totalIncome: 1594,
        cityGroup: 'III',
    },
    {
        adults: 1,
        kids: 1,
        totalIncome: 2250,
        cityGroup: 'III',
    },
    {
        adults: 1,
        kids: 2,
        totalIncome: 2840,
        cityGroup: 'III',
    },
    {
        adults: 1,
        kids: 3,
        totalIncome: 3383,
        cityGroup: 'III',
    },
    {
        adults: 1,
        kids: 4,
        totalIncome: 3887,
        cityGroup: 'III',
    },
    {
        adults: 1,
        kids: 5,
        totalIncome: 4392,
        cityGroup: 'III',
    },
    {
        adults: 1,
        kids: 6,
        totalIncome: 4896,
        cityGroup: 'III',
    },
    {
        adults: 1,
        kids: 7,
        totalIncome: 5400,
        cityGroup: 'III',
    },
];

const singleParentGroup_4: HousingBenefitIncomeLimit[] = [
    {
        adults: 1,
        kids: 0,
        totalIncome: 1482,
        cityGroup: 'IV',
    },
    {
        adults: 1,
        kids: 1,
        totalIncome: 2084,
        cityGroup: 'IV',
    },
    {
        adults: 1,
        kids: 2,
        totalIncome: 2643,
        cityGroup: 'IV',
    },
    {
        adults: 1,
        kids: 3,
        totalIncome: 3159,
        cityGroup: 'IV',
    },
    {
        adults: 1,
        kids: 4,
        totalIncome: 3652,
        cityGroup: 'IV',
    },
    {
        adults: 1,
        kids: 5,
        totalIncome: 4144,
        cityGroup: 'IV',
    },
    {
        adults: 1,
        kids: 6,
        totalIncome: 4636,
        cityGroup: 'IV',
    },
    {
        adults: 1,
        kids: 7,
        totalIncome: 5129,
        cityGroup: 'IV',
    },
];

const twoAdultsGroup_1: HousingBenefitIncomeLimit[] = [
    {
        adults: 2,
        kids: 0,
        totalIncome: 2526,
        cityGroup: 'I',
    },
    {
        adults: 2,
        kids: 1,
        totalIncome: 3235,
        cityGroup: 'I',
    },
    {
        adults: 2,
        kids: 2,
        totalIncome: 3837,
        cityGroup: 'I',
    },
    {
        adults: 2,
        kids: 3,
        totalIncome: 4389,
        cityGroup: 'I',
    },
    {
        adults: 2,
        kids: 4,
        totalIncome: 4941,
        cityGroup: 'I',
    },
    {
        adults: 2,
        kids: 5,
        totalIncome: 5493,
        cityGroup: 'I',
    },
    {
        adults: 2,
        kids: 6,
        totalIncome: 6045,
        cityGroup: 'I',
    },
];

const twoAdultsGroup_2: HousingBenefitIncomeLimit[] = [
    {
        adults: 2,
        kids: 0,
        totalIncome: 2457,
        cityGroup: 'II',
    },
    {
        adults: 2,
        kids: 1,
        totalIncome: 3121,
        cityGroup: 'II',
    },
    {
        adults: 2,
        kids: 2,
        totalIncome: 3701,
        cityGroup: 'II',
    },
    {
        adults: 2,
        kids: 3,
        totalIncome: 4237,
        cityGroup: 'II',
    },
    {
        adults: 2,
        kids: 4,
        totalIncome: 4772,
        cityGroup: 'II',
    },
    {
        adults: 2,
        kids: 5,
        totalIncome: 5307,
        cityGroup: 'II',
    },
    {
        adults: 2,
        kids: 6,
        totalIncome: 5843,
        cityGroup: 'II',
    },
];

const twoAdultsGroup_3: HousingBenefitIncomeLimit[] = [
    {
        adults: 2,
        kids: 0,
        totalIncome: 2128,
        cityGroup: 'III',
    },
    {
        adults: 2,
        kids: 1,
        totalIncome: 2718,
        cityGroup: 'III',
    },
    {
        adults: 2,
        kids: 2,
        totalIncome: 3261,
        cityGroup: 'III',
    },
    {
        adults: 2,
        kids: 3,
        totalIncome: 3765,
        cityGroup: 'III',
    },
    {
        adults: 2,
        kids: 4,
        totalIncome: 4270,
        cityGroup: 'III',
    },
    {
        adults: 2,
        kids: 5,
        totalIncome: 4774,
        cityGroup: 'III',
    },
    {
        adults: 2,
        kids: 6,
        totalIncome: 5278,
        cityGroup: 'III',
    },
];

const twoAdultsGroup_4: HousingBenefitIncomeLimit[] = [
    {
        adults: 2,
        kids: 0,
        totalIncome: 1962,
        cityGroup: 'IV',
    },
    {
        adults: 2,
        kids: 1,
        totalIncome: 2521,
        cityGroup: 'IV',
    },
    {
        adults: 2,
        kids: 2,
        totalIncome: 3037,
        cityGroup: 'IV',
    },
    {
        adults: 2,
        kids: 3,
        totalIncome: 3530,
        cityGroup: 'IV',
    },
    {
        adults: 2,
        kids: 4,
        totalIncome: 4022,
        cityGroup: 'IV',
    },
    {
        adults: 2,
        kids: 5,
        totalIncome: 4514,
        cityGroup: 'IV',
    },
    {
        adults: 2,
        kids: 6,
        totalIncome: 5007,
        cityGroup: 'IV',
    },
];

const threeAdultsGroup_1: HousingBenefitIncomeLimit[] = [
    {
        adults: 3,
        kids: 0,
        totalIncome: 3113,
        cityGroup: 'I',
    },
    {
        adults: 3,
        kids: 1,
        totalIncome: 3715,
        cityGroup: 'I',
    },
    {
        adults: 3,
        kids: 2,
        totalIncome: 4267,
        cityGroup: 'I',
    },
    {
        adults: 3,
        kids: 3,
        totalIncome: 4819,
        cityGroup: 'I',
    },
    {
        adults: 3,
        kids: 4,
        totalIncome: 5371,
        cityGroup: 'I',
    },
    {
        adults: 3,
        kids: 5,
        totalIncome: 5923,
        cityGroup: 'I',
    },
];

const threeAdultsGroup_2: HousingBenefitIncomeLimit[] = [
    {
        adults: 3,
        kids: 0,
        totalIncome: 2999,
        cityGroup: 'II',
    },
    {
        adults: 3,
        kids: 1,
        totalIncome: 3579,
        cityGroup: 'II',
    },
    {
        adults: 3,
        kids: 2,
        totalIncome: 4115,
        cityGroup: 'II',
    },
    {
        adults: 3,
        kids: 3,
        totalIncome: 4650,
        cityGroup: 'II',
    },
    {
        adults: 3,
        kids: 4,
        totalIncome: 5185,
        cityGroup: 'II',
    },
    {
        adults: 3,
        kids: 5,
        totalIncome: 5721,
        cityGroup: 'II',
    },
];

const threeAdultsGroup_3: HousingBenefitIncomeLimit[] = [
    {
        adults: 3,
        kids: 0,
        totalIncome: 2596,
        cityGroup: 'III',
    },
    {
        adults: 3,
        kids: 1,
        totalIncome: 3139,
        cityGroup: 'III',
    },
    {
        adults: 3,
        kids: 2,
        totalIncome: 3643,
        cityGroup: 'III',
    },
    {
        adults: 3,
        kids: 3,
        totalIncome: 4148,
        cityGroup: 'III',
    },
    {
        adults: 3,
        kids: 4,
        totalIncome: 4652,
        cityGroup: 'III',
    },
    {
        adults: 3,
        kids: 5,
        totalIncome: 5156,
        cityGroup: 'III',
    },
];

const threeAdultsGroup_4: HousingBenefitIncomeLimit[] = [
    {
        adults: 3,
        kids: 0,
        totalIncome: 2399,
        cityGroup: 'IV',
    },
    {
        adults: 3,
        kids: 1,
        totalIncome: 2915,
        cityGroup: 'IV',
    },
    {
        adults: 3,
        kids: 2,
        totalIncome: 3048,
        cityGroup: 'IV',
    },
    {
        adults: 3,
        kids: 3,
        totalIncome: 3900,
        cityGroup: 'IV',
    },
    {
        adults: 3,
        kids: 4,
        totalIncome: 4392,
        cityGroup: 'IV',
    },
    {
        adults: 3,
        kids: 5,
        totalIncome: 4885,
        cityGroup: 'IV',
    },
];


export const housingBenefitIncomeLimit: HousingBenefitIncomeLimit[] = [
    ...singleParentGroup_1,
    ...singleParentGroup_2,
    ...singleParentGroup_3,
    ...singleParentGroup_4,
    ...twoAdultsGroup_1,
    ...twoAdultsGroup_2,
    ...twoAdultsGroup_3,
    ...twoAdultsGroup_4,
    ...threeAdultsGroup_1,
    ...threeAdultsGroup_2,
    ...threeAdultsGroup_3,
    ...threeAdultsGroup_4
];

interface HousingBenefitMax {
    houseHoldSize: number,
    cityGroup: CityGroup,
    maxBenefit: number,
}

interface ExtraBenefitPerPerson {
    extraBenefit: number,
    cityGroup: CityGroup,
}

export const maximumHousingBenefits: HousingBenefitMax[] = [
    {
        houseHoldSize: 1,
        cityGroup: 'I',
        maxBenefit: 516,
    },
    {
        houseHoldSize: 2,
        cityGroup: 'I',
        maxBenefit: 746,
    },
    {
        houseHoldSize: 3,
        cityGroup: 'I',
        maxBenefit: 951,
    },
    {
        houseHoldSize: 4,
        cityGroup: 'I',
        maxBenefit: 1111,
    },
    {
        houseHoldSize: 1,
        cityGroup: 'II',
        maxBenefit: 499,
    },
    {
        houseHoldSize: 2,
        cityGroup: 'II',
        maxBenefit: 717,
    },
    {
        houseHoldSize: 3,
        cityGroup: 'II',
        maxBenefit: 903,
    },
    {
        houseHoldSize: 4,
        cityGroup: 'II',
        maxBenefit: 1054,
    },
    {
        houseHoldSize: 1,
        cityGroup: 'III',
        maxBenefit: 396,
    },
    {
        houseHoldSize: 2,
        cityGroup: 'III',
        maxBenefit: 579,
    },
    {
        houseHoldSize: 3,
        cityGroup: 'III',
        maxBenefit: 734,
    },
    {
        houseHoldSize: 4,
        cityGroup: 'III',
        maxBenefit: 869,
    },
    {
        houseHoldSize: 1,
        cityGroup: 'IV',
        maxBenefit: 349,
    },
    {
        houseHoldSize: 2,
        cityGroup: 'IV',
        maxBenefit: 509,
    },
    {
        houseHoldSize: 3,
        cityGroup: 'IV',
        maxBenefit: 651,
    },
    {
        houseHoldSize: 4,
        cityGroup: 'IV',
        maxBenefit: 775,
    },
];

export const extraBenefit: ExtraBenefitPerPerson[] = [
    {
        cityGroup: 'I',
        extraBenefit: 139,
    },
    {
        cityGroup: 'II',
        extraBenefit: 132,
    },
    {
        cityGroup: 'III',
        extraBenefit: 119,
    },
    {
        cityGroup: 'IV',
        extraBenefit: 114,
    },
];

export const incomeReduction = 300;
