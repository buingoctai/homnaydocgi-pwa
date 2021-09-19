import { atom, selector } from 'recoil';

const defaultData = {
  audioList: {
    data: [],
    id: '',
    totalRecord: 0,
  },
  thumbList: {},
};

const podcastsState = atom({
  key: 'podcasts',
  default: defaultData,
});

export const audioListState = selector({
  key: 'audioList',
  get: ({ get }) => {
    const podcasts = get(podcastsState);

    return podcasts.audioList;
  },
  set: ({ get, set }, newValue) => {
    const podcasts = get(podcastsState);

    set(podcastsState, { ...podcasts, audioList: newValue });
  },
});

export const thumbListState = selector({
  key: 'thumbList',
  get: ({ get }) => {
    const podcasts = get(podcastsState);

    return podcasts.thumbList;
  },
  set: ({ get, set }, newValue) => {
    const podcasts = get(podcastsState);

    set(podcastsState, { ...podcasts, thumbList: newValue });
  },
});
