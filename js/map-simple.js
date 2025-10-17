// Simple test version of the map
const width = 800;
const height = 600;

const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Add a test rectangle to see if SVG is working
svg.append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 100)
  .attr("fill", "blue")
  .attr("stroke", "black");

// Add test text
svg.append("text")
  .attr("x", 200)
  .attr("y", 100)
  .style("font-size", "20px")
  .text("Map Test - If you see this, SVG is working");

// Try to load the data
d3.json("data/melbourne_areas.json").then(topoData => {
  console.log("TopoJSON loaded successfully:", topoData);
  
  // Add success message
  svg.append("text")
    .attr("x", 200)
    .attr("y", 150)
    .style("font-size", "16px")
    .style("fill", "green")
    .text("TopoJSON data loaded successfully");
    
}).catch(err => {
  console.error("Error loading TopoJSON:", err);
  
  // Add error message
  svg.append("text")
    .attr("x", 200)
    .attr("y", 150)
    .style("font-size", "16px")
    .style("fill", "red")
    .text("Error loading TopoJSON data");
});

d3.csv("data/rent_income.csv").then(rentData => {
  console.log("CSV loaded successfully:", rentData);
  
  // Add success message
  svg.append("text")
    .attr("x", 200)
    .attr("y", 180)
    .style("font-size", "16px")
    .style("fill", "green")
    .text("CSV data loaded successfully");
    
}).catch(err => {
  console.error("Error loading CSV:", err);
  
  // Add error message
  svg.append("text")
    .attr("x", 200)
    .attr("y", 180)
    .style("font-size", "16px")
    .style("fill", "red")
    .text("Error loading CSV data");
});
