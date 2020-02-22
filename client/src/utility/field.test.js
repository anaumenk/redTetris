import '@testing-library/jest-dom/extend-expect';
import { NO_COLOR } from "../constants";
import React from 'react';
import { createField } from './index';

test('create empty field', () => {
    expect(createField(1, 1, [])).toEqual([ [ { color: NO_COLOR } ] ]);
});

test('create field with some pieces', () => {
    const fill = [
        {
            id: 0,
            color: "black",
            place: [ [ 0, 0 ] ]
        }
    ];
    expect(createField(1, 1, fill)).toEqual([ [ { color: "black" } ] ]);
});