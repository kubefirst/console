import { Row } from '../';
import { AdvancedOptions, InstallationType } from '../redux';

export enum ClusterStatus {
  DELETED = 'deleted',
  DELETING = 'deleting',
  ERROR = 'error',
  PROVISIONED = 'provisioned',
  PROVISIONING = 'provisioning',
}

export enum ClusterType {
  MANAGEMENT = 'mgmt',
  WORKLOAD = 'workload-cluster',
  WORKLOAD_V_CLUSTER = 'workload-vcluster',
  DRAFT = 'draft',
}

export enum ClusterCreationStep {
  CONFIG,
  DETAILS,
}

export enum ImageRepository {
  GIT = 'git',
  ECR = 'ecr',
}

export type NewWorkloadClusterConfig = Required<
  Pick<
    WorkloadCluster,
    'clusterName' | 'cloudRegion' | 'instanceSize' | 'nodeCount' | 'environment' | 'type'
  >
> &
  AdvancedOptions;

export interface ClusterRequestProps {
  clusterName?: string;
}

export interface ClusterResponse {
  _id: string;
  creation_timestamp: string;
  status: ClusterStatus;
  in_progress: boolean;
  cluster_name: string;
  cloud_provider: InstallationType;
  cloud_region: string;
  domain_name: string;
  cluster_id: string;
  cluster_type: ClusterType.MANAGEMENT;
  alerts_email: string;
  git_provider: string;
  git_user: string;
  workload_clusters?: {
    cluster_id: string;
    cluster_name: string;
    cluster_type: string;
    cloud_region: string;
    instance_size: string;
    node_count: number;
    environment: string;
    status: ClusterStatus;
  }[];
  git_auth: {
    git_owner?: string;
    git_token?: string;
    git_username?: string;
  };
  vault_auth: {
    kbot_password: string;
  };
  last_condition: string;
  install_tools_check: boolean;
  domain_liveness_check: boolean;
  state_store_creds_check: boolean;
  state_store_create_check: boolean;
  git_init_check: boolean;
  kbot_setup_check: boolean;
  gitops_ready_check: boolean;
  git_terraform_apply_check: boolean;
  gitops_pushed_check: boolean;
  cloud_terraform_apply_check: boolean;
  cluster_secrets_created_check: boolean;
  argocd_install_check: boolean;
  argocd_initialize_check: boolean;
  argocd_create_registry_check: boolean;
  argocd_delete_registry_check: boolean;
  vault_initialized_check: boolean;
  vault_terraform_apply_check: boolean;
  users_terraform_apply_check: boolean;
  cloudflare_auth?: {
    token: string;
  };
  aws_auth?: {
    access_key_id: string;
    secret_access_key: string;
    session_token: string;
  };
  civo_auth?: {
    token: string;
  };
  do_auth?: {
    token: string;
    spaces_key: string;
    spaces_secret: string;
  };
  vultr_auth?: {
    token: string;
  };
}

export interface Cluster {
  id: string;
  adminEmail: string;
  clusterName?: string;
  cloudRegion?: string;
  cloudProvider?: InstallationType;
  creationDate?: string;
  domainName: string;
  environment?: string;
  gitProvider: string;
  instanceSize?: string;
  nodeCount?: number;
  status?: ClusterStatus;
  type: ClusterType;
  gitAuth: {
    gitOwner?: string;
    gitToken?: string;
    gitUser?: string;
  };
}

export interface ManagementCluster extends Cluster, Row {
  status?: ClusterStatus;
  lastErrorCondition: string;
  workloadClusters: WorkloadCluster[];
  vaultAuth: {
    kbotPassword: string;
  };
  checks: {
    install_tools_check: boolean;
    domain_liveness_check: boolean;
    state_store_creds_check: boolean;
    state_store_create_check: boolean;
    git_init_check: boolean;
    kbot_setup_check: boolean;
    gitops_ready_check: boolean;
    git_terraform_apply_check: boolean;
    gitops_pushed_check: boolean;
    cloud_terraform_apply_check: boolean;
    cluster_secrets_created_check: boolean;
    argocd_install_check: boolean;
    argocd_initialize_check: boolean;
    argocd_create_registry_check: boolean;
    argocd_delete_registry_check: boolean;
    vault_initialized_check: boolean;
    vault_terraform_apply_check: boolean;
    users_terraform_apply_check: boolean;
    [key: string]: boolean;
  };
  cloudflare_auth?: {
    token: string;
  };
  aws_auth?: {
    access_key_id: string;
    secret_access_key: string;
    session_token: string;
  };
  civo_auth?: {
    token: string;
  };
  do_auth?: {
    token: string;
    spaces_key: string;
    spaces_secret: string;
  };
  vultr_auth?: {
    token: string;
  };
}

export interface WorkloadCluster extends Cluster {
  environment?: string;
}

export interface ClusterServices {
  name: string;
  default: boolean;
  description: string;
  image: string;
  links: Array<string>;
  status?: string;
}

export interface ClusterQueue {
  clusterName: string;
  id: string;
  status: ClusterStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: any;
}
