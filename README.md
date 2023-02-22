# react-atlas-azure-sample
Sample repo to demonstrate Azure Pipeline setup for react-atlas app and deploy to Static Web App.

* Project name: react-atlas-sample

* Environments:

* Prod:

Branch: main
Deployment url: Default Static Web App url

* Test:
Branch: develop
Deployment url: non-root url prefixed by /dev

1. Create Azure Devops project
2. Enable project  Repos
3. Import code from GitHub to project repository. Ensure repository includes mandatory files. Prefer to this example repo react-atlas-azure-sample
4. Create Static Web App react-atlas-sample in Azure portal. Linked to project repository. A Pipeline will be created automatically During the static web app creation. The first Pipeline job would fail due to missing configs
5. Build secrets: Update Pipeline > Library > Variable Group to add more secrets as environment variables. There is a Variable Group created after Static web app creation.  Add more environments to it: GitHub token and font awesome token. Contact Jared for these environment values.
6. Update Pipeline yaml in repository to reflect sample file. Update environment variables and build command
7. Update repository env files (.env.main for prod and .env.develop for test), mostly about public url, client app id

Extra steps needed for test environment since its public url is non-root url. We need a reverse proxy stay in front of Static web app and strip the prefix before forwarding requests to it. That reverse proxy will be used is Azure Front Door CDN.

1. Create an Azure fd instance, choose Custom for Origin type, input swa develop hostname as origin hostname
2. Add a rule set to remove the /dev prefix.
3. Update default route to attach stripdevprefix rule set and set / for Origin path.
