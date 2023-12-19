import axios from 'axios';
import { PostHog } from 'posthog-node';

import { License } from '@/types/subscription';
import { EnvironmentVariables, FeatureFlag } from '@/types/config';

const BASE_URL = process.env.NEXTAUTH_URL;

export async function validateLicense() {
  try {
    return (
      await axios.post<License>(`${BASE_URL}/api/proxy?target=ee`, {
        url: `/subscription/validate`,
      })
    ).data;
  } catch (error) {
    // supressing error. license not found
    return {} as License;
  }
}

export async function getFeatureFlags() {
  try {
    const { KUBEFIRST_VERSION = '', POSTHOG_KEY = '' } = process.env;

    const client = new PostHog(POSTHOG_KEY || 'phc_N4K5yJQsiIDBRK3X6rfrZlldK5uf2u1vgvlB82RADKn');
    client.identify({
      distinctId: KUBEFIRST_VERSION,
      properties: {
        version: KUBEFIRST_VERSION,
        flatVersion: parseInt(KUBEFIRST_VERSION.replace('v', '').replaceAll('.', ''), 10),
      },
    });

    return (await client.getAllFlags(KUBEFIRST_VERSION)) as Record<FeatureFlag, boolean>;
  } catch (error) {
    // supressing error to avoid ssr crashes
    // eslint-disable-next-line no-console
    console.log('unable to get feature flags');
    return {} as Record<FeatureFlag, boolean>;
  }
}

export async function getEnvVars() {
  try {
    const {
      API_URL = '',
      CLUSTER_ID = '',
      CLUSTER_TYPE = '',
      DISABLE_AUTH = '',
      DISABLE_TELEMETRY = '',
      INSTALL_METHOD = '',
      IS_CLUSTER_ZERO = '',
      KUBEFIRST_VERSION = '',
      POSTHOG_KEY = '',
      SAAS_URL = '',
    } = process.env;

    return {
      API_URL,
      CLUSTER_ID,
      CLUSTER_TYPE,
      disableAuth: DISABLE_AUTH === 'true',
      disableTelemetry: DISABLE_TELEMETRY === 'true',
      isClusterZero: IS_CLUSTER_ZERO === 'true',
      kubefirstVersion: KUBEFIRST_VERSION,
      installMethod: INSTALL_METHOD,
      saasURL: SAAS_URL,
      POSTHOG_KEY,
    };
  } catch (error) {
    // supressing error to avoid ssr crashes
    // eslint-disable-next-line no-console
    console.log('unable to get environment variables from server');
    return {} as EnvironmentVariables;
  }
}
