import { InstallationType } from '../redux';

export interface AccountAuth {
  [InstallationType.AWS]: {
    access_key_id: string;
    secret_access_key: string;
    session_token: string;
  };
  [InstallationType.CIVO]?: {
    token: string;
  };
  [InstallationType.DIGITAL_OCEAN]?: {
    token: string;
    spaces_key: string;
    spaces_secret: string;
  };
  [InstallationType.VULTR]?: {
    token: string;
  };
  [InstallationType.GOOGLE]?: {
    key_file?: string;
    project_id?: string;
  };
  [InstallationType.LOCAL]: null;
}

export interface CloudAccount {
  id: number;
  name: string;
  isEnabled: boolean;
  type: InstallationType;
  auth?: AccountAuth;
}
