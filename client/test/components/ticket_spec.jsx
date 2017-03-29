import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate, scryRenderedDOMComponentsWithClass} from 'react-addons-test-utils';
import Ticket from '../../components/Ticket';
import Tickets from '../../containers/Tickets';
import {expect} from 'chai';
import {ticketStub} from '../lib/test_stubs';

describe('Ticket View', () => {
	it('renders a ticket', () => {
		const propsData = Object.assign({}, ticketStub);
		const component = renderIntoDocument(
			<Ticket ticket={propsData} />
		);
		const spans = scryRenderedDOMComponentsWithTag(component, 'span');

		// should have 9 columns
    	expect(spans.length).to.equal(9);
		// elements 0 and 8  contain graphics / markup
    	expect(spans[1].textContent).to.equal('1');
		expect(spans[2].textContent).to.equal('A');
    	expect(spans[3].textContent).to.equal('SD3456');
		expect(spans[4].textContent).to.equal('88');
		expect(spans[5].textContent).to.equal('3');
		expect(spans[6].textContent).to.equal('11');
		expect(spans[7].textContent).to.equal('Lorem ip...');
	});

	it('tags a filtered ticket', () => {
		const propsData = Object.assign({}, ticketStub);
		propsData.filtered = true;

		const component = renderIntoDocument(
			<Ticket ticket={propsData} />
		);
		const ticket = scryRenderedDOMComponentsWithClass(component, 'filtered');

		// should have 9 columns
    	expect(ticket.length).to.equal(1);
	});

	it('tags a drilled ticket', () => {
		const propsData = Object.assign({}, ticketStub);
		propsData.drilled = true;

		const component = renderIntoDocument(
			<Ticket ticket={propsData} />
		);
		const ticket = scryRenderedDOMComponentsWithClass(component, 'drilled');

		// should have 9 columns
    	expect(ticket.length).to.equal(1);
	});

});
