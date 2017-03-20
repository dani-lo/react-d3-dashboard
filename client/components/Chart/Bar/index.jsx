import React, { Component, PropTypes } from 'react';
import * as d3 from "d3";
import * as p from '../../../services/p';
import {ticketDataBarsAdapter} from '../../../services/parser';

import './style.css';

var chartData = [];
var svg;

const currMetric 	= 'm1';
const margin 		= {top: 20, right: 0, bottom: 30, left: 20};
const width 		= 540 - margin.left - margin.right;
const height 		= 250 - margin.top - margin.bottom;
const t 			= p.pTrans(750);
const x 			= p.pxLinearBand(width);
const y 			= p.pyLinear(height);
const xAxis 		= p.pxAxis(x);
const yAxis 		= p.pyAxis(y);
const barsPlot 		= p.pBarPlot(x, y);
const transp 		= p.pTransp();

const setDomain = () => {
	x.domain(chartData.map(function(d) { return d.item; }));
	y.domain([0, d3.max(chartData, function(d) { return d.value; })]);
	transp.domain([0, d3.max(chartData, function(d) { return d.value; })]);
}

const prepare = (id) => {
	setDomain();

	svg = d3.select(".bar-id-" + id)
		.append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
}

const plotAxes = () => {
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
	    .attr("y", 12)
	    .attr("dy", ".35em")
	    .attr("transform", "rotate(0)")
	    .style("text-anchor", "start");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em");
}

const unplotAxes = () => {
	svg.selectAll('.axis').remove();
}

const plot = (pathsData) => {
	setDomain();
	plotAxes();
	svg.selectAll("bar")
		.data(chartData)
		.enter()
		.append("rect")
		.style('fill', function (d) {
            return 'rgba(55, 94, 115, ' + transp(d.value) + ')';
        })
		.attr("x", function(d) { return x(d.item); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return 0; })
		.transition(t)
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value); });
}

const unplot = () => {
	unplotAxes();

	svg.selectAll('rect')
		.transition(t)
		.attr("height", function(d) { return 0; })
		.attr("y", function(d) { return 0; })
}

export default class BarChart extends Component {
	componentDidMount() {
		let interpol = this.props.ticket.interpol;

		yAxis.ticks(5);

		if (interpol && interpol.metrics) {
			chartData = ticketDataBarsAdapter(interpol.metrics[this.props.meta.metric]);
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
		unplot();
		let interpol = this.props.ticket.interpol;

		if (interpol && interpol.metrics) {

			setTimeout(function() {
				chartData = ticketDataBarsAdapter(interpol.metrics[this.props.meta.metric]);
				plot(chartData);
			}.bind(this), 500);
		}
	}

	render() {
		return <div className={"bar-chart bar-id-" + this.props.ticket.id}></div>;
	}
}
