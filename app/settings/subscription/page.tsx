import React from 'react';
import axios from 'axios';
import sortBy from 'lodash/sortBy';

import Subscription from '@/containers/Subscription/Subscription';
import { Plan } from '@/types/plan';

async function getProductPlans() {
  const { SAAS_API_URL = '' } = process.env;

  const { data } = await axios.get<Array<Plan>>(`${SAAS_API_URL}/api/v1/payment/plans`);

  return sortBy(data, (product) => product && product.metadata && product.metadata['order']);
}

export default async function Page() {
  const plans = await getProductPlans();

  return <Subscription plans={plans} />;
}
