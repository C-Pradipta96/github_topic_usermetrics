module.exports = class Organization {

    constructor(octokit) {
      if (!octokit) {
        throw new Error('An octokit client must be provided');
      }
      this._octokit = octokit;
    }

 // Get Organisation 
    getOrgs(org) {
      return this.octokit.paginate("GET /orgs/:org",
        {
          org: org
        }
      ).then(orgs => {
          console.log(`Searching ${org} organization`);
          const data =  {
            name: org,
            status: 'success'
          }
          return data;
        })
        .catch(err => {
          console.log(`Invalid name of Organization ===>> ${org} `)
          if (err.status === 404) {
              return {
                name: org,
                status: 'error'
              }
          } else {
            console.error(err)
            throw err;
          }
        })
    }
  
//Returns Repo_Name & Topic(s) of that  repo.
// API used : https://api.github.com/orgs/internal-test-organization/repos

fetchAllRepos(org) {
      return this.octokit.paginate("GET /orgs/:org/repos", {org: org, per_page: 100})
        .then(repos => {
          return repos.map(repos => {
            return {
                name: repos.name,
                topics: repos.topics,
                orgs: org
            };
          });
        });
    }

 //Search Repositories which uses a specific "topic" 
 // API used : https://api.github.com/search/repositories?q=topic:suripa99pc  

 findReposUsingTopic(topics) {
      return this.octokit.paginate("GET /search/repositories", 
        {per_page: 100, q:'topic:' + topics})
        .then(TOPIC => {
          return TOPIC.map(TOPIC => {
            return {
                total_count : TOPIC.total_count,
                name: TOPIC.items.name
            };
          });
        });
    }

  // Fetch Organisation Runner details
  //API Used : https://api.github.com/orgs/internal-test-organization/actions/runners

  fetchOrgRunner(org) {
    return this.octokit.paginate("GET /orgs/:org/actions/runners", {org: org, per_page: 100})
      .then(runnerResp => {
        return runnerResp.map(runnerResp => {
          return {
              total_runner_count: runnerResp.total_count,
              operating_sys: runnerResp.runners.os,
              os_labels: runnerResp.runners.labels.name
          };
        });
      });
   } 

  
    get octokit() {
      return this._octokit;
    }
  }

