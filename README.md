# react-atlas-azure-sample
Sample repo to demonstrate Azure Pipeline setup for react-atlas app and deploy to Static Web App.

## Acceptance

* **Project name**: react-atlas-sample

* **Environments**:

  * Prod:
    * Branch: **main**
    * Deployment url: Default Static Web App url. Ex `PUBLIC_URL=https://proud-cliff-0a1355410.2.azurestaticapps.net`
  * Test:
    * Branch: **develop**
    * Deployment url: non-root url prefixed by /dev. Ex `PUBLIC_URL=https://react-atlas-sample-d6fzbhake3abbzaz.z01.azurefd.net/dev`


## Setup

1. Create Azure Devops project: **react-atlas-sample**
2. Enable project **Repos**
3. Import code from GitHub to project repository. Ensure repository includes mandatory files.
   1. `.ci`
   2. `staticwebapp.config.json`
   3. `.env.develop`
   4. `.env.main`
   5. Prefer to files in this example repo
4. Create Static Web App **react-atlas-sample** in Azure Portal. Link to created project repos. A Pipeline will be created automatically during the Static Web App creation. The first Pipeline job would fail due to missing configs
5. Add build secrets: Update Pipeline > Library > Variable Group to add more secrets as environment variables. There is a **Variable Group** created after Static Web App creation.  Add more environments to it: `FONTAWESOME_TOKEN` and `GITHUB_TOKEN`. Contact Jared for these environment values.
6. Update Pipeline yaml in repository to reflect example file in this repo. Mostly about updating environment variables and build command
7. Update repository env files (`.env.main` for prod and `.env.develop` for test), mostly about `PUBLIC_URL` and `REACT_APP_OAUTH_CLIENT_ID`

Extra steps needed for **test** environment since its public url is non-root url. We need a reverse proxy in front of Static Web App and strip the prefix before forwarding requests to it. That reverse proxy will be used is Azure Front Door CDN.

1. Create an Azure Front Door instance, choose `Custom` for Origin type, input Static Web App `develop` environment hostname as origin hostname
2. Add a rule set `stripdevprefix` to remove the `/dev` prefix.
3. Update default route to attach `stripdevprefix` rule set and set `/` for **Origin path**.
