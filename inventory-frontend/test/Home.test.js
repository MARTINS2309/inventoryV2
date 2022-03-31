/**
* @jest-environment jsdom
*/
import React from 'react';
import { render } from '@testing-library/react';
import { Home } from '../src/components/Home';

//tests for Home component
describe('Home', () => {
    it('renders correctly', () => {
        const { queryByTestId } = render(<Home />);
        expect(queryByTestId('greeting')).toBeTruthy();
    });
    it('renders the greeting', () => {
        const { queryByText } = render(<Home />);
        expect(queryByText('Welcome to the Inventory Management System')).toBeTruthy();
    });
});