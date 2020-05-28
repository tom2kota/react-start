# react-start
React App Start with Semantic UI &amp; GitHub Pages


[DEMO https://vercel.com](https://vercel.com)

---

Status of [Action](https://github.com/tom2kota/song/actions) script:

![React_App_Deploy_to_gh-pages_CI](https://github.com/tom2kota/react-start/workflows/React_App_Deploy_to_gh-pages_CI/badge.svg)

### GitHub Pages:
----

changes in ```package.json```

```
  "homepage": ".",
  "dependencies": {
...
    "gh-pages": "^2.2.0",
...
  },
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

```
npm run deploy
```

create Action Script [HERE](https://github.com/tom2kota/react-start/actions) & modify Workflow file:

```
# React-Redux App Build CI ... jobs: 1) greeting 2) deploying project to GitHub Pages
# ----------------------------------------------------------------------------------

name: React_App_Deploy_to_gh-pages_CI
env:
  APPLICATION_NAME: 'App Deploy CI'
  DEPLOY_PACKAGE_NAME: 'rap-v-${{ github.sha }}'
  MY_REPO: ${{github.repository}}.git


on:
  pull_request:
    branches: [ master ]
  watch:
    types: [started]

jobs:
  greeting:
    runs-on: ubuntu-latest

    if: github.actor == github.event.repository.owner.login

    steps:
      - name: Greeting
        run: |
          echo 'Hi guys ...'
          echo 'we just try to Deploy our React-Redux-SPA ... ${{env.APPLICATION_NAME}}'
          echo 'with version: ${{env.DEPLOY_PACKAGE_NAME}}'
  deploying:
    runs-on: ubuntu-latest
    needs: [greeting]
    strategy:
      matrix:
        node-version: [14.x]
    steps:
      
      - name: Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
        uses: actions/checkout@v2

      - name: Use Node.js version ... ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install Packages (npm ci) ... It will never write to package.json or any of the package-locks, installs are essentially frozen
        run: npm install

      - name: List current folder ... before
        run: ls -la
      
      - name: NPM Version
        run: npm -v
        
      - name: Node Version
        run: node -v

      - name: Deploy project to GitHub Pages
        run: |
          echo 'Git Repo: ${{env.MY_REPO}}'
          git config --global user.email ${{secrets.MY_SECRET_EMAIL}}
          git config --global user.name ${{secrets.MY_SECRET_USERNAME}}
          git remote set-url origin https://${{secrets.MY_SECRET_PERSONAL_ACCESS_TOKEN}}@github.com/${{env.MY_REPO}}
          npm run deploy
      - name: List current folder ... after
        run: ls -la

      - name: Updating Domain ... (SELECT gh-pages branch to publish)
        run: echo 'Update domain - GitHub Pages (SELECT gh-pages branch to publish)'

        env:
          CI: true
```



Also need to create [TOKEN](https://github.com/settings/tokens) & [SECRETS](https://github.com/tom2kota/react-start/settings/secrets) for variables: 

```
${{secrets.MY_SECRET_EMAIL}}
${{secrets.MY_SECRET_USERNAME}}
${{secrets.MY_SECRET_PERSONAL_ACCESS_TOKEN}}
```

Trigger to run this action is star button :star: of this repo & refresh the page

[ENJOY THE RESULT](https://tom2kota.github.io/react-start/)
