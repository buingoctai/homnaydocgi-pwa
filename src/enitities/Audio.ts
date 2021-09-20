
export type Collection = {
    collectionId: string;
    collectionName: string;
}

export type Collections = {
    data: Array<Collection>,
    totalRecord: number;
}


export type Audio = {
    audioId: string;
    audioName: string;
    url: string;
}

export type AudioList = {
    data: Array<Audio>,
    totalRecord: number;
}

