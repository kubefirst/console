import Analytics from 'analytics-node';

import { ANALYTICS_ID } from '../enums/telemetry';

import { sendTelemetry } from './telemetry';

jest.mock('analytics-node');
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>;

describe('telemetry', () => {
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test('should not send telemetry call when USE_TELEMETRY is false', () => {
    process.env.USE_TELEMETRY = 'false';

    sendTelemetry('event1');

    expect(mockAnalytics).toBeCalledWith(ANALYTICS_ID, { enable: false });
    expect(mockAnalytics.mock.instances[0].identify).not.toHaveBeenCalled();

    expect(mockAnalytics.mock.instances[0].track).not.toHaveBeenCalled();
  });

  test('should send telemetry call when USE_TELEMETRY is true', () => {
    process.env.USE_TELEMETRY = 'true';

    sendTelemetry('event1');

    expect(mockAnalytics).toBeCalledWith(ANALYTICS_ID, { enable: true });
    expect(mockAnalytics.mock.instances[1].identify).toHaveBeenCalled();

    expect(mockAnalytics.mock.instances[1].track).toHaveBeenCalled();
  });
});
