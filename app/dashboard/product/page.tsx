import { Suspense } from "react"
import Link from "next/link"
import PageContainer from "@/src/components/layout/page-container"
import { buttonVariants } from "@/src/components/ui/button"
import { Heading } from "@/src/components/ui/heading"
import { Separator } from "@/src/components/ui/separator"
import { DataTableSkeleton } from "@/src/components/ui/table/data-table-skeleton"
import { cn } from "@/src/lib/cn-utils"
import { searchParamsCache, serialize } from "@/src/lib/searchparams"
import { Plus } from "lucide-react"
import { SearchParams } from "nuqs"

import ProductListingPage from "./_components/product-listing"
import ProductTableAction from "./_components/product-tables/product-table-action"

export const metadata = {
  title: "Dashboard: Products",
}

type pageProps = {
  searchParams: SearchParams
}

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams })

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Products"
            description="Manage products (Server side table functionalities.)"
          />
          <Link
            href="/dashboard/product/new"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <Plus className="w-4 h-4 mr-2" /> Add New
          </Link>
        </div>
        <Separator />
        <ProductTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ProductListingPage />
        </Suspense>
      </div>
    </PageContainer>
  )
}
