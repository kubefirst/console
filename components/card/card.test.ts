import { screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';

import Card, { ICardProps } from './index';

import setupComponent from 'tests/setup';

const defaultProps: ICardProps = {
  appName: 'Argo CD',
  tags: [
    {
      value: 'Docs',
      url: faker.internet.url(),
    },
  ],
  links: [faker.internet.url()],
  logo: faker.internet.avatar(),
  hostedZoneName: 'your-company.io',
};

const setup = setupComponent<ICardProps>(Card, defaultProps);

describe('Card', () => {
  test('should render the Card component', async () => {
    await setup();
    expect(screen.queryByTestId('card-component')).toBeInTheDocument();
    expect(screen.queryByText(defaultProps.appName)).toBeInTheDocument();
  });

  test('should transform the domain for metaphor', async () => {
    await setup({
      links: [`https://metaphor-frontend-development.${defaultProps.hostedZoneName}`],
    });
    expect(screen.queryByText('metaphor-frontend-development')).toBeInTheDocument();
  });

  test('should transform the domain for github', async () => {
    await setup({
      links: [`https://github.com/owner/repo`],
    });
    expect(screen.queryByText('owner/repo')).toBeInTheDocument();
  });

  test('should transform the domain for vault', async () => {
    await setup({
      links: [`https://vault.${defaultProps.hostedZoneName}`],
    });
    expect(screen.queryByText(`vault.${defaultProps.hostedZoneName}`)).toBeInTheDocument();
  });

  test('should render wrong url', async () => {
    await setup({
      links: ['wrongURL'],
    });
    expect(screen.queryByText('wrongURL')).toBeInTheDocument();
  });
});