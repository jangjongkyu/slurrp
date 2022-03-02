const app = require("express")();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const axios = require("axios");
const querystring = require("querystring");
const consola = require("consola");

const getClientSecret = () => {
  // sign with RSA SHA256
  const privateKey = fs.readFileSync("./apple.p8");
  const headers = {
    kid: process.env.APPLE_KEY_ID,
    typ: undefined, // is there another way to remove type?
  };
  const claims = {
    iss: process.env.APPLE_TEAM_ID,
    aud: "https://appleid.apple.com",
    sub: process.env.APPLE_CLIENT_ID,
  };

  let token = jwt.sign(claims, privateKey, {
    algorithm: "ES256",
    header: headers,
    expiresIn: "24h",
  });

  return token;
};

const getUserId = (token) => {
  const parts = token.split(".");
  try {
    return JSON.parse(new Buffer(parts[1], "base64").toString("ascii"));
  } catch (e) {
    return null;
  }
};

app.post("/callback", bodyParser.urlencoded({ extended: false }), (req, res) => {
  const clientSecret = getClientSecret();

  consola.log("Body", req.body);

  const requestBody = {
    grant_type: "authorization_code",
    code: req.body.code,
    redirect_uri: _getUrl("/login/apple"),
    client_id: process.env.APPLE_CLIENT_ID,
    client_secret: clientSecret,
    scope: "name email",
  };

  consola.log(requestBody);

  axios
    .request({
      method: "POST",
      url: "https://appleid.apple.com/auth/token",
      data: querystring.stringify(requestBody),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then((response) => {
      return res.json({
        success: true,
        data: response.data,
        user: getUserId(response.data.id_token),
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        error: error.response.data,
      });
    });
  }
);

function _getUrl(value) {
  value = _getValue(value);
  if (value === "") return undefined;
  let url;
  try {
    url = new URL(value);
  } catch (e) {
    url = new URL(value, process.env.SITE_URL);
  }
  return url.href;
}

function _getValue(value) {
  if (value === undefined || value === null) return "";
  else return String(value).trim();
}

export default app;
