import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, scryRenderedComponentsWithType, Simulate, scryRenderedDOMComponentsWithClass} from 'react-addons-test-utils';
import Interpolview from '../../components/Interpol';
import BarChart from '../../components/Chart/Bar';
import HeatChart from '../../components/Chart/Heat';
import {expect} from 'chai';
import {ticketStub, stubComponent} from '../lib/test_stubs';

describe('Interpol View', () => {
	const propsData = Object.assign({}, ticketStub);
	const meta = {'metric': 'm1'};
	propsData.drilled = true;

	const component = renderIntoDocument(
		<Interpolview ticket={propsData} meta={meta} />
	);

	it('renders an interpol from a drilled ticket', () => {
		const header = scryRenderedDOMComponentsWithClass(component, 'interpol-data');
    	expect(header.length).to.equal(1);
	});

	it('renders a Bar chart in the interpol', () => {
		const barChart = scryRenderedDOMComponentsWithClass(component, 'bar-chart');
		expect(barChart.length).to.equal(1);
	});

	it('renders a Heat map in the interpol', () => {
		const heatChart = scryRenderedDOMComponentsWithClass(component, 'heat-map');
		expect(heatChart.length).to.equal(1);
	});
});
