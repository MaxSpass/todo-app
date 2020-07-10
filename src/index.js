import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-css-only';
import './index.css';
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux';
import reducers from './store/reducers/index.reducer';
import App from './App';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
