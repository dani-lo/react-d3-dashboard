export const FILTER_TICKETS_SYM = 'FILTER_TICKETS_SYM';
export const FILTER_TICKETS_VAL = 'FILTER_TICKETS_VAL';
export const DRILL_TICKET		= 'DRILL_TICKET';
export const REQUEST_SUM 		= 'REQUEST_SUM';
export const ADD_TICKET 		= 'ADD_TICKET';
export const COMPARE_TICKETS 	= 'COMPARE_TICKETS';
export const SELECT_METRIC 		= 'SELECT_METRIC';

function createTicket(ticket) {
	return {
		type: ADD_TICKET,
		ticket
	};
}

export function filterTicketsBySymbol(symbol) {
	return {
		type: FILTER_TICKETS_SYM,
		symbol
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

export function addTicket(ticket) {
	return (dispatch, getState) => {
		const addedResult = dispatch(createTicket(ticket));
		dispatch(requestSum(getState().tickets.tickets));

		return addedResult;
	};
}
