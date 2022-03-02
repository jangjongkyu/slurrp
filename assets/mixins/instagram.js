export default {

  async asyncData({$axios, env}) {
    if (!env.instaAccessToken) {
      return;
    }
    let retryCnt = 0;
    let contents;
    while (retryCnt < 5 && !contents) {
      try {
        /*
        const {id} = await $axios.$get('/graph-instagram/me', {
          params: {
            access_token: env.instaAccessToken,
            fields: ['id'],
          },
        });
        */
        let id = env.INSTA_ACCESS_ID;
        contents = await $axios.$get(`https://graph.instagram.com/${id}/media`, {
          params: {
            access_token: env.instaAccessToken,
            fields: 'id,username,timestamp,media_url,media_type,permalink,caption',
          },
        });
      } catch (e) {
        retryCnt++;
        // console.error(e);
        // console.log('retryCnt : ', retryCnt);
      }
    }
    return {
      contents: contents || {
        data: [],
        paging: {},
      },
    };
  },

  data() {
    return {
      contents: null,
    };
  },
};
