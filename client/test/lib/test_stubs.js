import sinon from 'sinon';

export const ticketStub = {
	"id": 1,
	"name": "A",
	"symbol": "SD3456",
	"description": "Lorem ipso dolor sit amet etim",
	"m1": 88,
	"m2": 3,
	"m3": 11,
	"interpol": {
		"metrics": {
			"m1": {
				"mm": [234, 155, 678, 104, 92, 77, 134, 98, 14, 24],
				"desc": "Lorem ipso dolor sit amet etim",
				"ref": 2
			},
			"m2": {
				"mm": [234, 55, 678, 1.4, 9],
				"desc": "Lorem ipso dolor sit amet etim",
				"ref": 2
			},
			"m3": {
				"mm": [234, 55, 678, 1.4, 9],
				"desc": "Lorem ipso dolor sit amet etim",
				"ref": 2
			}
		},
		"heat": {
			"m1": [
				{"a":1,"b": 1,"v": 2.4},
				{"a":1,"b": 2,"v": 2.4},
				{"a":1,"b": 3,"v": 2.9},
				{"a":1,"b": 4,"v": 2.4},
				{"a":2,"b": 1,"v": 3.6},
				{"a":2,"b": 2,"v": 3.4},
				{"a":2,"b": 3,"v": 3.9},
				{"a":2,"b": 4,"v": 4.4},
				{"a":3,"b": 1,"v": 4.4},
				{"a":3,"b": 2,"v": 4.4},
				{"a":3,"b": 3,"v": 5.9},
				{"a":3,"b": 4,"v": 6.4},
				{"a":4,"b": 1,"v": 6.4},
				{"a":4,"b": 2,"v": 6.4},
				{"a":4,"b": 3,"v": 5.9},
				{"a":4,"b": 4,"v": 5.4}
			],
			"m2": [
				{"a":1,"b": 1,"v": 3.4},
				{"a":1,"b": 2,"v": 4.4},
				{"a":1,"b": 3,"v": 5.9},
				{"a":1,"b": 4,"v": 3.4},
				{"a":2,"b": 1,"v": 2.4},
				{"a":2,"b": 2,"v": 3.4},
				{"a":2,"b": 3,"v": 5.9},
				{"a":2,"b": 4,"v": 4.4},
				{"a":3,"b": 1,"v": 3.4},
				{"a":3,"b": 2,"v": 1.4},
				{"a":3,"b": 3,"v": 2.9},
				{"a":3,"b": 4,"v": 2.4},
				{"a":4,"b": 1,"v": 1.4},
				{"a":4,"b": 2,"v": 3.4},
				{"a":4,"b": 3,"v": 8.9},
				{"a":4,"b": 4,"v": 3.4}
			],
			"m3": [
				{"a":1,"b": 1,"v": 6.4},
				{"a":1,"b": 2,"v": 5.4},
				{"a":1,"b": 3,"v": 4.9},
				{"a":1,"b": 4,"v": 3.4},
				{"a":2,"b": 1,"v": 2.4},
				{"a":2,"b": 2,"v": 1.4},
				{"a":2,"b": 3,"v": 3.9},
				{"a":2,"b": 4,"v": 2.4},
				{"a":3,"b": 1,"v": 6.4},
				{"a":3,"b": 2,"v": 1.4},
				{"a":3,"b": 3,"v": 1.9},
				{"a":3,"b": 4,"v": 1.4},
				{"a":4,"b": 1,"v": 3.4},
				{"a":4,"b": 2,"v": 2.4},
				{"a":4,"b": 3,"v": 1.9},
				{"a":4,"b": 4,"v": 2.4}
			]
		}
	},
	"values": [
		{
			"date": "2017-01-01",
			"m1": 12.23,
			"m2": 5,
			"m3": 0.33
		},
		{
			"date": "2017-01-02",
			"m1": 13.53,
			"m2": 6,
			"m3": 0.5
		},
		{
			"date": "2017-01-03",
			"m1": 4.23,
			"m2": 8,
			"m3": 1
		},
		{
			"date": "2017-01-04",
			"m1": 0.23,
			"m2": 6,
			"m3": 2
		},
		{
			"date": "2017-01-05",
			"m1": 22.23,
			"m2": 4,
			"m3": 1.2
		},
		{
			"date": "2017-01-06",
			"m1": 10.23,
			"m2": 9,
			"m3": 0.3
		},
		{
			"date": "2017-01-07",
			"m1": 3.6,
			"m2": 6,
			"m3":0.9
		},
		{
			"date": "2017-01-08",
			"m1": 1.23,
			"m2": 3,
			"m3": 1.2
		},
		{
			"date": "2017-01-09",
			"m1": 2.23,
			"m2": 5,
			"m3": 0.63
		},
		{
			"date": "2017-01-10",
			"m1": 1.23,
			"m2": 4,
			"m3": 0.33
		},
		{
			"date": "2017-01-11",
			"m1": 1.23,
			"m2": 5,
			"m3": 1.4
		},
		{
			"date": "2017-01-12",
			"m1": 1.23,
			"m2": 6,
			"m3": 0.33
		}
	]
};

export const stubComponent = (componentClass) => {
	var originalPropTypes;

	beforeEach(function() {
		originalPropTypes = componentClass.propTypes;

		componentClass.propTypes = {};

		sinon.stub(componentClass.prototype, 'render').returns(null);
		sinon.stub(componentClass.prototype, 'componentWillMount').returns(null);
		sinon.stub(componentClass.prototype, 'componentDidMount').returns(null);
		sinon.stub(componentClass.prototype, 'componentWillReceiveProps').returns(null);
		sinon.stub(componentClass.prototype, 'shouldComponentUpdate').returns(null);
		sinon.stub(componentClass.prototype, 'componentWillUpdate').returns(null);
		sinon.stub(componentClass.prototype, 'componentDidUpdate').returns(null);
		sinon.stub(componentClass.prototype, 'componentWillUnmount').returns(null);
	});

	afterEach(function() {
		componentClass.propTypes = originalPropTypes;
	});
};
