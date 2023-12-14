import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Test = () => {
  // used to create a mutable object that can persist across renders 
  // without causing the component to re-render when the ref object changes
  const canvasRef = useRef(null);

  useEffect(() => {
    // Specify the dimensions of the chart.
    const width = 800;
    const height = 800;

    // calculates the device pixel ratio
    const dpi = window.devicePixelRatio; 

    // Specify the color scale; schemeCategory10 provides an array of 10 diff colors
    // scaleOrdinal is a scale type used for mapping discrete domain values to a corresponding range of values
    // TLDR: different color for nodes in different groups
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const data = {
      nodes: [
        {id: "Myriel", group: 1},
        {id: "Napoleon", group: 2},
        {id: "Mlle.Baptistine", group: 3},
        {id: "Mme.Magloire", group: 1},
        {id: "Geborand", group: 4},
        {id: "Champtercier", group: 5},
        {id: "Cravatte", group: 6},
        {id: "Count", group: 7},
        {id: "OldMan", group: 8},
      ],
      links: [
        {source: "Napoleon", target: "Myriel", value: 1},
        {source: "Mlle.Baptistine", target: "Myriel", value: 8},
        {source: "Mme.Magloire", target: "Myriel", value: 10},
        {source: "Mme.Magloire", target: "Mlle.Baptistine", value: 6},
        {source: "Geborand", target: "Champtercier", value: 6},
        {source: "Champtercier", target: "Cravatte", value: 6},
        {source: "Cravatte", target: "Count", value: 6},
        {source: "Count", target: "OldMan", value: 6},
        {source: "OldMan", target: "Geborand", value: 6},
      ]
    };

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = data.links.map(d => ({...d})); // LINKS REPRESENTS THE CONNECTIONS BETWEEN NODES
    const nodes = data.nodes.map(d => ({...d})); // NODES REPRESENTS THE ENTITIES IN UR GRAPH

    const simulation = d3.forceSimulation(nodes) // creates new force simulation
            // .force() -> adds a force to simulation
              // force("name", function)
            .force("link", d3.forceLink(links).id(d => d.id)) // links and gives id to nodes
            .force("charge", d3.forceManyBody()) // repels all nodes when dragging a node
            .force("center", d3.forceCenter(width / 2, height / 2)) // centers the graph
            .on("tick", draw); // event listener; updates node positions or visualization
    
    // Create the canvas.
    // const canvas = d3.create("canvas")
    const canvas = d3.select(canvasRef.current) // selects a DOM element
        .attr("width", dpi * width) // set width
        .attr("height", dpi * height) // set height
        .attr("style", `width: ${width}px; max-width: 100%; height: auto;`) // styling
      .node(); // retrieves the underlying DOM node of the canvas created by D3
    
    const context = canvas.getContext("2d"); // gets 2D rendering context
    context.scale(dpi, dpi); // scales the graph; (x, y)

    function draw() {
      /*-------------------LINKS-------------------*/
      context.clearRect(0, 0, width, height); // clears entire canvas
      context.save(); // Save the current drawing state
      context.globalAlpha = 0.6; // transparency for links
      context.strokeStyle = "#999"; // color of links
      context.beginPath(); // Begin a new path for drawing links
      links.forEach(drawLink); // draws all links
      context.stroke(); // renders the line of the links
      context.restore(); // Restore the drawing state to what it was before the context.save()
  
      /*-------------------NODES-------------------*/
      // context.save();
      context.globalAlpha = 1; // transparency for nodes
      nodes.forEach(node => { // iterates nodes
        context.beginPath(); // Begin a new path for drawing each node
        drawNode(node) // Draw the node
        context.fillStyle = color(node.group); // Color of node based on group #
        context.strokeStyle = "#fff"; // #000 gives the circles a black outline
        context.fill(); // renders color onto node
        context.stroke(); // stroke the path for the node
      });
      context.restore(); // Restore the drawing state to what it was before the second context.save()
    }

    console.log(context);

    function drawLink(d) {
      // Move the drawing cursor to (x, y) position
      context.moveTo(d.source.x, d.source.y);

      // Draw a line from the current cursor position to the new point
      context.lineTo(d.target.x, d.target.y);
    }

    function drawNode(d) {
      // Move the drawing cursor to (x, y) position
        // nodes has a weird white line when x is too low
      context.moveTo(d.x + 10, d.y);

      // modifies the circles (nodes)
        // context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
      context.arc(d.x, d.y, 7, 0, 2 * Math.PI);
    }

    d3.select(canvas) // selects the HTML canvas element
      .call(d3.drag() // call is invoking d3.drag() and it returns a drag behavior
        .subject(event => { // subject is used to determine the subject of the drag
          const [px, py] = d3.pointer(event, canvas); // pointer() -> returns pointer's position relative to the canvas
          return d3.least(nodes, ({x, y}) => { // least() -> finds the nearest node closest to the pointer position
            const dist2 = (x - px) ** 2 + (y - py) ** 2;
            if (dist2 < 400) return dist2;
          });
        })
        // the 4 ".on()" functions below are event listeners
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", clicked); // clicks on whole canvas, not nodes

    function clicked(event) {
      if(event.defaultPrevented) return; // if dragging, return
      /*      THIS FUNCTION IS NOT DONE

      // const [px, py] = d3.pointer(event, canvas);

      // Use forceSimulation to find the closest node to the clicked point
      let dist2;
      const nearestNode = d3.least(nodes, ({ x, y }) => {
        dist2 = (x - px) ** 2 + (y - py) ** 2;
        return dist2;
      });

      console.log(nearestNode);
      // Check if the distance to the nearest node is within a certain threshold
      const threshold = 400;
      if (nearestNode && nearestNode.group === 1) {
        // Do something with the clicked node
        console.log("Clicked Node:", nearestNode);

        // Modify the stroke or any other attributes of the clicked node
        d3.select('#Napoleon')
          .style("stroke", "red")  // Set the desired stroke color
          .style("stroke-width", 2); // Set the desired stroke width
      }

      */
    }

    function dragstarted(event) {
      // alphaTarget is the "temperature" of the simulation
        // it gets "hot" when dragging fast and vice versa
          // hot -> nodes move freely; cold -> nodes move slow
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // when the component is unmounted, simulation stops
    return () => {simulation.stop();}
  }, []);

  return (
    <div className='d3-test'>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default D3Test;