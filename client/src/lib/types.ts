export interface Viewer {
  id: string | null;
  token: string | null;
  name: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
}
