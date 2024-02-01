// URL Variable
let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// Request Variable
let req = new XMLHttpRequest();

// Data Variable
let data;
let values = [];

// Bar Chart Variables
let xScale;
let xAxisScale;

let yScale;
let yAxisScale;

let width = 800;
let height = 600;
let padding = 50;

// SVG Variable
let svg = d3.select("svg");

// Draw Chart
let drawChart = () => {
	svg.attr("width", width);
	svg.attr("height", height);
};

// Draw Scales
let drawScales = () => {
	yScale = d3
		.scaleLinear()
		.domain([
			0,
			d3.max(values, (item) => {
				return item[1];
			}),
		])
		.range([0, height - 2 * padding]);

	xScale = d3
		.scaleLinear()
		.domain([0, values.length - 1])
		.range([padding, width - padding]);

	let datesArray = values.map((item) => {
		return new Date(item[0]);
	});

	xAxisScale = d3
		.scaleTime()
		.domain([d3.min(datesArray), d3.max(datesArray)])
		.range([padding, width - padding]);

	yAxisScale = d3
		.scaleLinear()
		.domain([
			0,
			d3.max(values, (item) => {
				return item[1];
			}),
		])
		.range([height - padding, padding]);
};

// Draw Bars
let drawBars = () => {
	let tooltip = d3.select("body").append("div").attr("id", "tooltip").style("visibility", "hidden").style("width", "auto").style("height", "auto");

	svg
		.selectAll("rect")
		.data(values)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("width", (width - 2 * padding) / values.length)
		.attr("data-date", (item) => {
			return item[0];
		})
		.attr("data-gdp", (item) => {
			return item[1];
		})
		.attr("height", (item) => {
			return yScale(item[1]);
		})
		.attr("x", (item, index) => {
			return xScale(index);
		})
		.attr("y", (item) => {
			return height - padding - yScale(item[1]);
		})
		.on("mouseover", (item) => {
			tooltip.transition().style("visibility", "visible");

			tooltip.text(item[0]);

			document.querySelector("#tooltip").setAttribute("data-date", item[0]);
		})
		.on("mouseout", (item) => {
			tooltip.transition().style("visibility", "hidden");
		});
};

// Draw Axes
let drawAxes = () => {
	let xAxis = d3.axisBottom(xAxisScale);
	let yAxis = d3.axisLeft(yAxisScale);

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

// Fetch JSON Data
req.open("GET", url, true);

req.onload = () => {
	data = JSON.parse(req.responseText);
	values = data.data;
	console.log(values);
	drawChart();
	drawScales();
	drawBars();
	drawAxes();
};

req.send();
