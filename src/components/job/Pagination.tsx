"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function Pagination({ currentPage }: { currentPage: number }) {
  const router = useRouter();
  const params = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(params.toString());
    if (newPage === 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", newPage.toString());
    }
    const url = `${window.location.pathname}${
      newParams.toString() ? `?${newParams.toString()}` : ""
    }`;
    router.push(url, { scroll: false });
  };

  return (
    <div className="flex justify-center gap-4 mt-8">
      <Button
        variant="default"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="rounded-xl border px-4 py-2 disabled:opacity-50"
      >
        ← Anterior
      </Button>
      <Button
        variant="default"
        onClick={() => handlePageChange(currentPage + 1)}
        className="rounded-xl border px-4 py-2"
      >
        Próxima →
      </Button>
    </div>
  );
}
