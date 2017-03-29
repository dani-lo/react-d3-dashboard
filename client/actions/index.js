export const FILTER_TICKETS_SYM 	= 'FILTER_TICKETS_SYM';
export const FILTER_TICKETS_VAL 	= 'FILTER_TICKETS_VAL';
export const GET_TICKETS 			= 'GET_TICKETS';
export const INIT_TICKETS			= 'INIT_TICKETS';
export const INIT_META				= 'INIT_META';
export const DRILL_TICKET			= 'DRILL_TICKET';
export const REQUEST_SUM 			= 'REQUEST_SUM';
export const ADD_TICKET 			= 'ADD_TICKET';
export const COMPARE_TICKETS 		= 'COMPARE_TICKETS';
export const SELECT_METRIC 			= 'SELECT_METRIC';
export const TAKE_SNAPSHOT 			= 'TAKE_SNAPSHOT';
export const PLAY_SNAPSHOT_META 	= 'PLAY_SNAPSHOT_META';
export const PLAY_SNAPSHOT_TICKETS 	= 'PLAY_SNAPSHOT_TICKETS';
export const UI_SHOW_SECT			= 'UI_SHOW_SECT';
export const UI_HIDE_SECT			= 'UI_HIDE_SECT';


function createTicket(ticket) {
	return {
		type: ADD_TICKET,
		ticket
	};
}

export function initTickets() {
	return {
		type: INIT_TICKETS
	};
}

export function initMeta() {
	return {
		type: INIT_META
	};
}

export function filterTicketsBySymbol(symbol) {
	return {
		type: FILTER_TICKETS_SYM,
		symbol
	};
}

export function getTickets() {
	return {
		type: GET_TICKETS
	};
}

export function filterTicketsByValue(keyVal) {
	return {
		type: FILTER_TICKETS_VAL,
		keyVal
	};
}

export function drillTicket(id) {
	return {
		type: DRILL_TICKET,
		id
	};
}

export function requestSum(data) {
	return {
		type: REQUEST_SUM,
		data
	};
}

export function selectMetric(data) {
	return {
		type: SELECT_METRIC,
		data
	};
}

export function takeSnapshot(data) {
	return {
		type: TAKE_SNAPSHOT,
		data
	};
}

export function playSnapshotMeta(idTime) {
	return {
		type: PLAY_SNAPSHOT_META,
		idTime
	};
}

export function playSnapshotTickets(idTime) {
	return {
		type: PLAY_SNAPSHOT_TICKETS,
		idTime
	};
}

export function uiShowSect(sectId) {
	return {
		type: UI_SHOW_SECT,
		sectId
	};
}

export function uiHideSect(sectId) {
	return {
		type: UI_HIDE_SECT,
		sectId
	};
}

export function addTicket(ticket) {
	return (dispatch, getState) => {
		const addedResult = dispatch(createTicket(ticket));
		dispatch(requestSum(getState().tickets.tickets));

		return addedResult;
	};
}
