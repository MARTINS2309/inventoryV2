import React from 'react';
import { findByText, render, waitFor } from '@testing-library/react';
import App from '../../src/App';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

//tests for app react component and routing
test('home component displays', async () => {
    render(<BrowserRouter><App /></BrowserRouter>);

    const home = await waitFor(() => findByText(document.body, 'Home'));
    expect(home).toBeInTheDocument();
 })
