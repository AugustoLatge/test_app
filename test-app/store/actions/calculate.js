export const CALCULATE = 'CALCULATE';

export const calculate = results => {
  return { type: CALCULATE, results };
};