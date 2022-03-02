export default {
  state: () => (
    {
      categories: [],
      category: undefined,
      isEmpty: true
    }
  ),

  mutations: {
    set(state, categories) {
      categories = categories || [];
      categories = (categories || []).map(x => {
        x.subDispCateList = null;
        return x;
      });
      categories.forEach(category => {
        category.parent = categories.filter(x => x.dispClsfNo == category.upDispClsfNo)[0];
        category.subDispCateList = _constructCategoryTree(category, categories);
      });
      state.categories = categories;
      state.isEmpty = false;
    },

    clear(state) {
      state.categories = [];
      state.isEmpty = true;
    },

    push(state, category) {
      state.category = category;
    }
  }
}

function _constructCategoryTree(root, array) {
  let subDispCateList = array.filter(x => x.upDispClsfNo == root.dispClsfNo);
  if (subDispCateList.length > 0) {
    return subDispCateList;
  } else {
    return null;
  }
}
