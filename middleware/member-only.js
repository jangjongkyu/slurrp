export default ({ app, redirect }) => {
  if (app.store.state.session.isGuest) {
    return redirect("/login");
  }
};
