const axios = require("axios");
const qs = require("qs");
const consola = require("consola");
const diquest = require("./libs");
const bodyParser = require("body-parser");
const app = require("express")();
import moment from "moment";

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, {arrayFormat: "repeat"});
};

app.use(bodyParser.json());

app.post("/search", async (req, res) => {
  try {
    let params = {};
    for (let member in req.body) {
      if (req.body[member]) params[member] = req.body[member];
    }

    consola.log(`[${moment().format("YYYY-MM-DD HH:mm:ss.SSS")}] Request body`, params);

    let url = _getUrl(`${process.env.DIQUEST_REQUEST_URL}/extensions/GfrSearch`);
    let { data } = await axios.get(url, { params });

    // 상품 결과 만들기
    let goodsPage = diquest.getGoodsPage(data, req.body);
    let exhbtPage = diquest.getExhbtPage(data, req.body);
    let filterGroup = diquest.getFilterGroup(data);

    if (goodsPage.contents.length > 0) {
      url = _getUrl(`${process.env.API_URL}/api/goods/stock`);
      let goodsResponse = await axios.post(url, goodsPage.contents.map(x => x.goodsId), {
        headers: {
          "X-Site-ID": process.env.SITE_NO
        }
      });
      goodsPage.contents.forEach(goods => {
        let s = goodsResponse.data.filter(x => x.goodsId === goods.goodsId)[0];
        if (s) {
          goods.orgAmtHiddenYn = s.orgAmtHiddenYn;
          if (s.stockQty > 0) {
            goods.salePsbCd = '00';
          } else {
            goods.salePsbCd = '30';
          }
        } else {
          goods.orgAmtHiddenYn = "N";
          goods.salePsbCd = '30';
        }
      });
    }

    // consola.log(`[${moment().format("YYYY-MM-DD HH:mm:ss.SSS")}] goodsPage`, goodsPage);
    // consola.log(`[${moment().format("YYYY-MM-DD HH:mm:ss.SSS")}] exhbtPage`, exhbtPage);
    // consola.log(`[${moment().format("YYYY-MM-DD HH:mm:ss.SSS")}] filterGroup`, filterGroup);

    res.json({
      goodsPage,
      exhbtPage,
      filterGroup
    });
  } catch (e) {
    // consola.error(e);
    res.json({
      goodsPage: {
        page: 1,
        totalItems: 0,
        totalPages: 1,
        contents: []
      },
      exhbtPage: {
        page: 1,
        totalItems: 0,
        totalPages: 1,
        contents: []
      },
      filterGroup: {
        categories: [],
        colors: [],
        sizes: []
      }
    });
  }
});

app.get("/popular", async (req, res) => {
  try {
    let url = _getUrl(`${process.env.DIQUEST_REQUEST_URL}/extensions/GfrPopularSearch`);
    let { data } = await axios.get(url);
    let result = data.resultSet.result[0].resultDocuments;
    result = result.map(diquest._camelizeRow);
    result.forEach(node => {
      node.ranking = parseInt(node.ranking);
      node.prevRank = parseInt(node.prevRank);
    });
    res.json(result);
  } catch (e) {
    // consola.error(e);
    res.json([]);
  }
});

app.post("/auto-complete", async (req, res) => {
  try {
    let params = {};
    for (let member in req.body) {
      if (req.body[member]) params[member] = req.body[member];
    }
    let url = _getUrl(`${process.env.DIQUEST_REQUEST_URL}/extensions/GfrAutoSearch`);
    let { data } = await axios.get(url, { params });
    let result = data.resultSet.result[0].resultDocuments;
    result = result.map(diquest._camelizeRow);
    res.json(result);
  } catch (e) {
    // consola.error(e);
    res.json([]);
  }
});

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
