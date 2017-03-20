import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
	const { tickets } = state;

	return {
		tickets: tickets.tickets,
		summary: tickets.summary,
		meta: tickets.meta
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
