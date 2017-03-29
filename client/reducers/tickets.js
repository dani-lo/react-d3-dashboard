import { combineReducers } from 'redux';

import {
	ADD_TICKET,
	INIT_TICKETS,
	INIT_META,
	GET_TICKETS,
	DRILL_TICKET,
	FILTER_TICKETS_SYM,
	FILTER_TICKETS_VAL,
	REQUEST_SUM,
	SELECT_METRIC,
	TAKE_SNAPSHOT,
	PLAY_SNAPSHOT_META,
	PLAY_SNAPSHOT_TICKETS,
	UI_SHOW_SECT,
	UI_HIDE_SECT
} from '../actions';

import {
	defaultMeta,
	defaultTickets,
	emptyTickets,
	defaultSummary
} from './defaults';
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
		case INIT_TICKETS:
			newState = state.map(function(ticket) {
				ticket.filtered = false;
				ticket.drilled = false;
				return ticket;
			});
		return newState;
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
		case PLAY_SNAPSHOT_TICKETS:
			let snapTime = action.idTime;
			let newState;
			let existingSnapshotsStr = localStorage.getItem('appstate');
			let existingSnapshots = JSON.parse(existingSnapshotsStr);

			if (existingSnapshots && existingSnapshots[snapTime]) {
				newState = existingSnapshots[snapTime].t.map((i) => i);
				return newState;
			}

			return state;
		case GET_TICKETS:
			return state;
		default:
		  	return state;
	}
}

/**
* Meta calculations
* @param  {Object} state  Current state
* @param  {Object} action Dispatched action
* @return {Object}        Default state
*/
function meta(state = defaultMeta, action) {
	let sum;
	let newState;
	switch (action.type) {
		case SELECT_METRIC:
			let metric = action.data;
			return Object.assign({}, state, {metric: metric});

		case INIT_META:
			return Object.assign({}, state, {metric: 'm1'});
		case TAKE_SNAPSHOT:
			let snapTimeSet = Date.now();
			let existingSnapshotsStrSet= localStorage.getItem('appstate');
			let existingSnapshotsSet = JSON.parse(existingSnapshotsStrSet) || {};

			existingSnapshotsSet[snapTimeSet] = {
				t: action.data,
				m: Object.assign({}, state)
			};

			localStorage.setItem('appstate', JSON.stringify(existingSnapshotsSet));
			newState = Object.assign(state, {}, {"snapshots": state.snapshots.concat(snapTimeSet)});

			return newState;
		case PLAY_SNAPSHOT_META:
			let snapTimeGet = action.idTime;
			let existingSnapshotsStrGet = localStorage.getItem('appstate');
			let existingSnapshotsGet = JSON.parse(existingSnapshotsStrGet);

			if (existingSnapshotsGet && existingSnapshotsGet[snapTimeGet]) {
				newState = Object.assign({}, state, {
					metric: existingSnapshotsGet[snapTimeGet].m.metric
				});
				return newState;
			}
			return state;
		case UI_SHOW_SECT:

			let settingShow = {};
			settingShow[action.sectId] = 1;

			newState = Object.assign({}, state, {appsect: settingShow});
			return newState;
		case UI_HIDE_SECT:

			let settingHide = {};
			settingHide[action.sectId] = 0;

			newState = Object.assign({}, state, {appsect: settingHide});
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

export default combineReducers({
	tickets,
	meta,
	summary
});
