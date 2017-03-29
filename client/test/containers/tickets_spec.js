import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, findRenderedComponentWithType, isCompositeComponentWithType} from 'react-addons-test-utils';
import Ticket from '../../components/Ticket';
import Tickets from '../../containers/Tickets';
import {expect} from 'chai';
import {ticketStub} from '../lib/test_stubs';

// const initialState = {key: 'value'};
// const store = createStore(initialState);
//
// component = TestUtils.renderIntoDocument(
//   <Provider store={store(initialState)}>
//     {() => <SideMenu />}
//   </Provider>
// );

describe('Tickets Container', () => {

	// it('should be rendered with a bunch of Ticket children', () => {
	// 	let dataset = {
	// 		actions: [],
	// 		tickets: [
	// 			Object.assign({}, ticketStub, {id: 1, key: 1}),
	// 			Object.assign({}, ticketStub, {id: 2, key: 2}),
	// 			Object.assign({}, ticketStub, {id: 3, key: 3})
	// 		]
	// 	};
	// 	tickets = renderIntoDocument(<Tickets tickets={dataset.dataset} actions={dataset.actions} />);
	// 	var child = findRenderedComponentWithType(profile, Tickets);
	// 	expect(isCompositeComponentWithType(child, Ticket)).toBe(true);
	// });
});
