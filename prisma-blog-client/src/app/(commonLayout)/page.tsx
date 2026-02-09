import BlogCard from "@/components/homepage/blogCard";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {

   const {data : blogData} = await  blogService.getBlogPosts(
    {
    isFeatured : false,
   },
   {
    revalidate : 10
   }
  )


  return (
    <div>
      <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-5">
        {
        blogData.data.map((post : BlogPost)=> (<BlogCard key={post.id} post={post} ></BlogCard>))
      }
      </div>
      <Button variant={"outline"}>Click here</Button>
    </div>

  );
}
