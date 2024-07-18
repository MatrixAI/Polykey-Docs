import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'README', // This should match the path to your symlink
          label: 'Welcome to Polykey', // Label for the sidebar item
        },
        'getting-started/installing-polykey-cli',
        'getting-started/claiming-digital-identities',

        {
          type: 'category',
          label: 'Polykey CLI',
          link: {
            type: 'doc',
            id: 'getting-started/polykey-cli/README',
          },
          items: [
            'getting-started/polykey-cli/bootstrapping',
            'getting-started/polykey-cli/managing-vaults',
            'getting-started/polykey-cli/managing-secrets',
            'getting-started/polykey-cli/discovering-other-users',
            'getting-started/polykey-cli/sharing-vaults',
            'getting-started/polykey-cli/managing-multiple-nodes',
            'getting-started/polykey-cli/using-environment-variables',
          ],
        },
        {
          type: 'category',
          label: 'Polykey Core',
          link: {
            type: 'doc',
            id: 'getting-started/polykey-core/README',
          },
          items: ['getting-started/polykey-core/installation'],
        },
      ],
    },
    {
      type: 'category',
      label: 'How To Guides',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'how-to-guides/README',
      },
      items: [
        {
          type: 'category',
          label: 'Developers',
          items: ['how-to-guides/developers/development-environment-secrets'],
        },
        {
          type: 'category',
          label: 'DevOps',
          items: [
            'how-to-guides/devops/service-deployment-secrets-with-aws-ecs',
            'how-to-guides/devops/cloud-agnostic-secrets-management',
            'how-to-guides/devops/ci-cd-secrets-with-gitlab',
            'how-to-guides/devops/microservice-authentication-with-zero-trust-and-mtls',
          ],
        },
        {
          type: 'category',
          label: 'Companies and Teams',
          items: [
            'how-to-guides/companies-and-teams/employee-onboarding-and-offboarding',
            'how-to-guides/companies-and-teams/device-provisioning',
            'how-to-guides/companies-and-teams/delegation-of-authority',
          ],
        },
        {
          type: 'category',
          label: 'General',
          items: ['how-to-guides/general/cryptocurrency-wallet'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Theory',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'theory/README',
      },
      items: [
        'theory/secrets-management',
        'theory/decentralized-trust-network',
        'theory/centralized-vs-decentralized-platforms',
        'theory/glossary',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'reference/README',
      },
      items: [
        'reference/architecture',
        {
          type: 'category',
          label: 'Polykey-CLI',
          link: {
            type: 'doc',
            id: 'reference/polykey-cli/README',
          },
          items: [
            {
              type: 'category',
              label: 'Commands',
              link: {
                type: 'doc',
                id: 'reference/polykey-cli/commands/README',
              },
              items: [
                'reference/polykey-cli/commands/bootstrap',
                'reference/polykey-cli/commands/agent',
                'reference/polykey-cli/commands/nodes',
                'reference/polykey-cli/commands/secrets',
                'reference/polykey-cli/commands/vaults',
                'reference/polykey-cli/commands/keys',
                'reference/polykey-cli/commands/identities',
                'reference/polykey-cli/commands/notifications',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Polykey-Core',
          link: {
            type: 'doc',
            id: 'reference/polykey-core/README',
          },
          items: [
            'reference/polykey-core/acl',
            'reference/polykey-core/audit',
            'reference/polykey-core/bootstrap',
            'reference/polykey-core/claims',
            'reference/polykey-core/client',
            'reference/polykey-core/discovery',
            'reference/polykey-core/gestalts',
            'reference/polykey-core/git',
            'reference/polykey-core/http',
            'reference/polykey-core/identities',
            'reference/polykey-core/ids',
            'reference/polykey-core/keys',
            'reference/polykey-core/network',
            'reference/polykey-core/nodes',
            'reference/polykey-core/notifications',
            'reference/polykey-core/schema',
            'reference/polykey-core/sessions',
            'reference/polykey-core/sigchain',
            'reference/polykey-core/status',
            'reference/polykey-core/tasks',
            'reference/polykey-core/tokens',
            'reference/polykey-core/utils',
            'reference/polykey-core/validation',
            'reference/polykey-core/vaults',
            'reference/polykey-core/workers',
            'reference/polykey-core/config',
            'reference/polykey-core/errors',
            'reference/polykey-core/events',
            'reference/polykey-core/types',
            'reference/polykey-core/PolykeyAgent',
            'reference/polykey-core/PolykeyClient',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Development Guide',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'development-guide/README',
      },
      items: [
        'development-guide/roadmap',
        'development-guide/development-environment',
        'development-guide/software-architecture',
        'development-guide/style-guide',
        'development-guide/linting',
        'development-guide/ids',
        'development-guide/benchmarking',
        'development-guide/logging',
        'development-guide/object-resource-lifecycle',
        'development-guide/diagrams',
        'development-guide/errors',
        'development-guide/ci-cd',
        'development-guide/input-validation',
        'development-guide/timeouts',
        'development-guide/release-procedure',
        'development-guide/chocolatey',
        'development-guide/docker',
      ],
    },
  ],
};

export default sidebars;
