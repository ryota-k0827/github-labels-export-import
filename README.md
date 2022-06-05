# GitHub Labels export import
Export the Labels of a repository on GitHub and import them into another repository.

## Description
1. Remove all labels from the import repository
2. Get all labels from the export repository
3. Add labels retrieved from the export repository to the import repository

## Warning
A large number of labels may exceed the request limit.

https://docs.github.com/en/developers/apps/building-github-apps/rate-limits-for-github-apps

##  Install
```bash
git clone git@github.com:HidakaRintaro/github-labels-export-import.git
```

## Setup
```bash
npm install
```

## Usage
```bash
node index.js <owner> <exportRepo> <importRepo> <token>
```

## LICENSE
[MIT](LICENS)
