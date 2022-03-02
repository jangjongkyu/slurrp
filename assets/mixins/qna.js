import moment from 'moment';

export default {
  async asyncData({ $axios, route }) {
    let params = {
      page: route.query.page || 1,
      rows: 10,
      cusStatCdSet: route.query.status || [],
      cusAcptDtmStart: moment().subtract(1, "month").toDate(),
      cusAcptDtmEnd: moment().toDate(),
    };

    if (route.query.startDate) params.cusAcptDtmStart = moment(route.query.startDate, "YYYYMMDD").toDate();
    if (route.query.endDate) params.cusAcptDtmEnd = moment(route.query.endDate, "YYYYMMDD").toDate();

    let [ page, cusStatCd, cusCtgCd ] = await Promise.all([
      $axios.$put("/api/counsel", params),
      $axios.$get("/api/code", { params: { grpCd: "CUS_STAT" } }),
      $axios.$get("/api/code", { params: { grpCd: "CUS_CTG1" } }),
    ]);
    page.contents.forEach(item => item.open = false);

    return {
      page,
      cusStatCd,
      cusCtgCd,
      params: {
        status: params.cusStatCdSet,
        startDate: params.cusAcptDtmStart,
        endDate: params.cusAcptDtmEnd
      }
    };
  },

  data: () => ({
    page: {
      totalItems: 0,
      totalPages: 1,
      contents: []
    },
    cusStatCd: [],
    cusCtgCd: [],
    params: {
      page: 1,
      rows: 10,
      status: [],
      startDate: moment().subtract(1, "month").toDate(),
      endDate: moment().toDate(),
    }
  }),

  watchQuery: ["page", "status", "startDate", "endDate"],
  middleware: ['member-only'],
}
