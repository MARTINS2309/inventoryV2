/**
* @jest-environment jsdom
*/
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Navibar} from '../src/components/Navibar';

//Tests for Navibar component
describe ('Navibar', () => {
    it('renders correctly', () => {
        const {queryByTestId} = render(<Navibar />);
        expect(queryByTestId('navibar')).toBeTruthy();
    });
    it('renders home link', () => {
        const {queryByText} = render(<Navibar />);
        expect(queryByText('Home')).toBeTruthy();
    })
    it('renders stock link', () => {
        const {queryByText} = render(<Navibar />);
        expect(queryByText('Stock')).toBeTruthy();
    })
    it('renders github link', () => {
        const {queryByText} = render(<Navibar />);
        fireEvent.click(queryByText('Links'))
        expect(queryByText('Github')).toBeTruthy();
    })
});