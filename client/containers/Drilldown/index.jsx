import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Interpolview from '../../components/interpol';
import * as AppActions from 'actions';
import './style.css';

class Drilldown extends Component {
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
			tickets, summary, actions, meta
		} = this.props;

	    return (
	      	<div className="interpols">
	        	{tickets.map( ticket => <Interpolview key={ticket.id} ticket={ticket} meta={meta} /> )}
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
)(Drilldown);
