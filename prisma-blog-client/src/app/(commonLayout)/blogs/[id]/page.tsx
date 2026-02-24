import { blogService } from '@/services/blog.service';
import { Badge } from "@/components/ui/badge";
import { BlogPost } from '@/types';

export async function generateStaticParams() {

  const { data } = await blogService.getBlogPosts()

  return data.data?.map((blog: BlogPost) => ({ id: blog.id })).splice(0, 3)


}


export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: blog } = await blogService.getBlogById(id);


  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
        <span>📅 {new Date(blog.createdAt).toDateString()}</span>
        <span>👁 {blog.views} views</span>
        <span>💬 {blog._count.comments} comments</span>
        {blog.isFeatured && (
          <span className="text-yellow-500 font-medium">⭐ Featured</span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {blog.tags.map((tag: string) => (
          <Badge key={tag} variant="secondary">
            #{tag}
          </Badge>
        ))}
      </div>

      {/* Thumbnail */}
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-2xl mb-8"
        />
      )}

      {/* Content */}
      <div className="prose max-w-none">
        <p>{blog.content}</p>
      </div>

      {/* Divider */}
      <hr className="my-10" />

      {/* Comment Section Placeholder */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Comments ({blog._count.comments})
        </h2>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{blog._count?.comments ?? 0} comments</span>
          {blog.isFeatured && (
            <Badge variant="outline" className="rounded-full">
              Featured
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
