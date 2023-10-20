// import { z } from "zod";
import type { User } from "@clerk/nextjs/dist/types/api";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";

const filterUsersForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profilePicture: user.imageUrl,
  };
};

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
      })
    ).map(filterUsersForClient);

    return posts.map((post) => ({
      post,
      author: users.find((user) => user.id === post.authorId)!,
    }));
  }),
});
