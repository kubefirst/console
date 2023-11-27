export enum FeatureFlag {
  PROVISION_DO_PYHS_CLUSTERS = 'canProvisionDOPhysicalClusters',
  PROVISION_VULTR_PYHS_CLUSTERS = 'canProvisionVultrPhysicalClusters',
  PROVISION_GCP_PYHS_CLUSTERS = 'canProvisionGCPPhysicalClusters',
  PROVISION_AWS_PYHS_CLUSTERS = 'canProvisionAWSPhysicalClusters',
  MULTICLUSTER_MANAGEMENT = 'multicluster-management',
  GITOPS_CATALOG = 'gitops-catalog',
  CLUSTER_PROVISIONING = 'cluster-provisioning',
  CLUSTER_MANAGEMENT = 'cluster-managament',
  MARKETPLACE = 'marketplace',
}

export interface EnvironmentVariables {
  disableAuth?: boolean;
  disableTelemetry?: boolean;
  isClusterZero: boolean;
  kubefirstVersion?: string;
  installMethod?: string;
}

export enum ClusterManagementTab {
  GRAPH_VIEW = 0,
  LIST_VIEW = 1,
}
