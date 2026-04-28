export type HomepageRoomListResponse = {
    accessible: boolean;
    description: string;
    features: string[];
    image: string;
    roomName: string;
    roomPrice: number;
    roomid: number;
    type: string;
  }[];

export type HomepageRoomResponse = {
    rooms: HomepageRoomListResponse;
}
