const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// define data variable
var bardata = [
  {
    x: [],
    y: [],
    type: 'bar',
    orientation: 'h',
    hovertext: []
  }
];

// define layout variable
var layout = {
  title: 'Top 10 OTUs Found',
  xaxis: { title: 'Sample Values'},
  yaxis: { title: 'OTU IDs'},
  margin: { t: 50, b: 50, l: 100, r: 50 }
};

// define the plotly plot
Plotly.newPlot('bar', bardata, layout);

// define function to update the plot based on dropdown selection
function updatePlot(selectedSample) {
  // read the data from the samples.json file
  d3.json(url).then(function(data) {
    // find the selected sample
    var selectedSampleData = data.samples.filter(sample => sample.id === selectedSample)[0];
    // get the top 10 OTUs for the selected sample
    var top10OTUs = selectedSampleData.otu_ids.slice(0,10).reverse();
    // get the sample values for the top 10 OTUs
    var top10Values = selectedSampleData.sample_values.slice(0,10).reverse();
    // get the hovertext for the top 10 OTUs
    var top10Labels = selectedSampleData.otu_labels.slice(0,10).reverse();
    
    // update the plot data with the new values and labels
    Plotly.update('bar', {
      x: [top10Values],
      y: [top10OTUs],
      hovertext: [top10Labels]
    });

     // display sample metadata within demographic info
     var sampleMetadata = data.metadata.filter(sample => sample.id === parseInt(selectedSample))[0];
     var demographicInfoPanel = d3.select('#sample-metadata');
     demographicInfoPanel.html('');
     Object.entries(sampleMetadata).forEach(([key, value]) => {
       demographicInfoPanel.append('p').text(`${key}: ${value}`);

  });
});
}

// create the dropdown menu
d3.json(url).then(function(data) {
  var dropdown = d3.select('#selDataset');
  data.names.forEach(function(name) {
    dropdown.append('option').text(name).property('value', name);
  });

  // update the plot with the first sample when the page is loaded
  updatePlot(data.names[0]);
});
  

// add event listener to update the plot when the dropdown selection changes
d3.select('#selDataset').on('change', function() {
  var selectedSample = d3.select('#selDataset').property('value');
  updatePlot(selectedSample);
});

  // Fetch the JSON data
d3.json(url).then(function(data) {

    // Define the function to create the bubble chart
    function createBubbleChart(sample) {
      
        // Filter the data to include only the selected sample
        var filteredData = data.samples.filter(sampleData => sampleData.id === sample)[0];
        
        // Define the trace for the bubble chart
        var trace = {
          x: filteredData.otu_ids,
          y: filteredData.sample_values,
          text: filteredData.otu_labels,
          mode: "markers",
          marker: {
            size: filteredData.sample_values,
            color: filteredData.otu_ids,
            colorscale: "Earth"
          }
        };
        
        // Define the layout for the bubble chart
        var layout = {
          title: "Bubble Chart",
          xaxis: {
            title: "OTU ID"
          },
          yaxis: {
            title: "Sample Value"
          }
        };
        
        // Plot the bubble chart
        Plotly.newPlot("bubble", [trace], layout);
      }
      
      // Define the function to update the bubble chart when a new sample is selected
      function updateBubbleChart() {
        var sample = dropdownMenu.property("value");
        createBubbleChart(sample);
      }
      
      // Initialize the bubble chart with the first sample
      createBubbleChart(data.names[0]);
      
      // Update the bubble chart when a new sample is selected
      dropdownMenu.on("change", updateBubbleChart);
      


// Fetch the JSON data
d3.json(url).then(function(data) {

    // define the plotly gauge chart
    var gaugedata = [  {    domain: { x: [0, 1], y: [0, 1] },
        value: 0, // initialize with a default value
        title: { text: "Scrubs Per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9] },
          steps: [
            { range: [0, 1], color: "#f2f2f2" },
            { range: [1, 2], color: "#e6e6e6" },
            { range: [2, 3], color: "#cccccc" },
            { range: [3, 4], color: "#b3b3b3" },
            { range: [4, 5], color: "#999999" },
            { range: [5, 6], color: "#808080" },
            { range: [6, 7], color: "#666666" },
            { range: [7, 8], color: "#4d4d4d" },
            { range: [8, 9], color: "#333333" }
          ]
        }
      }
    ];
    
    // define the layout for the gauge chart
    var gaugelayout = {
      margin: { t: 50, b: 0, l: 50, r: 50 }
    };
    
    // create the gauge chart
    Plotly.newPlot('gauge', gaugedata, gaugelayout);
    
    // define the function to update the gauge chart with a new sample
    function updateGauge(selectedSample) {
      d3.json(url).then(function(data) {
        var selectedSampleMetadata = data.metadata.filter(metadata => metadata.id == selectedSample)[0];
        var gaugeValue = selectedSampleMetadata ? selectedSampleMetadata.wfreq : 0;
        Plotly.update('gauge', {
          value: gaugeValue,
          title: { text: "Scrubs Per Week (Sample " + selectedSample + ")" }
        });
      });
    }
    
    // update the gauge chart when a new sample is selected from the dropdown
    d3.select('#selDataset').on('change', function() {
      var selectedSample = d3.select('#selDataset').property('value');
      updateGauge(selectedSample);

    })})

})