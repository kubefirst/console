import Dashboard from 'containers/dashboard/index';
import React, { FunctionComponent } from 'react';

export interface DashboardPageProps {
  children: FunctionComponent;
}

const DashboardPage: FunctionComponent<DashboardPageProps> = () => <Dashboard />;

export default DashboardPage;
