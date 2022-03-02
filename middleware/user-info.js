export default async ({ $axios, store }) => {
  try {
    let profile = await $axios.$get("/api/user/me");
    store.commit("session/set", profile);
  } catch (e) {
    store.commit("session/clear");
  }

  let site = await $axios.$get("/api/site");
  store.commit("session/updateSiteInfo", site);
};
