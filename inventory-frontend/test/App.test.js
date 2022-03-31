/**
* @jest-environment jsdom
*/
import React from "react";
import { render, screen } from "@testing-library/react";
import {App} from "../src/App";

//Tests for App component
describe ("App", () => {
    it('renders correctly', () => {
        const {queryByTestId} = render(<App />);
        expect(queryByTestId('app')).toBeTruthy();
    });
});    