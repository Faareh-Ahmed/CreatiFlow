"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";

export const MyEditsPagination = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <Pagination className="mt-10">
      <PaginationContent className="flex w-full">
        <Button
          disabled={Number(page) <= 1}
          className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2"
          onClick={() => onPageChange("prev")}
        >
          <PaginationPrevious className="hover:bg-transparent hover:text-inherit" />
        </Button>

        <p className="flex-center p-4 w-fit flex-1 font-body-md text-on-surface">
          {page} / {totalPages}
        </p>

        <Button
          className="bg-primary text-on-primary hover:bg-primary/90 px-4 py-2"
          onClick={() => onPageChange("next")}
          disabled={Number(page) >= totalPages}
        >
          <PaginationNext className="hover:bg-transparent hover:text-white" />
        </Button>
      </PaginationContent>
    </Pagination>
  );
};
