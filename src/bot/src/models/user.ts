interface USER {
  id: number;
  firstName: string;
}

type CreateUserData = {
  id: number;
  firstName: string;
};

type SearchUserData = {
  id: number;
};

type UpdateUserData = {
  firstName?: string;
};

export default USER;
export { CreateUserData, SearchUserData, UpdateUserData };
