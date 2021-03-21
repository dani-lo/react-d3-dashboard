import React, { Component, PropTypes } from 'react';
import * as d3 from "d3";
import * as p from '../../../services/p';
import {ticketDataHeatAdapter} from '../../../services/parser';

import './style.css';

var chartData = [];
var svg;

const margin = { top: 20, right: 0, bottom: 0, left: 28 };
const width = 400 - margin.left - margin.right;
const height = 350 - margin.top - margin.bottom;
const gridSize = Math.floor(width / 4);
const legendElementWidth = gridSize * 2;
const buckets = 9;
const colors = ['#84ada1','#437572','#95bad2','#508d92'];
const days = ["Mo", "Tu", "We", "Th"];
const times = ["1234", "9988", "aa87", "34pp"];
const t = p.pTrans(750);

const createLabels = () => {
	svg.selectAll(".timeLabel")
		.data(times)
		.enter()
		.append("text")
		.text(function(d) { return d; })
		.attr("x", function(d, i) { return i * gridSize; })
		.attr("y", 0)
		.style("text-anchor", "middle")
		.attr("transform", "translate(" + gridSize / 2 + ", -6)")
		.attr("class", function(d, i) {
			return ((i >= 7 && i <= 16) ?
				"timeLabel mono axis axis-worktime" :
				"timeLabel mono axis");
		});

	svg.selectAll(".dayLabel")
		.data(days)
		.enter()
		.append("text")
		.text(function (d) {
			return d;
		})
		.attr("x", 0)
		.attr("y", function (d, i) {
			return ((i - 1) * (gridSize / 2)) + 18 ;
		})
		.style("text-anchor", "end")
		.attr("transform", "translate(-6," + gridSize / 1.5 + ")")
		.attr("class", function (d, i) {
		  	return ((i >= 0 && i <= 4) ?
				"dayLabel mono axis axis-workweek" :
				"dayLabel mono axis");
		});
}
const prepare = (id) => {
	svg = d3.select(".heat-id-" + id)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	createLabels();
}

const plot = (data) => {
	var colorScale = d3.scale.quantile()
		.domain([0, buckets - 1, d3.max(data, function (d) {
			return d.value;
		})])
		.range(colors);

	var cards =
		svg.selectAll(".hour")
		.data(data, function(d) {
			return d.day + ':' + d.hour;
		});

	cards.append("title");

	cards.enter()
		.append("rect")
		.on("mouseover", p.pHandleMouseOver)
		.on("mouseout", p.pHandleMouseOut)
		.attr("x", function(d) { return (d.hour - 1) * gridSize; })
		.attr("y", function(d) { return (d.day - 1) * gridSize / 2; })
		.attr("class", "hour bordered")
		.attr("width", gridSize)
		.attr("height", gridSize / 2)
		.style("fill", colors[0]);

	cards.transition(t)
		.style("fill", function(d) {
			return colorScale(d.value);
		});

	cards.select("title")
		.text(function(d) {
			return d.value;
		});

	cards.exit().remove();
}

export default class HeatChart extends Component {
	componentDidMount() {
		let interpol = this.props.ticket.interpol;

		if (interpol && interpol.heat) {
			chartData = ticketDataHeatAdapter(interpol.heat[this.props.meta.metric]);
			prepare(this.props.ticket.id);
			plot(chartData);
		}
	}

	componentWillUnmount() {
		// unplot
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.meta.metric === this.props.meta.metric && nextProps.ticket.id === this.props.ticket.id) {
			return;
		}

		//unplot();

		let interpol = this.props.ticket.interpol;

		if (interpol && interpol.heat) {

			setTimeout(function() {
				chartData = ticketDataHeatAdapter(interpol.heat[this.props.meta.metric]);
				plot(chartData);
			}.bind(this), 100);
		}
	}

	render() {
		return <div className="heat-map">
					<div className={"heat-id-" + this.props.ticket.id}></div>;
					<div className="legend">
						<ul>
							<li><span className="three"></span> good</li>
							<li><span className="one"></span> fine</li>
							<li><span className="four"></span> bad</li>
						</ul>
					</div>
				</div>;
	}
}
