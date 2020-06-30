import request from "superagent";
import Cookies from "universal-cookie";
import UUID from "../util/UUID";

const UNIQUE_USER_KEY = "unique_user_key";
const cookie = new Cookies();

function handleError(error) {
  console.error(error);
}

function getUniqueKey() {
  let uniqueKey = cookie.get(UNIQUE_USER_KEY, { path: "/" });
  if (!uniqueKey) {
    uniqueKey = UUID.randomUUID();
    cookie.set(UNIQUE_USER_KEY, uniqueKey, { path: "/" });
  }
  return uniqueKey;
}

function handleEnd(err, res, success, error, url) {
  if (err || !res.ok) {
    handleError(err);
    error && error(err);
    if (err.status == 401) {
      //AuthAction.logout();
    }
  } else {
    if (url.split("/")[3] === "author-reputation") {
      success && success(res.text);
    }
    else{
      success && success(res.body);
    }
  }
}

function getAuthToken() {
  return cookie.get("auth_token", { path: "/" });
}

export default {
  post(url, data, success, error) {
    request
      .post(url)
      .send(data)
      .set("Accept", "application/json")
      .set("Authorization", getAuthToken())
      .set(UNIQUE_USER_KEY, getUniqueKey())
      .end((err, res) => handleEnd(err, res, success, error , url));
  },

  get(url, success, error) {
    request
      .get(url)
      .set("Authorization", getAuthToken())
      .set(UNIQUE_USER_KEY, getUniqueKey())
      .end((err, res) => {
        handleEnd(err, res, success, error, url);
      });
  },

  getWithRequest(url, data, success, error) {
    request
      .get(url)
      .set("Authorization", getAuthToken())
      .set(UNIQUE_USER_KEY, getUniqueKey())
      .query(data)
      .end((err, res) => handleEnd(err, res, success, error , url));
  },

  externalGet(url, success, error) {
    request.get(url).end((err, res) => handleEnd(err, res, success, error , url));
  },

  head(url, success, error) {
    request
      .head(url)
      .set("Authorization", getAuthToken())
      .set(UNIQUE_USER_KEY, getUniqueKey())
      .end((err, res) => handleEnd(err, res, success, error , url));
  },

  delete(url, success, error) {
    request
      .del(url)
      .set("Authorization", getAuthToken())
      .set(UNIQUE_USER_KEY, getUniqueKey())
      .end((err, res) => handleEnd(err, res, success, error , url));
  },

  put(url, data, success, error) {
    request
      .put(url)
      .send(data)
      .set("Authorization", getAuthToken())
      .set(UNIQUE_USER_KEY, getUniqueKey())
      .end((err, res) => handleEnd(err, res, success, error , url));
  },

  postMultipart(url, data, success, error) {
    var fd = new FormData();
    fd.append("file", data);
    request
      .post(url)
      .send(fd)
      // .attach('file', data)
      .set("Accept", "application/json")
      .set("Authorization", getAuthToken())
      .set(UNIQUE_USER_KEY, getUniqueKey())
      .end((err, res) => handleEnd(err, res, success, error , url));
  },
};
