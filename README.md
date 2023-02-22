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
   5. Refer to files in this example repo
4. Create Static Web App **react-atlas-sample** in Azure Portal. Link to created project repos. A Pipeline will be created automatically during the Static Web App creation. The first Pipeline job would fail due to missing configs

<img width="755" alt="Screenshot 2023-02-22 at 22 15 03" src="https://user-images.githubusercontent.com/1311422/220665901-60d899c9-3d86-4847-9472-a6c5d63b69be.png">

5. Add build secrets: Update Pipeline > Library > Variable Group to add more secrets as environment variables. There is a **Variable Group** created after Static Web App creation.  Add more environments to it: `FONTAWESOME_TOKEN` and `GITHUB_TOKEN`. Contact **Jared** for these environment values.

<img width="790" alt="Screenshot 2023-02-22 at 22 16 50" src="https://user-images.githubusercontent.com/1311422/220666399-1bc0ccb3-a9a1-488e-ab5d-e16e79294173.png">

6. Update Pipeline yaml in repository to reflect example file in this repo. Mostly about updating environment variables and build command

<img width="1121" alt="Screenshot 2023-02-22 at 22 19 26" src="https://user-images.githubusercontent.com/1311422/220667164-dd5a3a82-95c3-42de-ae38-b80250584749.png">

7. Update repository env files (`.env.main` for prod and `.env.develop` for test), mostly about `PUBLIC_URL` and `REACT_APP_OAUTH_CLIENT_ID`


Extra steps needed for **test** environment since its public url is non-root url. We need a reverse proxy in front of Static Web App and strip the prefix before forwarding requests to it. That reverse proxy will be used is Azure Front Door CDN.

1. Create an Azure Front Door instance, choose `Custom` for **Origin type**, input Static Web App `develop` environment hostname to **Origin hostname**

<img width="745" alt="Screenshot 2023-02-22 at 22 25 57" src="https://user-images.githubusercontent.com/1311422/220670949-d6011fd4-1831-4092-a448-a41f04497861.png">

2. Add a rule set `stripdevprefix` to remove the `/dev` prefix.

<img width="984" alt="Screenshot 2023-02-22 at 20 35 25" src="https://user-images.githubusercontent.com/1311422/220671074-4bb74bba-0408-41bb-afa3-213f3a7333c5.png">

3. Update default route to attach `stripdevprefix` rule set and set `/` for **Origin path**.

<img width="847" alt="Screenshot 2023-02-22 at 22 31 47" src="https://user-images.githubusercontent.com/1311422/220671519-5703c12d-f977-4413-b9a0-06894570cb19.png">

**Notes:**

* Do not enable CDN caching if public url come from external system such as **atlast.att.com** from **Cloudfront**
