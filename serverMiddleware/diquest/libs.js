import _ from "../../assets/libs/lodash";
import consola from "consola";

function _constructGoodsPage(data, pageInfo) {
  try {
    let result = data.resultSet.result[0];
    let contents = result.resultDocuments.map(_camelizeRow);
    let page = pageInfo.currentPage || 1;
    let totalItems = result.totalSize;
    let totalPages = parseInt(String(Math.ceil(result.totalSize / pageInfo.docPage)));

    // console.log(result);

    return {
      page,
      totalItems,
      totalPages,
      contents
    };
  } catch (e) {
    consola.error(e);
    return {
      page: 1,
      totalItems: 0,
      totalPages: 1,
      contents: []
    };
  }
}

function _constructExhbtPage(data, pageInfo) {
  try {
    let index = pageInfo.collection === "EXHIBITION" ? 0: 1;
    let result = data.resultSet.result[index];
    let contents = result.resultDocuments.map(_camelizeRow);
    let page = pageInfo.currentPage || 1;
    let totalItems = result.totalSize;
    let totalPages = parseInt(String(Math.ceil(result.totalSize / pageInfo.docPage)));

    return {
      page,
      totalItems,
      totalPages,
      contents
    };
  } catch (e) {
    consola.error(e);
    return {
      page: 1,
      totalItems: 0,
      totalPages: 1,
      contents: []
    };
  }
}

function _constructFilterGroup(data) {
  try {
    let result = data.resultSet.result[2];

    let categories = result.groupResult[0].ids.filter(x => x);
    let colors = result.groupResult[1].ids.filter(x => x);
    let sizes = result.groupResult[2].ids.filter(x => x);
    let materials = result.groupResult[3].ids.filter(x => x);

    return {
      categories,
      colors,
      sizes,
      materials
    };
  } catch (e) {
    consola.error(e);
    return {
      categories: [],
      colors: [],
      sizes: [],
      materials: []
    };
  }
}

function _camelizeRow(row) {
  let result = {};
  for (let member in row) {
    let key = member;
    if (member.match(/^(PC_|MO_)(.*)/g)) key = member.replace(/^(PC_|MO_)(.*)/g, "$2");
    result[_.camelCase(key)] = row[member];
  }
  return result;
}

module.exports = {
  getGoodsPage: _constructGoodsPage,
  getExhbtPage: _constructExhbtPage,
  getFilterGroup: _constructFilterGroup,
  _camelizeRow
};
