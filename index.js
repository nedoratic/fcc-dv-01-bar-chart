let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

let req = new XMLHttpRequest();

let data;

let values;

let xAxis;
let yAxis;

let xScale;
let yScale;

let width = 1000;
let height = 600;
let margin = 50;

let svg = d3.select("svg");

let drawBarChart = () => {
	svg.attr("width", width);
	svg.attr("height", height);
};

let generateAxes = () => {};

let generateScales = () => {};

let drawBars = () => {};
