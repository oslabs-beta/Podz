import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import node from '../assets/nodes.png';
import pod from '../assets/pods.png';
import container from '../assets/containers.png';
import service from '../assets/services.png';

const ToolTree = ({ setToolMetric }) => {
  // used to create a mutable object that can persist across renders
  // without causing the component to re-render when the ref object changes
  const canvasRef = useRef(null);

  useEffect(() => {
    // Specify the dimensions of the chart.
    const width = 1500;
    const height = 809;
    // const width = 700;
    // const height = 600;

    const radius = 15; // radius of circle
    const imageRadius = 30; // radius of image

    // calculates the device pixel ratio
    const dpi = window.devicePixelRatio;

    // Specify the color scale; schemeCategory10 provides an array of 10 diff colors
    // scaleOrdinal is a scale type used for mapping discrete domain values to a corresponding range of values
    // TLDR: different color for nodes in different groups; used for circles
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const data = {
      nodes: [
        {
          kind: 'Node',
          name: 'minikube',
          uid: 'ad65b4a9-cfde-4350-9515-2df538094f0c',
          creationTimestamp: '2023-12-11T19:20:17Z',
          conditions: {
            MemoryPressure: {
              status: 'False',
              message: 'kubelet has sufficient memory available',
            },
            DiskPressure: {
              status: 'False',
              message: 'kubelet has no disk pressure',
            },
            PIDPressure: {
              status: 'False',
              message: 'kubelet has sufficient PID available',
            },
            Ready: {
              status: 'True',
              message: 'kubelet is posting ready status',
            },
          },
        },
        {
          kind: 'Node',
          name: 'minikube-m02',
          uid: '6f77af28-a836-4233-ac2a-d6838330273a',
          creationTimestamp: '2023-12-15T00:26:18Z',
          conditions: {
            MemoryPressure: {
              status: 'False',
              message: 'kubelet has sufficient memory available',
            },
            DiskPressure: {
              status: 'False',
              message: 'kubelet has no disk pressure',
            },
            PIDPressure: {
              status: 'False',
              message: 'kubelet has sufficient PID available',
            },
            Ready: {
              status: 'True',
              message: 'kubelet is posting ready status',
            },
          },
        },
        {
          kind: 'Pod',
          name: 'eds-deployment-5dc4cd95d-96r5s',
          uid: '37516100-4544-423b-a313-b31a54fd057e',
          creationTimestamp: '2023-12-12T16:07:52Z',
          labels: { app: 'eds', pod_template_hash: '5dc4cd95d' },
          containers: [
            {
              name: 'eds',
              image: 'eds:1.0',
              ready: true,
              restartCount: 3,
              started: true,
              startedAt: '2023-12-15T00:22:51Z',
            },
          ],
          nodeName: 'minikube',
          status: 'Running',
          conditions: {
            Initialized: 'True',
            Ready: 'True',
            ContainersReady: 'True',
            PodScheduled: 'True',
          },
        },
        {
          kind: 'Pod',
          name: 'eds2-deployment-b8d8d6867-bjdgb',
          uid: 'a5148397-c608-47db-9c6a-ea4ac9df500f',
          creationTimestamp: '2023-12-12T16:11:31Z',
          labels: { app: 'eds2', pod_template_hash: 'b8d8d6867' },
          containers: [
            {
              name: 'eds2',
              image: 'eds:1.1',
              ready: true,
              restartCount: 3,
              started: true,
              startedAt: '2023-12-15T00:22:51Z',
            },
          ],
          nodeName: 'minikube',
          status: 'Running',
          conditions: {
            Initialized: 'True',
            Ready: 'True',
            ContainersReady: 'True',
            PodScheduled: 'True',
          },
        },
        {
          kind: 'Pod',
          name: 'eds3-deployment-cbd8d6c48-xwlvn',
          uid: '2684a116-8223-4180-b0e7-ec9340fd7da8',
          creationTimestamp: '2023-12-12T16:12:02Z',
          labels: { app: 'eds3', pod_template_hash: 'cbd8d6c48' },
          containers: [
            {
              name: 'eds3',
              image: 'eds:1.2',
              ready: true,
              restartCount: 3,
              started: true,
              startedAt: '2023-12-15T00:22:51Z',
            },
          ],
          nodeName: 'minikube-m02',
          status: 'Running',
          conditions: {
            Initialized: 'True',
            Ready: 'True',
            ContainersReady: 'True',
            PodScheduled: 'True',
          },
        },
        { kind: 'ServiceList', name: 'ay-yo', selector: { app: 'eds' } },
        { kind: 'Container', name: 'sht', labels: { app: 'eds' } },
      ],
    };

    console.log(data);
    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const nodes = data.nodes.map((d) => ({ ...d })); // NODES REPRESENTS THE ENTITIES IN UR GRAPH
    // const links = data.links.map((d) => ({ ...d })); // LINKS REPRESENTS THE CONNECTIONS BETWEEN NODES
    const links = [];
    for (const ele of nodes) {
      if (ele.kind === 'Node') {
        for (const ele2 of nodes) {
          if (ele2.kind === 'Pod' && ele2.nodeName === ele.name) {
            links.push({ source: ele.name, target: ele2.name });
          }
        }
      } else if (ele.kind === 'Pod') {
        for (const ele2 of nodes) {
          if (ele2.kind === 'Container' && ele2.labels.app === ele.labels.app) {
            links.push({ source: ele.name, target: ele2.name });
          } else if (
            ele2.kind === 'ServiceList' &&
            ele2.selector.app === ele.labels.app
          ) {
            links.push({ source: ele.name, target: ele2.name });
          }
        }
      }
      // else if(ele.kind === 'Container'){
      //   for(const ele2 of nodes){
      //     if(ele2.kind === 'ServiceList' && ele2.selector.app === ele.labels.app){
      //       links.push({ source: ele.name, target: ele2.name})
      //     }
      //   }
      // }
    }
    console.log(links);

    const simulation = d3
      .forceSimulation(nodes) // creates new force simulation
      // .force() -> adds a force to simulation
      // force("name", function)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.name) // links and gives id to nodes
          .distance(125) // link's length
      )
      .force('charge', d3.forceManyBody().strength(-15).theta(1)) // repels all nodes when dragging a node
      .force('center', d3.forceCenter(width / 2, height / 2)) // centers the graph
      .on('tick', draw); // event listener; updates node positions or visualization

    const canvas = d3
      .select(canvasRef.current) // selects a DOM element
      .attr('width', `${dpi * width}vh`) // set width
      .attr('height', `${dpi * height}vh`) // set height
      .attr(
        'style',
        'max-width: 100%; max-height: 100%; background-color: #ECECEC; border: 1px solid black'
      ) // styling
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
      nodes.forEach((node) => {
        drawNode(node); // Draw the node
        // context.fillStyle = color(node.group); // Color of node based on group #
        // context.strokeStyle = node.strokeStyle; // #000 gives the circles a black outline
        // context.fill(); // renders color onto node
        // context.stroke(); // stroke the path for the node
      });
      context.restore(); // Restore the drawing state to what it was before the second context.save()
    }

    console.log(context);

    function drawLink(d) {
      // Move the drawing cursor to (x, y) position
      context.moveTo(d.source.x, d.source.y);

      // Draw a line from the current cursor position to the new point
      context.lineTo(d.target.x, d.target.y);

      context.stroke(); // renders the line of the links
      context.restore(); // Restore the drawing state to what it was before the context.save()
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
      context.moveTo(d.x + imageRadius, d.y);
      const img = new Image();
      if (d.kind === 'Node') img.src = node;
      // Replace with the path to your image
      else if (d.kind === 'Pod') img.src = pod;
      else if (d.kind === 'Container') img.src = container;
      else img.src = service;
      context.drawImage(
        img,
        d.x - imageRadius,
        d.y - imageRadius,
        2 * imageRadius,
        2 * imageRadius
      );
    }

    console.log(data.nodes);
    const tooltip = d3.select('body').append('div').attr('class', 'tooltip');

    /*------------------------EVENT HANDLER------------------------*/
    d3.select(canvas) // selects the HTML canvas element
      .call(
        d3
          .drag() // call is invoking d3.drag() and it returns a drag behavior
          .subject((event) => {
            // subject is used to determine the subject of the drag
            const [px, py] = d3.pointer(event, canvas); // pointer() -> returns pointer's position relative to the canvas
            return d3.least(nodes, ({ x, y }) => {
              // least() -> finds the nearest node closest to the pointer position
              const dist2 = (x - px) ** 2 + (y - py) ** 2;
              if (dist2 < 400) return dist2;
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
      console.log('HOVERED');
      const [mouseX, mouseY] = d3.pointer(event);

      let hoveredNode = null;
      nodes.forEach((node) => {
        // d3.bisector(); maybe another way to find closest node
        const distance = Math.sqrt(
          (node.x - mouseX) ** 2 + (node.y - mouseY) ** 2
        );
        if (distance < imageRadius) hoveredNode = node;
      });
      console.log(hoveredNode);

      if (hoveredNode) {
        let data;
        if (hoveredNode.kind === 'Node') {
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
        } else {
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
      console.log('CLICKED');
      const [mouseX, mouseY] = d3.pointer(event);

      nodes.forEach((node) => {
        const distance = Math.sqrt(
          (node.x - mouseX) ** 2 + (node.y - mouseY) ** 2
        );
        if (distance < imageRadius) {
          console.log('Clicked node:', node);
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
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // when the component is unmounted, simulation stops
    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className='toolTree'>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ToolTree;
