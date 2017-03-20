import React, { Component, PropTypes } from 'react';
import './style.css';

const getTicketClassname = (ticket) => {
	let filteredStr = ticket.filtered ? 'ticketrow filtered t-' + ticket.id : 'ticketrow unfiltered t-' + ticket.id;
	let drilledStr = ticket.drilled ? ' drilled' : ' undrilled';
	return filteredStr + drilledStr;
}

export default class Ticketview extends Component {
	render () {
		const { ticket, actions } = this.props;

		return  <p className={getTicketClassname(ticket)}>
					<span className="ticket-cell cell-col"><i></i></span>
					<span className="ticket-cell">{ticket.id}</span>
					<span className="ticket-cell">{ticket.name}</span>
					<span className="ticket-cell">{ticket.symbol}</span>
					<span className="ticket-cell">{ticket.m1}</span>
					<span className="ticket-cell">{ticket.m2}</span>
					<span className="ticket-cell">{ticket.m3}</span>
					<span className="ticket-cell">{ticket.description.substring(0, 8) + '...'}</span>
					<span className="ticket-drill" onClick={(evt) => actions.drillTicket(ticket.id)}>
						<i className="fa fa-plus-circle" aria-hidden="true"></i>
						<i className="fa fa-minus-circle" aria-hidden="true"></i>
					</span>
				</p>;
	}
}
