import type { User } from "@clerk/nextjs/dist/types/api";

export const filterUsersForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.imageUrl,
  };
};
