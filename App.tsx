import React, { useState, useEffect } from 'react';
import { sendMessageToNihil } from './services/geminiService';
import Terminal from './components/Terminal';
import MetricsPanel from './components/MetricsPanel';
import VoidMap from './components/VoidMap';
import MatrixSelector from './components/MatrixSelector';
import { Message, Metrics, MatrixType, GraphData, MoveType, GraphNode, GraphLink } from './types';
import { INITIAL_GRAPH_DATA, DEFAULT_METRICS, INITIAL_WELCOME_MESSAGE } from './constants';
import { Plus, GitBranch } from 'lucide-react';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [metrics, setMetrics] = useState<Metrics>(DEFAULT_METRICS);
  const [activeMatrix, setActiveMatrix] = useState<MatrixType>(MatrixType.PHENOM_CARTOGRAPHY);
  const [isProcessing, setIsProcessing] = useState(false);
  const [graphData, setGraphData] = useState<GraphData>(INITIAL_GRAPH_DATA);

  // Initialize
  useEffect(() => {
    setMessages([{
      id: 'init',
      role: 'assistant',
      content: INITIAL_WELCOME_MESSAGE,
      timestamp: Date.now()
    }]);
  }, []);

  const handleSendMessage = async (text: string) => {
    // 1. Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    // 2. Call Gemini
    const response = await sendMessageToNihil(messages.concat(userMsg), text);

    // 3. Process Response
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.text,
      timestamp: Date.now(),
      structuredData: {
        moves: response.moves || [],
        metrics: response.metrics || DEFAULT_METRICS,
        activeMatrix: response.activeMatrix as MatrixType || MatrixType.PHENOM_CARTOGRAPHY
      }
    };

    // 4. Update State
    setMessages(prev => [...prev, aiMsg]);
    if (response.metrics) setMetrics(response.metrics);
    if (response.activeMatrix) setActiveMatrix(response.activeMatrix as MatrixType);
    
    // 5. Dynamic Graph Densification Logic
    if (response.moves && response.moves.length > 0) {
        updateGraphFromMoves(response.moves);
    }

    setIsProcessing(false);
  };

  const updateGraphFromMoves = (moves: any[]) => {
    const newNodes: GraphNode[] = [];
    const newLinks: GraphLink[] = [];
    const existingNodeIds = new Set(graphData.nodes.map(n => n.id));

    moves.forEach(move => {
      // Check for concept generation moves
      if (move.type === MoveType.DEFINE || move.type === MoveType.PROPOSE || move.type === MoveType.IDP_FRACTURE) {
        // Clean text to serve as ID (max length 20, remove special chars if needed)
        const conceptName = move.text.slice(0, 25).trim();
        
        // Only add if it doesn't exist
        if (!existingNodeIds.has(conceptName) && conceptName.length > 2) {
            
            // Create New Node
            const newNode: GraphNode = {
              id: conceptName,
              group: 6, // New dynamic group
              val: 12,
              type: move.type // Track origin
            };
            newNodes.push(newNode);
            existingNodeIds.add(conceptName);

            // Create Link to Context
            // Prefer linking to "The Void" or "Nihiltheism" as anchors, 
            // or randomly to an existing node to simulate organic growth.
            const targetId = graphData.nodes.length > 0 
                ? graphData.nodes[Math.floor(Math.random() * graphData.nodes.length)].id 
                : "The Void";
            
            newLinks.push({
                source: conceptName,
                target: targetId
            });
        }
      }
    });

    if (newNodes.length > 0) {
        setGraphData(prev => ({
            nodes: [...prev.nodes, ...newNodes],
            links: [...prev.links, ...newLinks]
        }));
    }
  };

  const handleGenerateNode = () => {
    handleSendMessage("Generate a new node for the graph based on the current context. Use 'DEFINE' or 'PROPOSE' moves.");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <MatrixSelector activeMatrix={activeMatrix} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 gap-4 bg-gradient-to-br from-[#050509] to-[#0a0a12]">
        
        {/* Top Area: Graph & Chat */}
        <div className="flex-1 flex gap-4 min-h-0">
          
          {/* Chat / Terminal Area */}
          <div className="flex-[3] min-w-0 flex flex-col">
            <Terminal 
              messages={messages} 
              isProcessing={isProcessing} 
              onSendMessage={handleSendMessage} 
            />
          </div>

          {/* Right Panel: Graph & Metrics */}
          <div className="flex-[2] flex flex-col gap-4 min-w-0">
            <div className="flex-1 min-h-0 flex flex-col gap-2">
              <div className="flex-1 min-h-0 relative">
                 <VoidMap data={graphData} width={400} height={300} />
                 
                 {/* Generation Button */}
                 <button 
                    onClick={handleGenerateNode}
                    disabled={isProcessing}
                    className="absolute bottom-4 left-4 flex items-center gap-2 bg-purple-900/40 hover:bg-purple-800/60 border border-cyan-500/30 text-cyan-400 text-[10px] px-3 py-2 rounded uppercase tracking-wider transition-all backdrop-blur-sm z-20 group"
                 >
                    <Plus size={12} className="group-hover:rotate-90 transition-transform" />
                    <span>Densify Graph</span>
                    <GitBranch size={12} className="opacity-50" />
                 </button>
              </div>
            </div>
            <div className="flex-none">
              <MetricsPanel metrics={metrics} />
            </div>
          </div>

        </div>

        {/* Footer / Status Bar */}
        <div className="h-6 flex items-center justify-between text-[10px] text-gray-500 font-mono border-t border-purple-900/30 pt-2">
          <div>ZENITH ENGINE v1.0 // CONNECTED</div>
          <div>PROTOCOL: ITERATIVE DENSIFICATION // STATUS: ACTIVE</div>
          <div className="flex items-center gap-4">
             <div className="text-cyan-600">ID: PROF_NIHIL</div>
             <div className="text-purple-600">NODES: {graphData.nodes.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
