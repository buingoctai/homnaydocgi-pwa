import { atom } from 'recoil';
import { Audio, Collection } from 'srcRoot/enitities/Audio';

const defaultCurrentAudio = {
  data: null,
  idx: null,
};

export interface CurrentAudio {
  data: Audio | null;
  idx: number | null;
}
export const currentAudioState = atom<CurrentAudio>({
  key: 'current-audio',
  default: defaultCurrentAudio,
});

export const selectedCollection = atom<Array<Collection>>({
  key: 'selected-collection',
  default: [],
});
