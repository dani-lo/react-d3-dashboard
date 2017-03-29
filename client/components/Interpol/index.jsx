import React, { Component, PropTypes } from 'react';
import BarChart from '../../components/Chart/Bar';
import HeatChart from '../../components/Chart/Heat';
import './style.css';

const getInterpolClassname = (ticket) => ticket.filtered ? 'interpol filtered t-' + ticket.id : 'interpol unfiltered t-' + ticket.id;

export default class Interpolview extends Component {
	render () {
		const { ticket, meta } = this.props;

		if (ticket.drilled === true) {
			return <div>
					<div className={getInterpolClassname(ticket)}>
						<div className="interpol-data">
							<h2>{ticket.name + ' - ' + ticket.id + ' - ' + ticket.symbol}</h2>
							<p>{ticket.description}</p>
						</div>
						<h3><span><i className="fa fa-bar-chart active" aria-hidden="true"></i><i className="fa fa-pie-chart" aria-hidden="true"></i></span>Interpol totals <i className="fa fa-question-circle" aria-hidden="true"></i></h3>
						<BarChart {...this.props} />
						<h3>Interpol breakdown <i className="fa fa-question-circle" aria-hidden="true"></i></h3>
						<HeatChart {...this.props} />
					</div>
				</div>
		}
		return <span className="interpol-unactive"></span>
	}
}
