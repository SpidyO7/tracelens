import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Network } from 'lucide-react';

// Customizing nodes to match premium SaaS aesthetic
const nodeBaseStyle = {
  padding: '12px 24px',
  borderRadius: '12px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: '600',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
};

const initialNodes = [
  { 
    id: '1', 
    position: { x: 400, y: 50 }, 
    data: { label: 'alexmorgan-dev' }, 
    style: { 
      ...nodeBaseStyle, 
      background: 'linear-gradient(135deg, rgba(30,27,75,0.9), rgba(15,23,42,0.9))', 
      color: '#e2e8f0', 
      border: '1px solid rgba(139, 92, 246, 0.5)',
      boxShadow: '0 0 25px rgba(139, 92, 246, 0.3)',
      backdropFilter: 'blur(8px)',
      padding: '16px 32px',
      fontSize: '16px'
    } 
  },
  
  // Projects
  { id: '2', position: { x: 150, y: 180 }, data: { label: 'SmartCampus' }, style: { ...nodeBaseStyle, background: 'rgba(15, 23, 42, 0.8)', color: '#94a3b8', border: '1px solid rgba(51, 65, 85, 0.8)' } },
  { id: '3', position: { x: 400, y: 180 }, data: { label: 'TaskFlow' }, style: { ...nodeBaseStyle, background: 'rgba(15, 23, 42, 0.8)', color: '#94a3b8', border: '1px solid rgba(51, 65, 85, 0.8)' } },
  { id: '4', position: { x: 650, y: 180 }, data: { label: 'WeatherAPI' }, style: { ...nodeBaseStyle, background: 'rgba(15, 23, 42, 0.8)', color: '#94a3b8', border: '1px solid rgba(51, 65, 85, 0.8)' } },
  
  // Techs
  { id: '5', position: { x: 50, y: 320 }, data: { label: 'Java' }, style: { ...nodeBaseStyle, background: 'rgba(139, 92, 246, 0.15)', color: '#c4b5fd', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px' } },
  { id: '6', position: { x: 180, y: 320 }, data: { label: 'Spring Boot' }, style: { ...nodeBaseStyle, background: 'rgba(139, 92, 246, 0.15)', color: '#c4b5fd', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px' } },
  { id: '7', position: { x: 310, y: 320 }, data: { label: 'PostgreSQL' }, style: { ...nodeBaseStyle, background: 'rgba(56, 189, 248, 0.15)', color: '#7dd3fc', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px' } },
  
  { id: '8', position: { x: 440, y: 320 }, data: { label: 'React' }, style: { ...nodeBaseStyle, background: 'rgba(20, 184, 166, 0.15)', color: '#5eead4', border: '1px solid rgba(20, 184, 166, 0.3)', borderRadius: '24px' } },
  { id: '9', position: { x: 570, y: 320 }, data: { label: 'Node.js' }, style: { ...nodeBaseStyle, background: 'rgba(34, 197, 94, 0.15)', color: '#86efac', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '24px' } },
  
  { id: '10', position: { x: 700, y: 320 }, data: { label: 'Python' }, style: { ...nodeBaseStyle, background: 'rgba(236, 72, 153, 0.15)', color: '#f9a8d4', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '24px' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#64748b', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#64748b', strokeWidth: 2 } },
  { id: 'e1-4', source: '1', target: '4', animated: true, style: { stroke: '#64748b', strokeWidth: 2 } },
  
  { id: 'e2-5', source: '2', target: '5', style: { stroke: '#334155', strokeWidth: 2 } },
  { id: 'e2-6', source: '2', target: '6', style: { stroke: '#334155', strokeWidth: 2 } },
  { id: 'e2-7', source: '2', target: '7', style: { stroke: '#334155', strokeWidth: 2 } },
  
  { id: 'e3-8', source: '3', target: '8', style: { stroke: '#334155', strokeWidth: 2 } },
  { id: 'e3-9', source: '3', target: '9', style: { stroke: '#334155', strokeWidth: 2 } },
  
  { id: 'e4-10', source: '4', target: '10', style: { stroke: '#334155', strokeWidth: 2 } },
];

export default function GraphView() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-full flex flex-col relative animate-fade-in">
      {/* Overlay Header */}
      <header className="absolute top-0 left-0 right-0 p-6 z-10 pointer-events-none">
        <div className="glass-card max-w-sm p-4 rounded-xl pointer-events-auto">
          <h1 className="text-xl font-bold mb-1 flex items-center text-slate-100">
            <Network className="w-5 h-5 mr-2 text-purple-400" />
            Relationship Graph
          </h1>
          <p className="text-slate-400 text-sm">Visualizing structural connections between the profile, active projects, and dependencies.</p>
        </div>
      </header>
      
      <div className="flex-1 w-full bg-slate-950">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          colorMode="dark"
        >
          <Controls className="bg-slate-900 border-slate-800 fill-slate-300 shadow-xl rounded-lg overflow-hidden" />
          <MiniMap 
            nodeStrokeColor="#8b5cf6" 
            nodeColor="rgba(30, 41, 59, 0.8)" 
            maskColor="rgba(2, 6, 23, 0.8)" 
            className="bg-slate-900 border border-slate-800 rounded-lg shadow-xl"
          />
          <Background color="rgba(71, 85, 105, 0.2)" gap={24} size={2} />
        </ReactFlow>
      </div>
    </div>
  );
}
