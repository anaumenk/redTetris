import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { mathSum } from './index';

test('return all score points for all filled field lines', () => {
    const filledLine = 2;
    const points = 100;
    expect(mathSum(filledLine, points)).toEqual(300  );
});