export type UserSearchType = {
  username: string;
  errorMessage: boolean;
  loadingUsers: boolean;
  handleSearch: () => void;
  handleChangeUserName: (e: any) => void;
};

export type UserItemType = {
  users: string[];
  repos: ReposType[];
  setRepos: (e: any) => void;
};

export type ReposType = {
  userName: string;
  loadMore: boolean;
  repositories: any[];
};

export type UserRepositoriesTypes = {
  repos: ReposType[];
  page: number;
  user: string;
  loadingRepos: boolean;
  setRepos: (e: any) => void;
  setPage: (e: any) => void;
};
