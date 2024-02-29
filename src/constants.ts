export const IO_SERVER = 'ws://localhost:6080';
export const IO = {
  TEXT_SHARE_SERVER: 'ws://localhost:6080/textshare',
  REAL_STREAM_SERVER: 'ws://localhost:6080/realstream',
  AUCTION_SERVER: 'ws://localhost:6080/auction'
};

export const API_SERVER = 'http://localhost:6080';

export const ROUTES = {
  HOME: () => [],
  TEXT_SHARE: {
    HOME: () => ['text-share'],
    ROOM: (id: string) => ['text-share', id]
  },
  REAL_STREAM: {
    HOME: () => ['real-stream'],
    ROOM: (id: string) => ['real-stream', id]
  },
  AUCTION: {
    HOME: () => ['auction'],
    ROOM: (id: string) => ['auction', id]
  }
};

export enum TOOLBAR_ACTIONS {
  COPY_ROOM_ID = 'COPY_ROOM_ID'
}



export enum APP_ENUMS {
  TEXT_SHARE = 'TEXT_SHARE',
  REAL_STREAM = 'REAL_STREAM',
  AUCTION = 'AUCTION'
};

export enum IO_ROOM_TYPE {
  TEXT_SHARE = 'text-share',
  REAL_STREAM = 'real-stream',
  AUCTION = 'auction'
};
