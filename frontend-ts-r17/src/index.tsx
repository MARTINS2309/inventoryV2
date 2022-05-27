/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/features/array/flat-map';
import 'core-js/features/map';
import 'core-js/features/promise';
import 'core-js/features/set';
import 'raf/polyfill';
import 'whatwg-fetch';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>{[<App key="App" />]}</ErrorBoundary>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app-root'),
);
