export interface UserArgs {
  id: string;
}

export interface UserListsArgs {
  limit: number;
  page: number;
}

export interface UserListsData<TData> {
  total: number;
  result: Array<TData>;
}
