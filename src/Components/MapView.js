import React, { Component } from "react";
import * as d3 from "d3";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [
        {
          R: 34.8,
          r: 0.38,
          speed: -1.6,
          phi0: 35,
          moons: [
            // mercury
          ]
        },
        {
          R: 60.9,
          r: 0.95,
          speed: -1.17,
          phi0: 185,
          moons: [
            // venus
          ]
        },
        {
          R: 87,
          r: 1,
          speed: -1.0,
          phi0: 135,
          moons: [
            // earth
            { R: 10, r: 0.17, speed: -13.2, phi0: 15 } // the moon
          ]
        },
        {
          R: 132.6,
          r: 0.53,
          speed: -0.8,
          phi0: 235,
          moons: [
            // mars
            { R: 6, r: 0.0017, speed: -3.8, phi0: 15 }, // phobos
            { R: 9, r: 0.00098, speed: -2.8, phi0: 115 } // deimos
          ]
        },
        {
          R: 452.4,
          r: 11.2,
          speed: -0.43,
          phi0: 135,
          moons: [
            // jupiter
            { R: 30, r: 0.29, speed: -7.7, phi0: 25 }, // io
            { R: 36, r: 0.25, speed: -2.45, phi0: 95 }, // europa
            { R: 49, r: 0.41, speed: -1.1, phi0: 125 }, // ganymede
            { R: 79, r: 0.38, speed: -0.5, phi0: 315 } // callisto
          ]
        },
        {
          R: 835.2,
          r: 9.45,
          speed: -0.32,
          phi0: 260,
          moons: [
            // saturn
            { R: 28, r: 0.031, speed: -4.1, phi0: 120 }, // mimas
            { R: 33, r: 0.04, speed: -3.9, phi0: 20 }, // enceladus
            { R: 38, r: 0.083, speed: -3.6, phi0: 0 }, // tethys
            { R: 44, r: 0.089, speed: -3.2, phi0: 100 }, // dione
            { R: 58, r: 0.121, speed: -2.9, phi0: 300 }, // rhea
            { R: 98, r: 0.404, speed: -1.3, phi0: 180 }, // titan
            { R: 188, r: 0.117, speed: -0.1, phi0: 10 }, // iapetus
            { R: 200, r: 0.017, speed: -0.05, phi0: 10 } // phoebe
          ]
        },
        {
          R: 1670.4,
          r: 4.01,
          speed: -0.23,
          phi0: 180,
          moons: [
            // Uranus
            { R: 10, r: 0.091, speed: -0.18, phi0: 20 }, //Ariel
            { R: 23, r: 0.124, speed: -0.12, phi0: 10 }, // titania
            { R: 30, r: 0.121, speed: -0.1, phi0: 100 } //Oberon
          ]
        },
        {
          R: 2618.7,
          r: 3.88,
          speed: -0.18,
          phi0: 25,
          moons: [
            // Neptune
            { R: 30, r: 0.215, speed: -0.147, phi0: 10 } //Triton
          ]
        },
        { R: 3436.5, r: 0.19, speed: -0.16, phi0: 10, moons: [] } // Pluto
      ]
    };
  }

  componentDidMount() {
    this.solarSystem(this.state.planets);
  }

  solarSystem = planets => {
    // establish variables
    var w = "100%";
    var h = "100vh";
    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2;
    var t0 = new Date().setHours(0, 0, 0, 0);
    var delta = Date.now() - t0;
    // let s = 0.1;

    // insert svg element
    let svgCanvas = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "universe");

    // sun
    svgCanvas
      .append("circle")
      .attr("r", 11)
      .attr("cx", x)
      .attr("cy", y)
      .attr("fill", "yellow")
      .attr("id", "sun");

    // planet group
    let container = svgCanvas
      .append("g")
      .attr("id", "orbit_container")
      .attr("transform", "translate(" + x + "," + y + ")")
      .attr("fill", "transparent");

    // draw planets and moon clusters
    container
      .selectAll("g.planet")
      .data(planets)
      .enter()
      .append("g")
      .attr("class", "planet_cluster")
      .each(function(d, i) {
        d3.select(this)
          .append("circle")
          .attr("class", "orbit")
          .attr("r", d.R);
        d3.select(this)
          .append("circle")
          .attr("r", d.r)
          .attr("cx", d.R)
          .attr("fill", "white")
          .attr("cy", 0)
          .attr("class", "planet");
        d3.select(this)
          .append("g")
          .attr("transform", "translate(" + d.R + ",0)")
          .selectAll("g.moon")
          .data(d.moons)
          .enter()
          .append("g")
          .attr("class", "moon_cluster")
          .each(function(d, i) {
            d3.select(this)
              .append("circle")
              .attr("class", "orbit")
              .attr("r", d.R);
            d3.select(this)
              .append("circle")
              .attr("r", d.r)
              .attr("cx", d.R)
              .attr("fill", "white")
              .attr("cy", 0)
              .attr("class", "moon");
          })
          .attr("transform", function(d) {
            return "rotate(" + (d.phi0 + delta * (d.speed / 100)) + ")";
          });
      })
      .attr("transform", function(d) {
        return "rotate(" + (d.phi0 + delta * (d.speed / 100)) + ")";
      });

    // throttled rotation animations
    setInterval(function() {
      var delta = Date.now() - t0;
      svgCanvas
        .selectAll(".planet_cluster, .moon_cluster")
        .attr("transform", function(d) {
          return "rotate(" + (d.phi0 + delta * (d.speed / 100)) + ")";
        });
    }, 40);
  };

  render() {
    return <div ref="canvas"></div>;
  }
}
export default MapView;
