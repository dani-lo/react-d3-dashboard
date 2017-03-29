import * as d3 from "d3";

export const pFormat = () =>
	d3.time.format("%m/%d/%y");

export const pxTime = (w) =>
	d3.time.scale()
		.range([0, w]);

export const pxLinear = (w) =>
	d3.time.linear()
		.range([0, w]);

export const pxGrid = (w) =>
 	(d, i) => i * w;

export const pyLinear = (h) =>
	d3.scale.linear()
		.range([h, 0]);

export const pxLinearBand = (w) =>
	d3.scale.ordinal().rangeRoundBands([0, w], .05);

export const pTrans = (t) =>
	d3.transition()
		.duration(t);

export const pxMax   = (data)  =>
	d3.max(data, (d) => d[0]);

export const pyMax   = (data)  =>
	d3.max(data, (d) => d[1]);

export const pzeroArea = (h) =>
	d3.svg.area()
	    .interpolate('monotone')
	    .x(function(d) {
	        return x(d.date);
	    })
		.y0(function(d) { return 0; })
	    .y1(h);


export const pxAxis = (x) =>
	d3.svg.axis()
	    .scale(x)
	    .orient('bottom')
	    .ticks(d3.time.days);

export const pyAxis = (y) =>
	d3.svg.axis()
	    .scale(y)
	    .orient('right');

const pStack = d3.layout.stack()
    .offset("zero")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

export const pStackPlot = (x, y) =>
	d3.svg.area()
	    .interpolate("cardinal")
	    .x(function(d) { return x(d.date); })
	    .y0(function(d) { return y(d.y0); })
	    .y1(function(d) { return y(d.y0 + d.y); });

export const pBarPlot = (x, y) =>
	true

export const pTransp = () =>
	d3.scale.linear()
		.range([0.4, 0.8]);

export function pHandleMouseOver(d, i) {
	d3.select(this).attr({
	  'data-st': "hovered"
	});
}

export function pHandleMouseOut(d, i) {
	d3.select(this).attr({
	  'data-st': "unhovered"
	});
}

export const pParseTooltipPoint = (pathData, xval, xFunc, yFunc) => {
	for (let i = 0; i < pathData.length; i++) {
		if (compareDates(pathData[i].date, xval)) {
			return {
				xt: parseInt(xFunc(pathData[i].date)),
				yt: parseInt(yFunc(pathData[i].y + pathData[i].y0)),
				xv: ('' + pathData[i].date).substring(0, 10),
				yv: pathData[i].value
			};
		}
	}
	return null;
}

const compareDates = (a, b) => {
	return ('' + a).substring(0, 12) === ('' + b).substring(0, 12);
};
