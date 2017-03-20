import React, { Component, PropTypes } from 'react';
import './style.css';

var valueFilterFunc = "H";
var valueFilterMetric = "M1";

export default class Actionbar extends Component {
	render () {
		const { actions } = this.props;

		const setValueFilterFunc = (evt) => {
			let selector = evt.target;
			let option = selector.options[selector.selectedIndex];

			valueFilterFunc = option.value;
		}

		const setValueFilterMetric = (evt) => {
			let selector = evt.target;
			let option = selector.options[selector.selectedIndex];

			valueFilterMetric = option.value;
		}

 		return <div className="actionbar">
				<div className="filter">
					<span className="filter-title">Filter  By Symbol</span>
					<input placeholder="Filter Tickets By Symbol" type="text" onChange={(evt) => actions.filterTicketsBySymbol(evt.target.value)} />
				</div>

				<div className="filter lg">
					<span className="filter-title">Filter By Value</span>
					<label className="wrapper">
						<span className="button custom-select">
							<select onChange={(e) =>setValueFilterMetric(e)}>
								<option value="m1">M1</option>
								<option value="m2">M2</option>
								<option value="m3">M3</option>
							</select>
						</span>
					</label>
					<label className="wrapper">
						<span className="button custom-select">
							<select onChange={(e) =>setValueFilterFunc(e)}>
								<option value="H">Higher then</option>
								<option value="L">Lower then</option>
							</select>
						</span>
					</label>
					<input type="text" placeholder="Enter Comparator Value" onChange={(evt) => actions.filterTicketsByValue({f: valueFilterFunc, m: valueFilterMetric, v: evt.target.value})}  />
				</div>
			</div>
	}
}
