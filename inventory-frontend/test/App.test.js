/**
* @jest-environment jsdom
*/
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "../src/App";

//Tests for App component
describe ("App", () => {
    it('renders correctly', () => {
        const { queryByTestId } = render(<App />, {wrapper: MemoryRouter});
        expect(queryByTestId('app')).toBeTruthy();
    });
    it('renders Navibar', () => {
        const { queryByTestId } = render(<App />, {wrapper: MemoryRouter});
        expect(queryByTestId('navibar')).toBeTruthy();
    });
    it('renders Home by default', () => {
        const { queryByTestId } = render(<App />, {wrapper: MemoryRouter});
        expect(queryByTestId('greeting')).toBeTruthy();
    });
});    