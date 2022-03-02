const noReloadingPages = [
  'my-page-recently-goods',
  'my-page-mileage',
  'promotion',
  'promotion-id',
  'event',
  'main-new',
  'main-best',
  'category',
];

//최근본상품(마이페이지), 포인트현황(마이페이지), 기획전, 기획전/id, 이벤트, 신상품, 베스트 , 카테고리
const noReloadingPagesRegex = /\/my-page\/recently-goods|\/my-page\/mileage|\/promotion|\/promotion\/|\/event|\/main\/new|\/main\/best|\/category/
const keepAliveExcludePageRegex = /\/main\/today|\/cart/;
const keepAliveExcludePageNameRegex = /main-today|cart/;

class PageUtil {
  constructor($route) {
    this.$route = $route;
  }

  getKey(route) {
    /**
     * query parameter 변경시 화면 reload 되지 않고 유지 되어야 하는경우에는 name 을 key 설정하고 그 외에 경우에는 fullPath 를 키로 설정한다.
     */
    this.$route = route ? route : this.$route;
    //#enp_mbris
    //let routeName = this.$route.name;
    //let routePath = this.$route.path;
    //let queryStr = "";
    let fullPath = this.$route.fullPath;
    try{
      fullPath = fullPath.replace("#", "");
      fullPath = fullPath.replace("enp_mbris", "");
    } catch (e) {}
    //return noReloadingPages.indexOf(this.$route.name) > -1 ? this.$route.name : this.$route.fullPath;
    //return noReloadingPages.indexOf(routeName) > -1 ? routePath : this.$route.fullPath;
    //if(fullPath.match(keepAliveExcludePageRegex)){
    //  return null;
    //} else {
      return fullPath;
    //}
  }

  getNoReloadingPages () {
    return noReloadingPages;
  }

  getKeepAliveIncludeRegEx () {
    //페이지캐싱할 페이지 정규식
    return noReloadingPagesRegex;
  }

  getKeepAliveExcludePageRegex () {
    return keepAliveExcludePageNameRegex;
  }
}


export default (context, inject) => {
  const util = new PageUtil(context.route);
  context.app.$pageUtil = util;
  inject("pageUtil", util);
}
