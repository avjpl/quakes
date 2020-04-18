import React from 'react';
import { render } from 'react-dom';

import App from './App';

import '../web/css/index.css';

render(<App />, document.getElementById('main'));

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;

    render(<App />, document.getElementById('main'));
  });
}
