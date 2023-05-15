import { FIRE_BRICK } from './colors';

export const VIEW_DETAILS_OPTION = 'View details';
export const DELETE_OPTION = 'Delete cluster';
export const CLUSTER_MENU_OPTIONS = [
  { label: VIEW_DETAILS_OPTION },
  { label: DELETE_OPTION, color: FIRE_BRICK },
];

export const CLUSTER_CHECKS: { [key: string]: { label: string; order: number } } = {
  install_tools_check: { label: 'Installing tools', order: 1 },
  domain_liveness_check: { label: 'Domain liveness check', order: 2 },
  kbot_setup_check: { label: 'Kbot setup', order: 3 },
  git_init_check: { label: 'Initializing git', order: 4 },
  gitops_ready_check: { label: 'Initializing gitops', order: 5 },
  git_terraform_apply_check: { label: 'Git terraform apply', order: 6 },
  gitops_pushed_check: { label: 'Gitops repos pushed', order: 7 },
  cloud_terraform_apply_check: { label: 'Cloud terraform apply', order: 8 },
  cluster_secrets_created_check: { label: 'Creating cluster secrets', order: 9 },
  argocd_install_check: { label: 'Installing argocd', order: 10 },
  argocd_initialize_check: { label: 'Initializing argocd', order: 11 },
  vault_initialized_check: { label: 'Initializing vault', order: 12 },
  vault_terraform_apply_check: { label: 'Vault terraform apply', order: 13 },
  users_terraform_apply_check: { label: 'Users terraform apply', order: 14 },
};
