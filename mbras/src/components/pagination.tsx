import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  category?: string;
}

export default function Pagination({ page, totalPages, category }: PaginationProps) {
  const buildLink = (p: number) =>
    `/?page=${p}${category ? `&category=${category}` : ""}`;

  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      {page > 1 && (
        <>
          <Link
            href={buildLink(page - 1)}
            className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300"
          >
            Voltar
          </Link>

          <Link
            href={buildLink(page - 1)}
            className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300"
          >
            {page - 1}
          </Link>
        </>
      )}

      <span className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-lg">
        {page}
      </span>

      {page < totalPages && (
        <>
          <Link
            href={buildLink(page + 1)}
            className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300"
          >
            {page + 1}
          </Link>

          <Link
            href={buildLink(page + 1)}
            className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300"
          >
            Avançar
          </Link>
        </>
      )}
    </div>
  );
}
