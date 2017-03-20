import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import App from 'containers/App';
import store from 'store';

import 'index.html';

ReactDOM.render(
	<Provider store={store}>
		<App></App>
	</Provider>,
	document.getElementById('root')
);
