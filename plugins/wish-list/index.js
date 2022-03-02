import WishListService from "@/plugins/wish-list/service";

export default (context, inject) => {
  const wishListService = new WishListService(context.$axios, context.store);
  context.$_wish = wishListService;
  inject("_wish", wishListService);
};
