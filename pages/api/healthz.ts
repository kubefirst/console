// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { sendTelemetry } from '../../services/telemetry';

type Data = {
  success: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    sendTelemetry('kubefirst.console.healthz');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: sending segment event');
  }

  res.status(200).json({ success: true });
}
