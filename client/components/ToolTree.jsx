import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import masterNode from '../assets/masterNode.png';
import workerNode from '../assets/workerNode.png';
import pod from '../assets/pods.png';
import container from '../assets/containers.png';
import service from '../assets/services.png';

const ToolTree = ({ setToolMetric, clusterData }) => {
  const commonKeysAndValues = (obj1, obj2) => {
    const matchingKeys = Object.keys(obj1).filter((key) =>
      obj2.hasOwnProperty(key)
    );
    for (let i = 0; i < matchingKeys.length; i++) {
      if (obj1[matchingKeys[i]] === obj2[matchingKeys[i]]) {
        return true;
      }
    }
    return false;
  };

  // used to create a mutable object that can persist across renders
  // without causing the component to re-render when the ref object changes
  const canvasRef = useRef(null);

  useEffect(() => {
    // Specify the dimensions of the chart.
    const width = 1400;
    const height = 759;
    // const width = 700;
    // const height = 600;

    // const radius = 15; // radius of circle
    // const radius = 15; // radius of circle
    let imageRadius = 60; // radius of image

    // calculates the device pixel ratio
    const dpi = window.devicePixelRatio;

    /* Specify the color scale; schemeCategory10 provides an array of 10 diff colors
      scaleOrdinal is a scale type used for mapping discrete domain values to a corresponding range of values
    TLDR: different color for nodes in different groups; used for circles */
    // const color = d3.scaleOrdinal(d3.schemeCategory10);
    /* Specify the color scale; schemeCategory10 provides an array of 10 diff colors
      scaleOrdinal is a scale type used for mapping discrete domain values to a corresponding range of values
    TLDR: different color for nodes in different groups; used for circles */
    // const color = d3.scaleOrdinal(d3.schemeCategory10);

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const nodes = clusterData.data.map((d) => ({ ...d })); // NODES REPRESENTS THE ENTITIES IN UR GRAPH
    // const links = data.links.map((d) => ({ ...d })); // LINKS REPRESENTS THE CONNECTIONS BETWEEN NODES
    const links = [];
    for (const ele of nodes) {
      if (ele.kind === 'Node') {
        links.push({ source: ele.name, target: nodes[0].name });
        for (const ele2 of nodes) {
          if (ele2.kind === 'Pod' && ele2.nodeName === ele.name) {
            links.push({ source: ele.name, target: ele2.name });
          }
        }
      } else if (ele.kind === 'Pod') {
        for (const ele2 of nodes) {
          if (ele2.kind === 'Container' && ele2.podName === ele.name) {
            links.push({ source: ele.name, target: ele2.name });
          } else if (
            ele2.kind === 'Service' &&
            commonKeysAndValues(ele.labels, ele2.selector)
          ) {
            links.push({ source: ele.name, target: ele2.name });
          }
        }
      }
    }
    const simulation = d3
      .forceSimulation(nodes) // creates new force simulation
      // .force() -> adds a force to simulation
      // force("name", function)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.name) // links and gives id to nodes
          .distance((d) => {
            if (d.source.kind === 'Pod' && d.target.kind === 'Node') return 175;
            return 125;
          }) // link's length
      )
      .force('charge', d3.forceManyBody().strength(-70).theta(0)) // repels all nodes when dragging a node
      .force('center', d3.forceCenter(width / 2, height / 2)) // centers the graph
      .force('collide', d3.forceCollide().radius(imageRadius + 5))
      .on('tick', draw); // event listener; updates node positions or visualization

    const canvas = d3
      .select(canvasRef.current) // selects a DOM element
      .attr('width', `${dpi * width}px`) // set width
      .attr('height', `${dpi * height}px`) // set height
      .attr('style', 'max-width: 100%; max-height: 100%') // styling
      .node(); // retrieves the underlying DOM node of the canvas created by D3

    const context = canvas.getContext('2d'); // gets 2D rendering context
    context.scale(dpi, dpi); // scales the graph; (x, y)

    function draw() {
      /*-------------------LINKS-------------------*/
      context.clearRect(0, 0, width, height); // clears entire canvas
      context.save(); // Save the current drawing state
      context.globalAlpha = 0.6; // transparency for links
      context.strokeStyle = '#000'; // color of links
      context.beginPath(); // Begin a new path for drawing links
      links.forEach(drawLink); // draws all links

      /*-------------------NODES-------------------*/
      context.globalAlpha = 1; // transparency for nodes

      // nodes.filter(node => node.kind !== 'MasterNode').forEach(drawNode);
      // const specificNode = nodes.find(node => node.kind === 'MasterNode');
      // if (specificNode) drawNode(specificNode);
      nodes.forEach((node) => {
        drawNode(node); // Draw the node
        // context.fillStyle = color(node.group); // Color of node based on group #
        // context.strokeStyle = node.strokeStyle; // #000 gives the circles a black outline
        // context.fill(); // renders color onto node
        // context.stroke(); // stroke the path for the node
      });
      context.restore(); // Restore the drawing state to what it was before the second context.save()
    }

    function drawLink(d) {
      // Move the drawing cursor to (x, y) position
      context.moveTo(d.source.x, d.source.y);

      // Draw a line from the current cursor position to the new point
      context.lineTo(d.target.x, d.target.y);

      context.stroke(); // renders the line of the links
      // context.restore(); // Restore the drawing state to what it was before the context.save()
    }

    function drawNode(d) {
      context.beginPath(); // Begin a new path for drawing each node
      /*-----------------------CIRCLES-----------------------*/
      /* Move the drawing cursor to (x, y) position
         nodes has a weird white line when x is too low */
      // context.moveTo(d.x + 10, d.y);

      /* modifies the circles (nodes)
         context.arc(x, y, radius, startAngle, endAngle, anticlockwise); */
      // context.arc(d.x, d.y, 15, 0, 2 * Math.PI);

      /*-----------------------IMAGE INSTEAD OF CIRCLES-----------------------*/
      context.moveTo(d.x, d.y);
      const img = new Image();
      if (d.kind === 'MasterNode') {
        img.src = masterNode;
        imageRadius = 60;
      } else if (d.kind === 'Node') {
        img.src = workerNode;
        imageRadius = 50;
      } else if (d.kind === 'Pod') {
        img.src = pod;
        imageRadius = 40;
      } else if (d.kind === 'Container') {
        img.src = container;
        imageRadius = 30;
      } else {
        img.src = service;
        imageRadius = 30;
      }
      context.drawImage(
        img,
        d.x - imageRadius,
        d.y - imageRadius,
        2 * imageRadius,
        2 * imageRadius
      );
    }

    const tooltip = d3.select('body').append('div').attr('class', 'tooltip');

    /*------------------------EVENT HANDLER------------------------*/
    d3.select(canvas) // selects the HTML canvas element
      .call(
        d3
          .drag() // call is invoking d3.drag() and it returns a drag behavior
          .subject((event) => {
            // subject is used to determine the subject of the drag
            const [px, py] = d3.pointer(event, canvas); // pointer() -> returns pointer's position relative to the canvas
            let dragRadius;

            return d3.least(nodes, ({ x, y, kind }) => {
              // least() -> finds the nearest node closest to the pointer position
              const dist2 = (x - px) ** 2 + (y - py) ** 2;
              if (kind === 'MasterNode') dragRadius = 3500;
              else if (kind === 'Node') dragRadius = 2450;
              else if (kind === 'Pod') dragRadius = 1600;
              else dragRadius = 880;

              if (dist2 < dragRadius) return dist2;
            });
          })
          // the 5 ".on()" functions below are event listeners
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )
      .on('mousemove', hovered)
      .on('click', clicked); // clicks on whole canvas, not nodes

    function hovered(event) {
      if (event.defaultPrevented) return; // if any other event, return
      const [mouseX, mouseY] = d3.pointer(event);

      let hoveredNode = null;
      nodes.forEach((node) => {
        // d3.bisector(); maybe another way to find closest node
        const distance = Math.sqrt(
          (node.x - mouseX) ** 2 + (node.y - mouseY) ** 2
        );

        if (node.kind === 'MasterNode') imageRadius = 60;
        else if (node.kind === 'Node') imageRadius = 50;
        else if (node.kind === 'Pod') imageRadius = 40;
        else imageRadius = 30;
        if (distance < imageRadius) hoveredNode = node;
      });

      if (hoveredNode) {
        let data;
        if (hoveredNode.kind === 'MasterNode') {
          data = `<p><strong>Kind:</strong> MasterNode</p>`;
        } else if (hoveredNode.kind === 'Node') {
          data =
            `<p><strong>Name:</strong> ${hoveredNode.name}</p>` +
            `<p><strong>Kind:</strong> ${hoveredNode.kind}</p>` +
            `<p><strong>UID:</strong> ${hoveredNode.uid}</p>` +
            `<p><strong>Ready:</strong> ${hoveredNode.conditions.Ready.status}, ${hoveredNode.conditions.Ready.message}</p>`;
        } else if (hoveredNode.kind === 'Pod') {
          data =
            `<p><strong>Name:</strong> ${hoveredNode.name}</p>` +
            `<p><strong>Kind:</strong> ${hoveredNode.kind}</p>` +
            `<p><strong>UID:</strong> ${hoveredNode.uid}</p>` +
            `<p><strong>Status:</strong> ${hoveredNode.status}</p>` +
            `<p><strong>Ready:</strong> ${hoveredNode.conditions.Ready}</p>`;
        } else if (hoveredNode.kind === 'Container') {
          let status;
          if (hoveredNode.started) status = 'Running';
          else status = 'Stopped';

          data =
            `<p><strong>Name:</strong> ${hoveredNode.name}</p>` +
            `<p><strong>Kind:</strong> ${hoveredNode.kind}</p>` +
            `<p><strong>ID:</strong> ${hoveredNode._id}</p>` +
            `<p><strong>Status:</strong> ${status}</p>` +
            `<p><strong>Restart Count:</strong> ${hoveredNode.restartCount}</p>`;
        } else if (hoveredNode.kind === 'Service') {
          data =
            `<p><strong>Name:</strong> ${hoveredNode.name}</p>` +
            `<p><strong>Kind:</strong> ${hoveredNode.kind}</p>` +
            `<p><strong>UID:</strong> ${hoveredNode.uid}</p>` +
            `<p><strong>Type:</strong> ${hoveredNode.type}</p>`;
        }

        tooltip
          .style('display', 'block')
          .style('left', `${event.pageX + 20}px`)
          .style('top', `${event.pageY - 28}px`)
          .html(data);
      } else {
        tooltip.style('display', 'none');
      }
    }

    function clicked(event) {
      if (event.defaultPrevented) return; // if any other event, return

      const [mouseX, mouseY] = d3.pointer(event);

      nodes.forEach((node) => {
        const distance = Math.sqrt(
          (node.x - mouseX) ** 2 + (node.y - mouseY) ** 2
        );

        if (node.kind === 'MasterNode') imageRadius = 60;
        else if (node.kind === 'Node') imageRadius = 50;
        else if (node.kind === 'Pod') imageRadius = 40;
        else imageRadius = 30;

        if (distance < imageRadius) {
          draw();
          setToolMetric(node);
        }
      });
    }

    function dragstarted(event) {
      // alphaTarget is the "temperature" of the simulation
      // it gets "hot" when dragging fast and vice versa
      // hot -> nodes move freely; cold -> nodes move slow
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
      tooltip.style('display', 'none');
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it's no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // when the component is unmounted, simulation stops
    return () => {
      simulation.stop();
    };
  }, [clusterData]);

  return (
    <div className='toolTree'>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ToolTree;
