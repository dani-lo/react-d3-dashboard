import * as parser from '../../services/parser';
import {expect} from 'chai';
import {ticketStub} from '../lib/test_stubs';


describe('App Data Parser', () => {

	it ('should parse into stack data', () => {
		let dataset = [
			Object.assign({}, ticketStub, {id: 1, key: 1}),
			Object.assign({}, ticketStub, {id: 2, key: 2}),
			Object.assign({}, ticketStub, {id: 3, key: 3})
		];

		let parsed = parser.ticketDataAreasAdapter(dataset, 'm1');
		let parsedLayer = parsed[0].values;

		expect(parsed.length).to.equal(3);
		expect(parsedLayer.length).to.equal(12);
		expect(parsedLayer[0].y).to.equal(12.23);
		expect(parsedLayer[0].y0).to.equal(0);
	});

	it ('should parse into flat (non y0) stack data', () => {
		let dataset = [
			Object.assign({}, ticketStub, {id: 1, key: 1}),
			Object.assign({}, ticketStub, {id: 2, key: 2}),
			Object.assign({}, ticketStub, {id: 3, key: 3})
		];
		let parsed = parser.ticketDataAreasAdapter(dataset, 'm1', true);
		let parsedLayer = parsed[0].values;

		expect(parsed.length).to.equal(3);
		expect(parsedLayer.length).to.equal(12);

		// Now we check it is non stacked
		expect(parsedLayer[0].y).to.be.undefined;
		expect(parsedLayer[0].y0).to.be.undefined;
		expect(parsedLayer[0].value).to.equal(12.23);
	});


	it('should parse into bar data', () => {
		let dataset = Object.assign({}, ticketStub.interpol.metrics.m1);
		let parsed = parser.ticketDataBarsAdapter(dataset);
		expect(parsed.length).to.equal(10);
		expect(parsed[0].item).to.equal(1);
		expect(parsed[0].value).to.equal(234);
	});

	it ('should parse into heat data', () => {
		let dataset = Object.assign({}, ticketStub.interpol.heat);
		let parsed = parser.ticketDataHeatAdapter(dataset.m1);
		expect(parsed.length).to.equal(16);
		expect(parsed[0].day).to.equal(1);
		expect(parsed[0].hour).to.equal(1);
		expect(parsed[0].value).to.equal(2.4);
	});

	it ('should extract nested max', () => {

	});
})
