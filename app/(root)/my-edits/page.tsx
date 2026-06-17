import { getAllImages } from "@/lib/actions/image.actions"
import type { SearchParamProps } from "@/lib/types";
import { auth } from "@clerk/nextjs/server"
import { getUserById } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import { Search } from "@/components/shared/search";
import { MyEditsPagination } from "./pagination";
import { MyEditsGrid } from "@/components/shared/MyEditsGrid";
import { MyEditsFilters } from "@/components/shared/MyEditsFilters";
import { EmptyState } from "@/components/shared/EmptyState";

const MyEdits = async (props: SearchParamProps) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';
  const sortOrder = (searchParams?.sortOrder as string) || 'recent';
  const actionFilter = (searchParams?.actionFilter as string) || 'all';

  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  const images = await getAllImages({ page, searchQuery, userId: user._id, sortOrder, actionFilter });

  return (
    <div className="max-w-container-max-width mx-auto px-margin-desktop">
      {/* Header & Filters */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-gutter mb-stack-lg">
        <div className="space-y-2">
          <h1 className="font-display-lg text-display-lg text-on-surface">My Edits</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Review and manage your generative AI creations.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
          <div className="relative min-w-[280px]">
            <Search />
          </div>
          <MyEditsFilters />
        </div>
      </header>

      {/* Gallery Grid */}
      {images && images.data.length > 0 ? (
        <MyEditsGrid images={images.data} />
      ) : (
        <EmptyState 
          title="No edits found"
          subtitle={searchQuery || actionFilter !== 'all' ? "No edits match your current search and filter criteria." : "You haven't created any edits yet. Start exploring the AI tools to create your first edit."}
        />
      )}

      {images && images.totalPage > 1 && (
        <div className="flex justify-center border-t border-outline-variant/30 pt-stack-lg">
           <MyEditsPagination page={page} totalPages={images.totalPage} />
        </div>
      )}
    </div>
  )
}

export default MyEdits
