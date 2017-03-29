import React, { Component, PropTypes } from 'react';
import * as d3 from "d3";
import * as p from '../../../services/p';
import {ticketDataAreasAdapter, ticketSeriesMax} from '../../../services/parser';

import './style.css';

var chartData = [];
var g;
var svg;

const margin 		= {top: 20, right: 0, bottom: 30, left: 20};
const width 		= 1000 - margin.left - margin.right;
const height 		= 300 - margin.top - margin.bottom;
const t 			= p.pTrans(1000);
const format 		= p.pFormat();
const x 			= p.pxTime(width);
const y 			= p.pyLinear(height);
const xAxis 		= p.pxAxis(x);
const yAxis 		= p.pyAxis(y);
const areaStack 	= p.pStackPlot(x, y);
//--
const setDomain = () => {
	if (chartData.length === 0) {
		y.domain([0, 0]);
		x.domain([0, 0]);
		return;
	}

 	let yMax = ticketSeriesMax(chartData);
	y.domain([0, yMax]);
	x.domain([new Date(chartData[0].values[0].date),
			 new Date(chartData[0].values[chartData[0].values.length - 1].date)]);
}

const prepare = () => {
	setDomain();

	svg = d3.select(".unique-ID-stack")
		.append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	g = svg.append("g");
}

export default class StackChart extends Component {
	actions = this.props.actions;

	plot (pathsData) {
		let self = this;
		let paths =  g.selectAll("path")
					  .data(pathsData);

	  	svg.select('.y.axis').remove();
	  	svg.append("g")
	  		.attr("class", "y axis")
	  		.call(yAxis);

		paths.exit()
			.attr("class", "exit")
			.transition(t)
			.attr("class", function(d) {return "layer layer-" + d.key})
			.style("fill-opacity", 1e-6)
			.remove();

		paths.attr("class", "update")
			.attr("class", function(d) {
				return "layer stack-layer layer-" + d.key + " drilled-" + d.drilled;
			})
			.style("fill-opacity", 1)
			.transition(t)
			.attr("d", function(d) { return areaStack(d.values); })

		paths.enter()
			.append("path")
			.attr("class", "enter")
			.style("fill-opacity", 1e-6)
			.transition(t)
			.attr("d", function(d) { return areaStack(d.values); })
			.attr("class", function(d) {
				return "layer stack-layer layer-" + d.key + " drilled-" + d.drilled;
			})
			.style("fill-opacity", 1);

		paths
			.on("mouseover", p.pHandleMouseOver)
			.on("mouseout", function(d, i) {
				d3.select(".tooltip-circle")
					.attr("style", "display: none");

				d3.select(this).attr({
				  'data-st': "unhovered"
				});
				d3.select(".s-tooltip")
					.attr("style", "display: none;");
			})
			.on("mousemove", function(d, i, el) {
				let mouseX = d3.mouse(this)[0];
				let date = x.invert(mouseX);
				let tooltipData = p.pParseTooltipPoint(d.values, date, x, y);

				d3.select(".tooltip-circle")
					.attr('cx', tooltipData.xt)
					.attr('cy', tooltipData.yt)
					.attr("style", "display: block");

				d3.select(".s-tooltip")
					.attr("style", "display: block;top:" + (tooltipData.yt - 53) + "px;left:" + (tooltipData.xt - 87) + "px;");

				d3.select(".s-tooltip-content")
					.text('id: ' + d.key + ', ' + tooltipData.xv + ': ' + tooltipData.yv)
			})
			.on("click", function(d, i, v) {
				let ticketId = d.key;
				self.actions.drillTicket.call(null, ticketId);
			});

			svg.select(".tooltip-circle").remove();

			svg.append('circle')
				.attr("class", "tooltip-circle")
				.attr("r", 3);
	}

	componentDidMount() {
		yAxis.ticks(5);
		chartData = ticketDataAreasAdapter(this.props.tickets, this.props.meta.metric);
		prepare();
		this.plot(chartData);
	}

	componentWillReceiveProps(nextProps) {
		chartData = ticketDataAreasAdapter(nextProps.tickets, nextProps.meta.metric);
		setDomain();
		this.plot(chartData);
	}

	render() {
		return <div className="stack-container">
				<div className="stack-chart unique-ID-stack"></div>
				<span className="s-tooltip">
					<span className="s-tooltip-content"></span>
					<span className="s-tooltip-tip"><i className="fa fa-caret-down" aria-hidden="true"></i></span>
				</span>

			</div>;
	}
}
