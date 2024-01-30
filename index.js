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
let margin = 50;

// SVG
let svg = d3.select("svg");

// Draw Bar Chart
let drawBarChart = () => {
	svg.attr("width", width);
	svg.attr("height", height);
};

let drawAxes = () => {};

let drawScales = () => {};

let drawBars = () => {};

// Fetching JSON data
req.open("GET", url, true);
req.onload = () => {
	data = JSON.parse(req.responseText);
	values = data.data;
	console.log(values);
	drawBarChart();
	drawAxes();
	drawScales();
	drawBars();
};
req.send();
