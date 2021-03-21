import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Interpolview from '../../components/Interpol';
import * as AppActions from '../../actions';
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

		const freeze = (evt) => {
			let btn = evt.target;

			actions.takeSnapshot(tickets);
			btn.setAttribute('class', 'fa fa-camera click-confirm');
			setTimeout(function() {
				btn.setAttribute('class', 'fa fa-camera');
			}, 1000);
		}
	    return (
	      	<div className="interpols">
				<span className="settings">
					<i className="fa fa-camera ripple" aria-hidden="true" onClick={(evt) => freeze(evt)}></i>
					<i className="fa fa-bars" aria-hidden="true" onClick={(evt) => actions.uiShowSect('snapshots')}></i>
				</span>
	        	{tickets.map( ticket => <Interpolview key={ticket.id} ticket={ticket} meta={meta} /> )}
	      	</div>
	    );
  }
}

function mapStateToProps(state) {
	const { ticketsState } = state;
	return {
		tickets: ticketsState.tickets
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
