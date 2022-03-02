export default ({app, redirect, req}) => {
  if (app.store.state.session.isMember) {
    let referer = "/";

    if (req && req.headers && req.headers["referer"]) {
      referer = req.headers["referer"];
    }

    return redirect(referer);
  }
}
