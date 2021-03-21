import React, { Component, PropTypes } from 'react';
import './style.css';

export default class MetricSelector extends Component {
	render () {
		const { meta, actions } = this.props;

 		return <div className="metric-selector">
			<div className={'metric-sel' + (meta.metric === 'm1' ? ' metric-active' : '')} onClick={(evt) => actions.selectMetric('m1')}><i className="fa fa-area-chart" aria-hidden="true"></i>M1</div>
			<div className={'metric-sel' + (meta.metric === 'm2' ? ' metric-active' : '')} onClick={(evt) => actions.selectMetric('m2')}><i className="fa fa-area-chart" aria-hidden="true"></i>M2</div>
			<div className={'metric-sel' + (meta.metric === 'm3' ? ' metric-active' : '')} onClick={(evt) => actions.selectMetric('m3')}><i className="fa fa-area-chart" aria-hidden="true"></i>M3</div>
			{/* <div className="metric-sel"><i className="fa fa-area-chart" aria-hidden="true"></i>M4</div>
			<div className="metric-sel"><i className="fa fa-area-chart" aria-hidden="true"></i>M5</div>
			<div className="metric-sel"><i className="fa fa-area-chart" aria-hidden="true"></i>M6</div> */}
	</div>
	}
}
