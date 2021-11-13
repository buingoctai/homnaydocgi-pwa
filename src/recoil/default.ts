export default {
  filterArticle: null,
};

const popupGlobal = {
  isOpening: false,
  type: '',
  title: '',
  message: '',
  footer: null,
  timeout: 5000,
};

const articleMenu = {
  data: {
    items: [],
  },
  handlers: {},
};

const filterArticle = null;

export { popupGlobal, articleMenu, filterArticle };
