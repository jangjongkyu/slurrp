export default async ({app, $axios}) => {
  if (app.store.state.category.isEmpty) {
    let categories = [];
    try {
      categories = await $axios.$get("/api/category");
    } finally {
      app.store.commit("category/set", categories);
    }
  }
}
