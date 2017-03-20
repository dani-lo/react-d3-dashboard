import { combineReducers } from 'redux';

import {
	ADD_TICKET,
	DRILL_TICKET,
	FILTER_TICKETS_SYM,
	FILTER_TICKETS_VAL,
	REQUEST_SUM,
	SELECT_METRIC
} from 'actions';

import {
	defaultMeta,
	defaultTickets,
	defaultSummary
} from './defaults';

import * as std from '../store';
/**
* Add a new ticket.
* This is a helper function for the tickets reducer
* @param {Object} state
* @param {Object} action
*/
function addTicket(state, action) {
	const { id, pnl, symbol, timestr } = action.ticket;
	const newState = [...state, {
		id,
		name,
		description,
		rating,
		agency,
		users,
		interpol,
		values
	}];
	return newState;
}

/**
* Main transactions reducer
* @param  {Object} state  Current state
* @param  {Object} action Dispatched action
* @return {Object}        Default state
*/
function tickets(state = defaultTickets, action) {
	let newState;
	switch (action.type) {
		case ADD_TICKET:
  			return addTicket(state, action);
		case FILTER_TICKETS_SYM:
  			newState = state.map(function(ticket) {
				ticket.filtered = false;
				if (ticket.symbol.indexOf(action.symbol) === -1) {
					ticket.filtered = true;
				}
				return ticket;
			});
  			return newState;
		case FILTER_TICKETS_VAL:
			let metric = action.keyVal.m;
			let value = action.keyVal.v;
			let compare = action.keyVal.f;
console.log(metric);
			const filterFunc = (t) => {
				if (compare === 'H') return t[metric.toLowerCase()] < parseInt(value, 10);
				if (compare === 'L') return t[metric.toLowerCase()] > parseInt(value, 10);
			}

			newState = state.map(function(ticket) {
				ticket.filtered = true;

				if (value === '') {
					ticket.filtered = false;
				}
				else if(compare === 'L' && ticket[metric.toLowerCase()] < parseInt(value, 10)) {
					ticket.filtered = false;
				} else if (compare === 'H' && ticket[metric.toLowerCase()] > parseInt(value, 10)) {
					ticket.filtered = false;
				}
				return ticket;
			});

			return newState;
		case DRILL_TICKET:
			newState = state.map(function(ticket) {
				if (ticket.id === action.id) {
					ticket.drilled = !ticket.drilled;
				} else {
					ticket.drilled = false;
				}
				return ticket;
			});
			return newState;
		default:
		  	return state;
	}
}

/**
* Summary calculation
* @param  {Object} state  Current state
* @param  {Object} action Dispatched action
* @return {Object}        Default state
*/
function summary(state = defaultSummary, action) {
	let sum;
	switch (action.type) {
		case REQUEST_SUM:
			sum = action.data.reduce((prev, current) => (
				{ value: prev.value + current.value }
			));

			sum = { value: Math.round(sum.value * 100) / 100 };

			// Return ES2015 friendly
			// or stage-0 {...state, ...sum}
			return Object.assign({}, state, sum);
		default:
			return state;
	}
}

/**
* Summary calculation
* @param  {Object} state  Current state
* @param  {Object} action Dispatched action
* @return {Object}        Default state
*/
function meta(state = defaultMeta, action) {
	let sum;
	switch (action.type) {
		case SELECT_METRIC:
			let metric = action.data;
			return Object.assign({}, state, {metric: metric});
		default:
			return state;
	}
}

export default combineReducers({
	tickets,
	meta,
	summary
});
