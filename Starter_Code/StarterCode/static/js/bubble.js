// // Fetch the JSON data
// d3.json(url).then(function(data) {
  
    // // Select the dropdown menu
    // var dropdownMenu = d3.select("#selDataset");
    
    // // Populate the dropdown menu with all the test subject IDs
    // data.names.forEach(function(name) {
    //   dropdownMenu.append("option").text(name).property("value");
    // });
    
//     // Define the function to create the bubble chart
//     function createBubbleChart(sample) {
      
//       // Filter the data to include only the selected sample
//       var filteredData = data.samples.filter(sampleData => sampleData.id === sample)[0];
      
//       // Define the trace for the bubble chart
//       var trace = {
//         x: filteredData.otu_ids,
//         y: filteredData.sample_values,
//         text: filteredData.otu_labels,
//         mode: "markers",
//         marker: {
//           size: filteredData.sample_values,
//           color: filteredData.otu_ids,
//           colorscale: "Earth"
//         }
//       };
      
//       // Define the layout for the bubble chart
//       var layout = {
//         title: "Bubble Chart",
//         xaxis: {
//           title: "OTU ID"
//         },
//         yaxis: {
//           title: "Sample Value"
//         }
//       };
      
//       // Plot the bubble chart
//       Plotly.newPlot("bubble", [trace], layout);
//     }
    
//     // Define the function to update the bubble chart when a new sample is selected
//     function updateBubbleChart() {
//       var sample = dropdownMenu.property("value");
//       createBubbleChart(sample);
//     }
    
//     // Initialize the bubble chart with the first sample
//     createBubbleChart(data.names[0]);
    
//     // Update the bubble chart when a new sample is selected
//     dropdownMenu.on("change", updateBubbleChart);
    
//   });