import HistoryTable from "@/components/modules/user/history/HistoryTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { blogService } from "@/services/blog.service";

export default async function HistoryPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {

  const { page } = await searchParams;

  console.log(page)

  const response = await blogService.getBlogPosts({ page });

  console.log("response", response)

  const posts = response.data?.data || [];
  const pagination = response.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  console.log(pagination)

  return (
    <div>
      <h1 className="text-4xl my-2">Blog post History</h1>
      <HistoryTable posts={posts} />
      <PaginationControls meta={pagination} />
    </div>
  )
}
