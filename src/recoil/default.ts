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

const audioList = {
  data: [],
  totalRecord: 0,
};

export { popupGlobal, articleMenu, filterArticle, audioList };
