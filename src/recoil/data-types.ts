import React from 'react';

export type T = any;
export interface ArticleMenu<T> {
  data: {
    items: Array<T>;
  };
  handlers: object;
}

export interface NotiBody {
  title: string | null;
  message: string | HTMLElement | React.ReactNode | null;
  footer?: string | HTMLElement | React.ReactNode;
  timeout?: number;
  type?: string;
}
export interface NotiGlobal extends NotiBody {
  isOpening: boolean;
}

export interface FilterArticle {
  [key: string]: Array<string>;
}

export interface GlobalProps {
  filterArticle: FilterArticle;
}
