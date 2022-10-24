import { GIT_PROVIDERS } from '../enums/utils';
import ArgoCDLogo from '../assets/argocd.webp';
import GitLabLogo from '../assets/gitlab.png';
import GitHubLogo from '../assets/github.png';
import VaultLogo from '../assets/vault.png';
import AtlantisLogo from '../assets/atlantis.png';
import MetaphorLogo from '../assets/metaphor.png';
import theme from '../../src/theme';
// todo 
// todo 1. get the environment variables to display on the UI properly
// todo 2. send IS_LOCAL and render card 2 
// todo 3. on detokenize we can get these values from viper baked into the deployment / application
// todo 4. a card that only displays on IS_LOCAL


const {
  colors: { bleachedSilk, greenJelly, white },
} = theme;

export type CardsContentProps = {
  gitProvider: string;
  gitHost: string;
  gitOwner: string;
  hostedZoneName: string;
};

export const buildCardsContent = ({
  gitProvider,
  gitHost,
  gitOwner,
  hostedZoneName,
}: CardsContentProps) => {
  const atlantisUrl = hostedZoneName == "" ? `https://atlantis.${hostedZoneName}`: `http://localhost:4141`;
  const argoUrl = hostedZoneName == "" ? `http://localhost:8080`:  `https://argocd.${hostedZoneName}/auth/login?return_url=${encodeURIComponent(
    `https://argocd.${hostedZoneName}/applications`,
  )}`;
  const argoWorkflowsUrl = hostedZoneName == "" ? `http://localhost:2746`:  `https://argo.${hostedZoneName}`;
  const vaultUrl = hostedZoneName == "" ? `http://localhost:8200`:  `https://vault.${hostedZoneName}`;

  let {  ARGO_WORKFLOWS_URL, VAULT_URL, ARGO_CD_URL, MINIO_URL, MINIO_CONOSLE_URL } = process.env
  console.log(ARGO_WORKFLOWS_URL)

  const gitTile =
    gitProvider === GIT_PROVIDERS.GITHUB
      ? {
          appName: 'GitHub',
          companyName: 'GitHub',
          tags: [
            {
              value: 'Docs',
              url: 'https://docs.kubefirst.io/kubefirst/github/github-repositories.html',
              backgroundColor: bleachedSilk,
            },
            {
              value: 'Argo CD',
              url: `${argoUrl}/actions-runner-components`,
              backgroundColor: greenJelly,
              color: white,
            },
          ],
          links: [
            `https://${gitHost}/${gitOwner}/gitops`,
            `https://${gitHost}/${gitOwner}/metaphor`,
          ],
          logo: GitHubLogo,
        }
      : {
          appName: 'Gitlab',
          companyName: 'Gitlab',
          tags: [
            {
              value: 'Docs',
              url: 'https://docs.kubefirst.io/kubefirst/gitlab/gitlab.html',
              backgroundColor: bleachedSilk,
            },
            {
              value: 'Argo CD',
              url: `${argoUrl}/gitlab`,
              backgroundColor: greenJelly,
              color: white,
            },
          ],
          links: [`https://gitlab.${hostedZoneName}`],
          logo: GitLabLogo,
        };

  return [
    {
      appName: 'GitHub',
      companyName: 'GitHub',
      tags: [
        {
          value: 'Docs',
          url: 'https://docs.kubefirst.io/kubefirst/github/github-repositories.html',
          backgroundColor: bleachedSilk,
        },
        {
          value: 'Argo CD',
          url: `http://locahost:8080/actions-runner-components`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [
        `https://${gitHost}/${gitOwner}/gitops`,
        `https://${gitHost}/${gitOwner}/metaphor`,
      ],
      logo: GitHubLogo,
    },
    {
      appName: 'Argo CD',
      companyName: 'Intuit',
      tags: [
        {
          value: 'Docs',
          url: `https://docs.kubefirst.io/kubefirst/${gitProvider}/argocd.html`,
          backgroundColor: bleachedSilk,
        },
        {
          value: 'Argo CD',
          url: `${argoUrl}/argocd`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [argoUrl],
      logo: ArgoCDLogo,
    },
    {
      appName: 'Argo Workflows',
      companyName: 'Intuit',
      tags: [
        {
          value: 'Docs',
          url: 'https://docs.kubefirst.io/tooling/argo.html',
          backgroundColor: bleachedSilk,
        },
        {
          value: 'Argo CD',
          url: `${argoUrl}/argo-workflows-cwfts`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [argoWorkflowsUrl],
      logo: ArgoCDLogo,
    },
    {
      appName: 'Vault',
      companyName: 'Hashicorp',
      tags: [
        {
          value: 'Docs',
          url: `https://docs.kubefirst.io/kubefirst/${gitProvider}/vault.html`,
          backgroundColor: bleachedSilk,
        },
        {
          value: 'Argo CD',
          url: `${argoUrl}/vault`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [`${vaultUrl}/ui/vault/auth?with=userpass`],
      logo: VaultLogo,
    },
    {
      appName: 'Atlantis',
      tags: [
        {
          value: 'Docs',
          url: `https://docs.kubefirst.io/kubefirst/${gitProvider}/terraform.html`,
          backgroundColor: bleachedSilk,
        },
        {
          value: 'Argo CD',
          url: `${argoUrl}/atlantis`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [atlantisUrl],
      logo: AtlantisLogo,
    },
    {
      appName: 'Metaphor DEV',
      companyName: 'Kubefirst',
      tags: [
        {
          value: 'Docs',
          url: `https://docs.kubefirst.io/common/metaphors.html`,
          backgroundColor: bleachedSilk,
        },
        {
          value: 'Argo CD',
          url: `${argoUrl}/metaphor-development`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [
        `https://metaphor-development.${hostedZoneName}/app`,
        `https://metaphor-go-development.${hostedZoneName}/app`,
        `https://metaphor-frontend-development.${hostedZoneName}`,
      ],
      logo: MetaphorLogo,
    },
    {
      appName: 'Metaphor STG',
      companyName: 'Kubefirst',
      tags: [
        {
          value: 'Argo CD',
          url: `${argoUrl}/applications/metaphor-staging`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [
        `https://metaphor-staging.${hostedZoneName}/app`,
        `https://metaphor-go-staging.${hostedZoneName}/app`,
        `https://metaphor-frontend-staging.${hostedZoneName}`,
      ],
      logo: MetaphorLogo,
    },
    {
      appName: 'Metaphor PROD',
      companyName: 'Kubefirst',
      tags: [
        {
          value: 'Argo CD',
          url: `${argoUrl}/applications/metaphor-production`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [
        `https://metaphor-production.${hostedZoneName}/app`,
        `https://metaphor-go-production.${hostedZoneName}/app`,
        `https://metaphor-frontend-production.${hostedZoneName}`,
      ],
      logo: MetaphorLogo,
    },
  ];
};

export default {
  buildCardsContent,
};
