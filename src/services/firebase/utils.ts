import { db } from './index';
import { CalculatorForm } from '../types';

export const storeCalculation = async (form: CalculatorForm) => {
    const ref = db.collection('queries').doc();
    console.log(ref.id);
    await ref.set({
        ...form,
        id: ref.id,
    });
};
