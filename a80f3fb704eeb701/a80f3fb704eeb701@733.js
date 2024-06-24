import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Choropleth</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Choropleth

Unemployment rate by U.S. county, August 2016. Data: [Bureau of Labor Statistics](http://www.bls.gov/lau/#tables).`
)}

function _chart(d3,data,topojson,us,Legend)
{
  const color = d3.scaleQuantize([1, 10], d3.schemeBlues[9]);
  const path = d3.geoPath();
  const format = d => `${d}%`;
  const valuemap = new Map(data.map(d => [d.id, d.rate]));

  // The counties feature collection is all U.S. counties, each with a
  // five-digit FIPS identifier. The statemap lets us lookup the name of 
  // the state that contains a given county; a state’s two-digit identifier
  // corresponds to the first two digits of its counties’ identifiers.
  const counties = topojson.feature(us, us.objects.counties);
  const states = topojson.feature(us, us.objects.states);
  const statemap = new Map(states.features.map(d => [d.id, d]));

  // The statemesh is just the internal borders between states, i.e.,
  // everything but the coastlines and country borders. This avoids an
  // additional stroke on the perimeter of the map, which would otherwise
  // mask intricate features such as islands and inlets. (Try removing
  // the last argument to topojson.mesh below to see the effect.)
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);

  const svg = d3.create("svg")
      .attr("width", 975)
      .attr("height", 610)
      .attr("viewBox", [0, 0, 975, 610])
      .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
      .attr("transform", "translate(610,20)")
      .append(() => Legend(color, {title: "Unemployment rate (%)", width: 260}));

  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .join("path")
      .attr("fill", d => color(valuemap.get(d.id)))
      .attr("d", path)
    .append("title")
      .text(d => `${d.properties.name}, ${statemap.get(d.id.slice(0, 2)).properties.name}\n${valuemap.get(d.id)}%`);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  return svg.node();
}


function _3(md){return(
md`We don’t use automatic type inference (\`{typed: true}\`) as that would coerce the FIPS identifiers to numbers, which then wouldn’t match the identifiers in our GeoJSON. However, we still want to coerce the *rate* values to numbers, so we do that explicitly.`
)}

async function _data(FileAttachment){return(
(await FileAttachment("unemployment-x.csv").csv()).map((d) => (d.rate = +d.rate, d))
)}

function _us(FileAttachment){return(
FileAttachment("counties-albers-10m.json").json()
)}

function _7(md){return(
md`Alternatively, use [Observable Plot](https://observablehq.com/plot)’s concise API to create [maps](https://observablehq.com/@observablehq/plot-mapping) with the [geo mark](https://observablehq.com/plot/marks/geo). See our [complete example](https://observablehq.com/@observablehq/plot-choropleth), augmented with interactive tips.`
)}

function _8(Plot,topojson,us,data){return(
Plot.plot({
  projection: "identity",
  width: 975,
  height: 610,
  color: {scheme: "Blues", type: "quantize", n: 9, domain: [1, 10], label: "Unemployment rate (%)", legend: true},
  marks: [
    Plot.geo(topojson.feature(us, us.objects.counties), {fill: (map => d => map.get(d.id))(new Map(data.map(d => [d.id, d.rate])))}),
    Plot.geo(topojson.mesh(us, us.objects.states, (a, b) => a !== b), {stroke: "white"})
 ]
})
)};

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["counties-albers-10m.json", {url: new URL("./files/6b1776f5a0a0e76e6428805c0074a8f262e3f34b1b50944da27903e014b409958dc29b03a1c9cc331949d6a2a404c19dfd0d9d36d9c32274e6ffbc07c11350ee.json", import.meta.url), mimeType: "application/json", toString}],
    ["unemployment-x.csv", {url: new URL("./files/8a6057f29caa4e010854bfc31984511e074ff9042ec2a99f30924984821414fbaeb75e59654e9303db359dfa0c1052534691dac86017c4c2f992d23b874f9b6e.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","data","topojson","us","Legend"], _chart);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("us")).define("us", ["FileAttachment"], _us);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["Plot","topojson","us","data"], _8);
  return main;
}
