# GitHub Labels export import
forked from [HidakaRintaro/github-labels-export-import](https://github.com/HidakaRintaro/github-labels-export-import)

## About
Export the Labels of a repository on GitHub and import them into another repository.

## Description
1. Remove all labels from the import repository
2. Get all labels from the export repository
3. Add labels retrieved from the export repository to the import repository

##  Install
```bash
git clone git@github.com:HidakaRintaro/github-labels-export-import.git
```

## Setup
#### 1. Create a Personal Access Token on GitHub
#### 2. Create a `.env` file in the root directory
#### 3. Add the following to the `.env` file
```env
GITHUB_ACCESS_TOKEN="YOUR_GITHUB_ACCESS_TOKEN"
```
#### 4. Run npm install
```bash
npm install
```

## Usage
```bash
node index.js <exportRepoOwner> <exportRepo> <importRepoOwner> <importRepo>
```

## LICENSE
[MIT](LICENSE)
