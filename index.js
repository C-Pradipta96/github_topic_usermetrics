const core = require ('@actions/core');
const github = require('@actions/github');
const {Octokit} = require("octokit");
//const HttpsProxyAgent = require('https-proxy-agent');
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//const httpProxyAgent = new HttpsProxyAgent('http://10.192.116.73:8080');
const token = process.env.REPO_TOKEN
// const octokit = new Octokit({
//     auth: token,
//     request:{
//         agent : httpProxyAgent,
//         rejectUnauthorized : false
//     }
// });

async function getrepo(orgName)
