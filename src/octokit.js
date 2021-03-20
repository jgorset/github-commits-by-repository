import { Octokit} from '@octokit/core';

const options = {};

if (process.env.GITHUB_ACCESS_TOKEN) {
  options.auth = process.env.GITHUB_ACCESS_TOKEN;
}

if (process.env.GITHUB_BASE_URL) {
  options.baseUrl = process.env.GITHUB_BASE_URL
}

const octokit = new Octokit(options);

export default octokit;
