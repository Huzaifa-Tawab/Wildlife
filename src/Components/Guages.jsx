import React, { Component } from "react";
import Chart from "react-apexcharts";

class EChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [61, 90],
      // yeh values change krni hy yara bss realtime main
      
      options: {
        chart: {
          height: 500,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: "30%",
              background: "transparent",
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              },
            },
          },
        },
        colors: ["#39539E", "#0077B5"],
        labels: ["Temperatue ", "Humidity"],

        legend: {
          show: true,
          floating: true,
          fontSize: "16px",
          position: "left",
          offsetX: 160,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0,
          },
          formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
          },
          itemMargin: {
            vertical: 3,
          },
        },
        responsive: [
          {
            breakpoint: 500,
            options: {
              legend: {
                show: false,
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className="EChart">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="radialBar"
              width="700"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EChart;
