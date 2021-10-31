<template>
	<div>
		<h3>Chart With d3.js</h3>
		<div ref="chartArea"></div>
	</div>
</template>

<script>
import * as d3 from 'd3';
export default {
	name: "Chart",
	data() {
		return {
			info: [
				{Country: "United States", Value: "12394"},
				{Country: "Russia",Value: "6148"},
				{Country: "Germany (FRG)",Value: "1653"},
				{Country: "France",Value: "2162"},
				{Country: "United Kingdom",Value: "1214"},
				{Country: "China",Value: "1131"},
				{Country: "Spain",Value: "814"},
				{Country: "Netherlands",Value: "1167"},
				{Country: "Italy",Value: "660"},
				{Country: "Israel",Value: "1263"}
			]
		}
	},
	mounted() {
		this.retrieveGraph();
	},
	methods: {
		retrieveGraph() {
			let margin = ({top: 30, right: 30, bottom: 70, left: 60});
			let width = 460 - margin.left - margin.right;
			let height = 400 - margin.top - margin.bottom;

			const svg = d3.select(this.$refs.chartArea).
				append("svg").
				attr("width", width + margin.left + margin.right).
				attr("height", height + margin.top + margin.bottom).
				append("g").
				attr("transform", `translate( ${margin.left} , ${margin.top} )`);
			// Add X axis
			const x = d3.scaleBand().
				range([ 0, width ]).
				domain(this.info.map(function(d) { return d.Country; })).
				padding(0.2);
				svg.append("g").
				attr("transform", "translate(0," + height + ")").
				call(d3.axisBottom(x)).
				selectAll("text").
				attr("transform", "translate(-10,0)rotate(-30)").
				style("text-anchor", "end");

			const y = d3.scaleLinear().
				domain([0, 13000]).
				range([ height, 0]);
				svg.append("g").call(d3.axisLeft(y));

			svg.selectAll("mybar").
				data(this.info).
				enter().
				append("rect").
				attr("x", function(d) { return x(d.Country); }).
				attr("y", function(d) { return y(d.Value); }).
				attr("width", x.bandwidth()).
				attr("height", function(d) { return height - y(d.Value); }).
				attr("fill", "#601f79");
		}
	},
}
</script>

<style scoped>

</style>
