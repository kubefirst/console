import React, { FunctionComponent } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';

import 'reactflow/dist/style.css';

export interface ClusterMapProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clusters: Array<any>;
}

const ClusterMap: FunctionComponent<ClusterMapProps> = ({ clusters }) => {
  if (!clusters) {
    return null;
  }

  const nodes = [
    {
      id: '1',
      data: { label: 'Kubefirst' },
      position: { x: 0, y: 0 },
      type: 'input',
    },
    ...clusters.map(({ ClusterName }, index) => ({
      id: ClusterName,
      data: { label: ClusterName },
      position: { x: index * 100, y: index * 100 },
    })),
  ];

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ClusterMap;
