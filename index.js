// URL variable
let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// Request variable
let req = new XMLHttpRequest();

// Data variable
let data;
let values = [];

// Bar Chart variables
let xAxis;
let yAxis;
let xScale;
let yScale;
let width = 1000;
let height = 600;
let padding = 50;

// SVG
let svg = d3.select("svg");

// Draw Bar Chart
let drawBarChart = () => {
	svg.attr("width", width);
	svg.attr("height", height);
};

let drawScales = () => {
	xAxis = d3
		.scaleLinear()
		.domain([0, d3.max(values, (gdp) => gdp[1])])
		.range([0, height - 2 * padding]);

	yAxis = d3
		.scaleLinear()
		.domain([0, values.length - 1])
		.range([padding, width - padding]);

	let datesArray = values.map((date) => new Date(date[0]));

	xScale = d3
		.scaleTime()
		.domain([d3.min(datesArray), d3.max(datesArray)])
		.range([padding, width - padding]);

	yScale = d3
		.scaleLinear()
		.domain([0, d3.max(values, (item) => item[1])])
		.range([height - padding, padding]);
};

let drawAxes = () => {
	let xAxis = d3.axisBottom(xScale);
	let yAxis = d3.axisLeft(yScale);

	svg
		.append("g")
		.call(xAxis)
		.attr("id", "x-axis")
		.attr("transform", "translate(0, " + (height - padding) + ")");

	svg
		.append("g")
		.call(yAxis)
		.attr("id", "y-axis")
		.attr("transform", "translate(" + padding + ", 0)");
};

let drawBars = () => {};

// Fetching JSON data
req.open("GET", url, true);
req.onload = () => {
	data = JSON.parse(req.responseText);
	values = data.data;
	console.log(values);
	drawBarChart();
	drawScales();
	drawAxes();
	drawBars();
};
req.send();
