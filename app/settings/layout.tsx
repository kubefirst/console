import React, { PropsWithChildren } from 'react';

import { getEnvVars, getFeatureFlags, validateLicense } from '../lib/common';

import { Layout } from '@/containers/Layout/Layout';

export default async function Page({ children }: PropsWithChildren) {
  const license = await validateLicense();
  const envVariables = await getEnvVars();
  const featureFlags = await getFeatureFlags();

  return (
    <Layout license={license} envVariables={envVariables} featureFlags={featureFlags}>
      {children}
    </Layout>
  );
}
