"use server";

import { BlogData, blogService } from "@/services/blog.service";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogService.getBlogPosts();
};

export const createBlogPost = async (blogData: BlogData) => {
  const res = await blogService.createBlogPost(blogData);
  updateTag("BlogPosts")
  return res;
};
