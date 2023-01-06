import React, { FunctionComponent } from 'react';

import Dashboard from '../containers/dashboard';

export interface DashboardPageProps {
  children: FunctionComponent;
}

const DashboardPage: FunctionComponent<DashboardPageProps> = () => <Dashboard />;

export default DashboardPage;
