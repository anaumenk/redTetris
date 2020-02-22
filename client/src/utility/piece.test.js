import '@testing-library/jest-dom/extend-expect';
import { getNextPieceFigure, getPieceTurn } from './index';
import React from 'react';

test('return next turn of the figure with 0 position', () => {
    const position = 0;
    const figure = getNextPieceFigure();
    expect(getPieceTurn(false, position, figure)).toEqual(1  );
});

test('return next turn of the figure with last position', () => {
    const position = 3;
    const figure = getNextPieceFigure();
    expect(getPieceTurn(false, position, figure)).toEqual(0  );
});