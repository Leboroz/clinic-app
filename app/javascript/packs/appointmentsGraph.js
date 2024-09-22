import * as d3 from "d3"


// TODO: make graph start and end in weekController start and end properties.
// TODO: Fix graph with so it fits the parent node.


document.addEventListener('DOMContentLoaded', () => {
  function getWeekNumber() {
    // Create a new Date object if one isn't provided
    const date = new Date();

    // Calculate the first day of the year
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);

    // Calculate the number of days between the first day of the year and the current date
    const daysSinceFirstDay = Math.floor((date - firstDayOfYear) / 86400000);

    // Calculate the week number based on the number of days since the first day of the year
    const weekNumber = Math.ceil((daysSinceFirstDay + firstDayOfYear.getDay() + 1) / 7);

    return weekNumber;
  }

  function getWeekStartAndEndDates(weekValue) {
    // Create a Date object for the first day of the year
    const year = weekValue.substring(0, 4)
    const weekNumber = weekValue.substring(6)
    const firstDayOfYear = new Date(year, 0, 1);

    // Calculate the milliseconds in a week
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;

    // Calculate the milliseconds to the start of the specified week
    const millisecondsToWeekStart = (weekNumber - 1) * millisecondsInWeek;

    // Add the milliseconds to the first day of the year to get the week start date
    const weekStartDate = new Date(firstDayOfYear.getTime() + millisecondsToWeekStart);

    // Add 6 days to the week start date to get the week end date
    const weekEndDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);

    return {
      start: weekStartDate,
      end: weekEndDate
    };
  }

  const weekControl = document.querySelector('#appointment-week')
  if (weekControl) {
    weekControl.value = new Date().getFullYear() + '-W' + getWeekNumber();
  }


  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


  // append the svg object to the body of the page
  var svg = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // When reading the csv, I must format variables:
  function formatDate(d) {
    return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.total_count }
  }

  // Now I can use this dataset:
  function createChart(data) {
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, Math.max(d3.max(data, function(d) { return +d.value; }), 10)])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("data-xvalue", d => d.date)
      .attr("data-yvalue", d => d.value)
      .attr('cy', (d) => y(d.value))
      .attr('cx', (d) => x(d.date))
      .attr('r', 3)
      .style('fill', 'steelblue')

  }

  fetch('/data.json')
    .then(res => res.json())
    .then(json => createChart(json.map(d => formatDate(d))));
});
