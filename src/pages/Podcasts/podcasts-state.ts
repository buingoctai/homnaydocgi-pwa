import { atom, selector } from 'recoil';

const defaultData = {
  collection: {
    selected: [],
  },
  audio: {
    currentAudio: {
      data: [],
      idx: null,
    },
  },
};

const podcastsState = atom({
  key: 'podcasts',
  default: defaultData,
});

export const collectionState = selector({
  key: 'collection',
  get: ({ get }) => {
    const podcasts = get(podcastsState);

    return podcasts.collection;
  },
  set: ({ get, set }, newValue) => {
    const podcasts = get(podcastsState);
    set(podcastsState, { ...podcasts, collection: { selected: newValue } });
  },
});

export const audioState = selector({
  key: 'audio',
  get: ({ get }) => {
    const podcasts = get(podcastsState);

    return podcasts.audio;
  },
  set: ({ get, set }, newValue) => {
    const podcasts = get(podcastsState);

    set(podcastsState, { ...podcasts, audio: newValue });
  },
});

export const currentAudioState = selector({
  key: 'currentAudio',
  get: ({ get }) => {
    const podcasts = get(podcastsState);

    return podcasts.audio.currentAudio;
  },
  set: ({ get, set }, newValue) => {
    const podcasts = get(podcastsState);

    set(podcastsState, { ...podcasts, audio: { currentAudio: newValue } });
  },
});
