import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../actions';
import './style.css';

class Snapshots extends Component {
	render () {
		const { meta, actions } = this.props;

		const playback = (snaptimeId) => {
			actions.playSnapshotTickets(snaptimeId);
			actions.playSnapshotMeta(snaptimeId)
		}

		const reset = () => {
			actions.initTickets();
			actions.initMeta()
		}

		const getClassName = () => {
			if (meta.appsect.snapshots === 1) {
				return "snapshots-list active";
			}

			return "snapshots-list";
		}

 		return <div className={getClassName()}>
				<i className="fa fa-times" aria-hidden="true" onClick={(evt) => actions.uiHideSect('snapshots')}></i>
				<h2>Please select what application snapshot you wish to load / share with your friends</h2>
				<ul>
					{meta.snapshots.map( (snapshotIdTime) =>
						<li key={snapshotIdTime} className="snapshot">
							<a href="#_" onClick={(evt) => playback(snapshotIdTime)}>Load {snapshotIdTime}</a>
						</li> )}
				</ul>
				<h4 onClick={(evt) => reset()}>Reset View</h4>
			</div>
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
)(Snapshots);
