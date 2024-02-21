'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
} from 'reactflow';

import { CustomGraphNode } from '../../components/GraphNode/GraphNode';

import { setPresentedClusterName } from './api.slice';

export interface ReactFlowState {
  nodes: CustomGraphNode[];
  edges: Edge[];
}

export const initialState: ReactFlowState = {
  nodes: [],
  edges: [],
};

const reactFlowSlice = createSlice({
  name: 'react-flow',
  initialState,
  reducers: {
    setNodes: (state, { payload }: PayloadAction<CustomGraphNode[]>) => {
      state.nodes = payload;
    },
    addNode: (state, { payload }: PayloadAction<CustomGraphNode>) => {
      state.nodes = [...state.nodes, payload];
    },
    setEdges: (state, { payload }: PayloadAction<Edge[]>) => {
      state.edges = payload;
    },
    addNewEdge: (state, { payload }: PayloadAction<Edge>) => {
      state.edges = addEdge(payload, state.edges);
    },
    onNodesChange: (state, { payload }: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(payload, state.nodes);
    },
    onEdgesChange: (state, { payload }: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(payload, state.edges);
    },
    onConnect: (state, { payload }: PayloadAction<Connection>) => {
      state.edges = addEdge(payload, state.edges);
    },
    selectNodeById: (state, { payload }: PayloadAction<string>) => {
      const selectedNode = state.nodes.find((node) => node.id === payload);
      if (selectedNode) {
        selectedNode.selected = true;
      }
    },
    unSelectNodes: (state) => {
      state.nodes = state.nodes.map((node) => ({ ...node, selected: false }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setPresentedClusterName, (state, { payload }) => {
      if (!payload) {
        state.nodes = state.nodes.map((node) => ({ ...node, selected: false }));
      }
    });
  },
});

export const {
  setNodes,
  addNode,
  setEdges,
  addNewEdge,
  onNodesChange,
  onEdgesChange,
  onConnect,
  selectNodeById,
  unSelectNodes,
} = reactFlowSlice.actions;

export const reactFlowReducer = reactFlowSlice.reducer;
