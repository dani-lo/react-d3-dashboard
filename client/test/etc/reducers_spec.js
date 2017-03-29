import {expect} from 'chai';
import {rootReducer} from '../../reducers';
import {ticketStub} from '../lib/test_stubs';

describe('reducer', () => {
	//
	it('filters tickets abovr a value', () => {
		let initialState = {
			ticketsState: {
				tickets: [
						Object.assign({}, ticketStub, {id: 1, key: 1, m1: 10}),
						Object.assign({}, ticketStub, {id: 2, key: 2, m2: 20}),
						Object.assign({}, ticketStub, {id: 3, key: 3, m3: 30})
					]
				}
			};

		const action = {
			type: 'FILTER_TICKETS_VAL',
			keyVal: {m: 'm1', v: 15, f: 'H'}
		};

		// Grab the state tickets 'branch'
		const nextState = rootReducer(initialState, action).ticketsState;
		expect(nextState.tickets.length).to.equal(3);
		expect(nextState.tickets[0].filtered).to.be.true;
		expect(nextState.tickets[1].filtered).to.be.false;
		expect(nextState.tickets[2].filtered).to.be.false;
	});

	it('filters tickets below a value', () => {
		let initialState = {
			ticketsState: {
				tickets: [
						Object.assign({}, ticketStub, {id: 1, key: 1, m1: 10}),
						Object.assign({}, ticketStub, {id: 2, key: 2, m2: 20}),
						Object.assign({}, ticketStub, {id: 3, key: 3, m3: 30})
					]
				}
			};

		const action = {
			type: 'FILTER_TICKETS_VAL',
			keyVal: {m: 'm1', v: 15, f: 'L'}
		};
		// Grab the state tickets 'branch'
		const nextState = rootReducer(initialState, action).ticketsState;
		expect(nextState.tickets.length).to.equal(3);
		expect(nextState.tickets[0].filtered).to.be.false;
		expect(nextState.tickets[1].filtered).to.be.true;
		expect(nextState.tickets[2].filtered).to.be.true;
	});

	it('filters tickets by symbol', () => {
		let initialState = {
			ticketsState: {
				tickets: [
						Object.assign({}, ticketStub, {id: 1, key: 1, symbol: 'AG123'}),
						Object.assign({}, ticketStub, {id: 2, key: 2, symbol: 'AB123'}),
						Object.assign({}, ticketStub, {id: 3, key: 3, symbol: 'CC123'})
					]
				}
			};

		const action = {
			type: 'FILTER_TICKETS_SYM',
			symbol: 'AG'
		};
		// Grab the state tickets 'branch'
		const nextState = rootReducer(initialState, action).ticketsState;

		expect(nextState.tickets.length).to.equal(3);
		expect(nextState.tickets[0].filtered).to.be.false;
		expect(nextState.tickets[1].filtered).to.be.true;
		expect(nextState.tickets[2].filtered).to.be.true;
	});

	it('drills tickets', () => {
		let initialState = {
			ticketsState: {
				tickets: [
						Object.assign({}, ticketStub, {id: 1, key: 1}),
						Object.assign({}, ticketStub, {id: 2, key: 2}),
						Object.assign({}, ticketStub, {id: 3, key: 3})
					]
				}
			};

		const action = {
			type: 'DRILL_TICKET',
			id: 2
		};
		// Grab the state tickets 'branch'
		const nextState = rootReducer(initialState, action).ticketsState;

		expect(nextState.tickets.length).to.equal(3);
		expect(nextState.tickets[0].drilled).to.be.false;
		expect(nextState.tickets[1].drilled).to.be.true;
		expect(nextState.tickets[2].drilled).to.be.false;
	});

	it('sets the app main metric', () => {

	});
});
