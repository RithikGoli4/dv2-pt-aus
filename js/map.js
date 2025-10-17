// Set up SVG
const width = 800;
const height = 600;

const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Load data
Promise.all([
  d3.json("data/melbourne_areas.topojson"),
  d3.csv("data/rent_income.csv")
]).then(([topoData, rentData]) => {

  // Check the object name inside TopoJSON
  // Replace 'YOUR_OBJECT_NAME' with the actual key from topoData.objects
  const objectName = Object.keys(topoData.objects)[0]; 
  const areas = topojson.feature(topoData, topoData.objects[objectName]).features;

  // Projection that fits the map to SVG
  const projection = d3.geoIdentity()
    .reflectY(true)
    .fitSize([width, height], {type: "FeatureCollection", features: areas});

  const path = d3.geoPath().projection(projection);

  // Lookup table for rent
  const rentLookup = {};
  rentData.forEach(d => {
    rentLookup[d.Area] = +d["Median Rent"];
  });

  // Draw map areas (optional, light fill)
  svg.selectAll("path")
    .data(areas)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "#eee")
    .attr("stroke", "#999");

  // Draw circles at centroids, size by median rent
  svg.selectAll("circle")
    .data(areas)
    .enter()
    .append("circle")
    .attr("cx", d => projection(d3.geoCentroid(d))[0])
    .attr("cy", d => projection(d3.geoCentroid(d))[1])
    .attr("r", d => {
      const rent = rentLookup[d.properties.SA2_NAME21];
      return rent ? rent / 50 : 0; // adjust scale as needed
    })
    .attr("fill", "steelblue")
    .attr("opacity", 0.6)
    .attr("stroke", "#333");

}).catch(err => console.error(err));
