
export type Collection = {
    id: string;
    name: string;
}

export type Collections = {
    data: Array<Collection>,
    totalRecord: number;
}


export type Audio = {
    id: string;
    name: string;
    url: string;
}

export type AudioList = {
    data: Array<Audio>,
    totalRecord: number;
    id: string;
}

