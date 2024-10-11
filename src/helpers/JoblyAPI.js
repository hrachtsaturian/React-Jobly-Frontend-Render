import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request({ path, data = {}, method = "get" }) {
    console.debug("API Call:", path, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${path}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err?.response);
      let message = err?.response?.data?.error?.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Authenticate credentials. */

  static async authenticate(creds) {
    const res = await this.request({
      path: `auth/token`,
      data: creds,
      method: "post",
    });
    return res.token;
  }

  /** Register user. */
  static async register(creds) {
    const res = await this.request({
      path: `auth/register`,
      data: creds,
      method: "post",
    });
    return res.token;
  }

  /** Get current user. */

  static async getUser(username) {
    const res = await this.request({ path: `users/${username}` });
    return res.user;
  }

  /** Update the user's profile. */

  static async updateProfile(username, data) {
    const res = await this.request({
      path: `users/${username}`,
      data,
      method: "patch",
    });
    return res.user;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request({ path: `companies/${handle}` });
    return res.company;
  }

  /** Get list of companies. */
  // accepts name query param

  static async getCompanies(name) {
    let res = await this.request({ path: `companies${name ? `?name=${name}` : ''}` });
    return res.companies;
  }

  /** Get list of jobs. */

  static async getJobs(searchTitle) {
    let res = await this.request({ path: `jobs${searchTitle ? `?title=${searchTitle}` : ''}` });
    return res.jobs;
  }

  /** Apply for job application. */

  static async applyJob(username, jobId) {
    const res = await this.request({
      path: `users/${username}/jobs/${jobId}`,
      method: "post",
    });
    return res.json;
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
