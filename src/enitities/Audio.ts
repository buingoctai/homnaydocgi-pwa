export type Collection = {
  collectionId: string;
  collectionName: string;
  thumb: string;
};

export type Collections = {
  data: Array<Collection>;
  totalRecord: number;
};

export type Audio = {
  audioId: string;
  audioName: string;
  url: string;
  thumb?: string;
};

export type AudioList = {
  data: Array<Audio>;
  totalRecord: number;
};
