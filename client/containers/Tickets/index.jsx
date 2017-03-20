import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ticketview from '../../components/ticket';
import * as AppActions from 'actions';
import './style.css';

class TicketsHeader extends Component {
	render () {
		return  <p className="ticketrow ticketrow-header">
			<span>-</span>
			<span className="ticket-cell">Id</span>
			<span className="ticket-cell">Name</span>
			<span className="ticket-cell">Sym</span>
			<span className="ticket-cell">M1</span>
			<span className="ticket-cell">M2</span>
			<span className="ticket-cell">M3</span>
			<span className="ticket-cell">Description</span>
			<span className="ticket-drill"></span>
		</p>
	}
}

class Tickets extends Component {
	static propTypes = {
		id: PropTypes.number,
		name: PropTypes.string,
		description: PropTypes.string,
		m1: PropTypes.number,
		m2:PropTypes.number,
		m3: PropTypes.number,
		values: PropTypes.array,
		interpol: PropTypes.object,
		symbol: PropTypes.string
	};

	componentWillMount() {
		const { tickets, summary, actions } = this.props;
		actions.requestSum(tickets);
	}

	render() {
		const {
			tickets, summary, actions
		} = this.props;

	    return (
	      	<div className="tickets">
				<TicketsHeader />
	        	{tickets.map( ticket => <Ticketview key={ticket.id} ticket={ticket} actions={actions} /> )}
	      	</div>
	    );
  }
}

function mapStateToProps(state) {
	const { tickets } = state;

	return {
		tickets: tickets.tickets,
		summary: tickets.summary
	};
}

function mapDispatchToProps(dispatch) {
	return {
    	actions: bindActionCreators(AppActions, dispatch)
  	};
}

export default connect(
  	mapStateToProps,
  	mapDispatchToProps
)(Tickets);
