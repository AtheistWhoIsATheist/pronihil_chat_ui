import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphData, GraphNode, GraphLink, MoveType } from '../types';

interface VoidMapProps {
  data: GraphData;
  width?: number;
  height?: number;
}

const VoidMap: React.FC<VoidMapProps> = ({ data, width = 600, height = 400 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const getNodeColor = (type?: MoveType) => {
    switch (type) {
      case MoveType.DEFINE: return "#00e5ff"; // Cyan for definitions
      case MoveType.PROPOSE: return "#ff9100"; // Orange for proposals
      case MoveType.IDP_DENSIFY: return "#f50057"; // Pink for densification
      case MoveType.IDP_FRACTURE: return "#d50000"; // Red for fractures
      default: return "#7b1fa2"; // Default Purple
    }
  };

  const getNodeStroke = (type?: MoveType) => {
    if (type === MoveType.DEFINE || type === MoveType.PROPOSE) return "#fff";
    return "#ffffff80";
  };

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    // AXIOM: Bypass strict D3 type definitions which often conflict in mixed environments.
    // We cast d3 to any to ensure runtime execution takes precedence over build-time pedantry.
    const d3Any = d3 as any;

    // 1. Deep clone nodes to avoid mutating props/state directly
    const nodes = data.nodes.map(d => ({ ...d }));

    // 2. Deep clone links and SANITIZE them. 
    // D3 mutates links: 'source' becomes an object reference instead of a string ID.
    const links = data.links.map(d => ({
      ...d,
      source: (typeof d.source === 'object' ? (d.source as any).id : d.source),
      target: (typeof d.target === 'object' ? (d.target as any).id : d.target)
    }));

    const svg = d3Any.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const simulation = d3Any.forceSimulation(nodes)
      .force("link", d3Any.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3Any.forceManyBody().strength(-200))
      .force("center", d3Any.forceCenter(width / 2, height / 2))
      .force("collide", d3Any.forceCollide().radius(20));

    // Links
    const link = svg.append("g")
      .attr("stroke", "#00e5ff")
      .attr("stroke-opacity", 0.4)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1);

    // Nodes
    const node = svg.append("g")
      .attr("stroke-width", 2)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d: any) => d.val)
      .attr("fill", (d: any) => getNodeColor(d.type))
      .attr("stroke", (d: any) => getNodeStroke(d.type))
      .attr("opacity", 0.9)
      .call(drag(simulation));

    // Labels
    const text = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d: any) => d.id)
      .attr("font-size", "10px")
      .attr("fill", "#e0e0e0")
      .attr("dx", 12)
      .attr("dy", 4)
      .style("font-family", "JetBrains Mono");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      text
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3Any.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    // Cleanup simulation on unmount
    return () => {
      simulation.stop();
    };

  }, [data, width, height]);

  return (
    <div className="border border-purple-900/50 bg-black/40 rounded-lg overflow-hidden relative">
        <div className="absolute top-2 left-2 text-xs text-cyan-400 font-bold tracking-widest z-10 bg-black/50 px-2 rounded">
            PHENOM_MAP // DYNAMIC
        </div>
        <div className="absolute bottom-2 right-2 text-[8px] text-gray-500 font-mono z-10 flex flex-col items-end gap-1">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#00e5ff]"></div>DEFINE</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#ff9100]"></div>PROPOSE</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#7b1fa2]"></div>EXISTING</div>
        </div>
      <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-full" />
    </div>
  );
};

export default VoidMap;
