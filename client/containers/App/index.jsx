import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Snapshots from 'containers/Snapshots'
import Tickets from 'containers/Tickets';
import Drilldown from 'containers/Drilldown';
import Actionbar from 'components/Actionbar';
import Header from 'components/Header';
import MetricSelector from 'components/MetricSelector'
import StackChart from 'components/Chart/Stack';

import * as AppActions from 'actions';
import './style.css';

class App extends Component {
	static propTypes = {
		tickets: PropTypes.array,
		summary: PropTypes.object,
		actions: PropTypes.object,
		meta: PropTypes.object
	};

	componentWillMount() {
		const { tickets, summary, actions, meta } = this.props;
		actions.requestSum(tickets);
		//setTimeout(() => {actions.initTickets();}, 3000);
	}

	render() {
		const {
			tickets,
			summary,
			meta,
			actions
		} = this.props;

	    return (
			<div className="appview">
				<div className="drilldown">
					<Drilldown {...this.props} />
				</div>
				<div className="snapshots-bar">
					<Snapshots {...this.props} />
				</div>
				<div className="viewport">
	        		<Header />
					<Actionbar {...this.props} />
					<StackChart {...this.props} />
					<MetricSelector {...this.props} />
					<Tickets />
	      		</div>
			</div>
	    );
  }
}

function mapStateToProps(state) {
	const { ticketsState } = state;
	return {
		tickets: ticketsState.tickets,
		meta: ticketsState.meta
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
)(App);
