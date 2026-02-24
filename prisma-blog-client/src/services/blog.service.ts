import { env } from "@/env";
import { error } from "console";
import { Coins } from "lucide-react";
import { Funnel_Display } from "next/font/google";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
export interface BlogData {
  title: string;
  content: string;
  tags: string[];
}

export const blogService = {
  getBlogPosts: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["blogPosts"] };

      // const res = await fetch(url.toString(), {
      //   next : {
      //     tags : ["blogPosts"],
      //   },
      // });
      const res = await fetch(url.toString(), config);

      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },
  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  createBlogPost: async function (blogData: BlogData) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });
      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message:"Error : Post not created!" },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
