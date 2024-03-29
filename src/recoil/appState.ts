import { atom, selector } from 'recoil';
import { GlobalProps, NotiGlobal, ArticleMenu, FilterArticle } from './data-types';
import defaultData, { popupGlobal, articleMenu, filterArticle } from './default';
import { AudioList } from 'srcRoot/enitities/Audio';

const appState = atom<GlobalProps>({
  key: 'app',
  default: defaultData,
});

export type T = any;
export const articleMenuState = atom<ArticleMenu<T>>({
  key: 'article-menu',
  default: articleMenu,
});

export const popupGlobalState = atom<NotiGlobal>({
  key: 'popup-global',
  default: popupGlobal,
});

export const filterState = atom<FilterArticle>({
  key: 'filter-article',
  default: filterArticle,
});

export const audioListState = atom<AudioList>({
  key: 'audio-list',
  default: filterArticle,
});
