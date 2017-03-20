import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import Ticketview from '../../components/Ticket';
import {expect} from 'chai';

describe('Ticket View', () => {
	it('renders a ticket', () => {
		const propsData = {
			symbol: 'ES33',
			description: 'Test foobar',
			name: 'Abc'
		};
		const component = renderIntoDocument(
			<Ticketview tdata={propsData} />
		);
		const spans = scryRenderedDOMComponentsWithTag(component, 'span');

    	expect(spans.length).to.equal(3);
    	expect(spans[0].textContent).to.equal('ES33');
    	expect(spans[1].textContent).to.equal('Test foobar');
		expect(spans[2].textContent).to.equal('Abc');
	});
});
