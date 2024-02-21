import React, { type FunctionComponent, useEffect } from 'react';
import ReactFlow, { NodeTypes, ReactFlowProvider, useReactFlow } from 'reactflow';

import { CustomGraphNode, GraphNode } from '../GraphNode/GraphNode';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  onConnect,
  onEdgesChange,
  onNodesChange,
  selectNodeById,
  setEdges,
  setNodes,
} from '../../redux/slices/reactFlow.slice';
import 'reactflow/dist/style.css';
import { generateNodesConfig } from '../../utils/reactFlow';

import CustomReactFlowControls from './controls';

import { RESERVED_DRAFT_CLUSTER_NAME } from '@/constants';

const nodeTypes: NodeTypes = {
  custom: GraphNode,
};

interface GraphViewProps {
  onNodeClick: (clusterName: string) => void;
}

const GraphView: FunctionComponent<GraphViewProps> = ({ onNodeClick }) => {
  const { nodes, edges } = useAppSelector(({ reactFlow }) => reactFlow);
  const { managementCluster, clusterMap, presentedClusterName } = useAppSelector(({ api }) => api);

  const dispatch = useAppDispatch();

  const { setCenter, fitView, zoomIn, zoomOut } = useReactFlow();

  useEffect(() => {
    if (presentedClusterName) {
      let selectedNode: CustomGraphNode | undefined;
      // with clusterMap being indexed by clusterName
      // if the clusterName is selected by name it will
      // cause the selected styles to cease on change
      // so opting to select cluster by id
      if (presentedClusterName === RESERVED_DRAFT_CLUSTER_NAME) {
        selectedNode = nodes.find((node) => node.id === presentedClusterName);
      } else {
        selectedNode = nodes.find((node) => node.data.clusterName === presentedClusterName);
      }
      if (selectedNode) {
        const { position, width, height, id } = selectedNode;

        dispatch(selectNodeById(id));

        setCenter(position.x + (width ?? 400), position.y + (height ?? 0), {
          zoom: 1.2,
          duration: 500,
        });
      }
    } else {
      window.requestAnimationFrame(() => fitView({ duration: 500, padding: 0.2 }));
    }
  }, [presentedClusterName, nodes, setCenter, fitView, dispatch]);

  useEffect(() => {
    if (managementCluster) {
      const [nodes, edges] = generateNodesConfig(managementCluster, clusterMap);
      dispatch(setNodes(nodes));
      dispatch(setEdges(edges));
    }
  }, [managementCluster, clusterMap, dispatch]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={(changes) => dispatch(onNodesChange(changes))}
      onEdgesChange={(changes) => dispatch(onEdgesChange(changes))}
      onConnect={(connection) => dispatch(onConnect(connection))}
      onNodeClick={(_, node) => onNodeClick(node.data.clusterName)}
      nodeTypes={nodeTypes}
      fitView
    >
      <CustomReactFlowControls
        position="top-left"
        style={{ left: 40, top: -10 }}
        onFitView={() => fitView({ duration: 300, padding: 0.2 })}
        onZoomIn={() => zoomIn({ duration: 300 })}
        onZoomOut={() => zoomOut({ duration: 300 })}
      />
    </ReactFlow>
  );
};

export const Flow: FunctionComponent<GraphViewProps> = (props) => (
  <ReactFlowProvider>
    <GraphView {...props} />
  </ReactFlowProvider>
);
