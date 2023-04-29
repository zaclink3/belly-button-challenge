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
});

})