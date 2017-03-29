import * as d3 from "d3";

const stackDataHelper = d3.layout.stack()
    .offset("zero")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

export const ticketDataBarsAdapter = (d) => {
	return d.mm.map(function(a, i) {
        return {
            item: i + 1, value: a
        }
    });
}

export const ticketDataHeatAdapter = (d) => {
	return d.map(function(heatSnip) {
        return {
            day: heatSnip.a,
            hour: heatSnip.b,
            value: heatSnip.v
        }
    });
}

export const ticketDataAreasAdapter = (d, metric, flat) => {
	var set = [];
	for (let i = 0; i < d.length; i++) {
		let ticket = d[i];
		let ticketName = ticket.name;
		let ticketId = ticket.id;
		let metricSeries = ticket.values;
		let serie = {
			key: ticketId,
            drilled: ticket.drilled || false,
			values: []
		}

		for (let b = 0; b < metricSeries.length; b++) {
			serie.values.push({
				date: new Date(metricSeries[b].date),
				value: +(metricSeries[b][metric])
			});
		}
		if (!ticket.filtered) {
			set.push(serie);
		}

	}

	if (flat) {
	 	return set;
	}

	return	stackDataHelper(set);
}

export const ticketSeriesMax = (data) => {
	let mapByDate = {};
	let max = 0;
	for (let i = 0; i < data.length; i++) {
		let metricSeries = data[i].values;
		for (let b = 0; b < metricSeries.length; b++) {
			mapByDate[metricSeries[b].date] = mapByDate[metricSeries[b].date] || 0;
			mapByDate[metricSeries[b].date] += +(metricSeries[b].value);
		}
	}
	for(let k in mapByDate) {
		if (mapByDate[k] > max) {
			max = mapByDate[k];
		}
	}

	return max;
}
