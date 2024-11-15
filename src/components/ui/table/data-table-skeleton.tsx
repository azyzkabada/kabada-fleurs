import { Skeleton } from "@/src/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"

import { ScrollArea, ScrollBar } from "../scroll-area"

export function DataTableSkeleton({
  columnCount = 1,
  rowCount = 10,
  searchableColumnCount = 0,
  filterableColumnCount = 0,
  showViewOptions = false,
}) {
  return (
    <div className="w-full space-y-3 overflow-auto">
      {searchableColumnCount > 0 || filterableColumnCount > 0 ? (
        <div className="flex items-center justify-between w-full p-1 space-x-2 overflow-auto">
          <div className="flex items-center flex-1 space-x-2 space-y-4">
            {searchableColumnCount > 0
              ? Array.from({ length: searchableColumnCount }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-[150px] lg:w-[250px]" />
                ))
              : null}
            {filterableColumnCount > 0
              ? Array.from({ length: filterableColumnCount }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-[70px] border-dashed" />
                ))
              : null}
          </div>
          {showViewOptions ? (
            <Skeleton className="ml-auto hidden h-7 w-[70px] lg:flex" />
          ) : null}
        </div>
      ) : null}
      <div className="border rounded-md">
        <ScrollArea className="h-[calc(80vh-220px)] rounded-md border  md:h-[calc(90dvh-220px)]">
          <Table>
            <TableHeader>
              {Array.from({ length: 1 }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  {Array.from({ length: columnCount }).map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className="w-full h-8" />
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowCount }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  {Array.from({ length: columnCount }).map((_, i) => (
                    <TableCell key={i}>
                      <Skeleton className="w-full h-8" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="flex flex-col items-center justify-between w-full gap-4 px-2 py-1 overflow-auto sm:flex-row sm:gap-8">
        <div className="flex-1">
          <Skeleton className="w-40 h-8" />
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-24 h-8" />
            <Skeleton className="h-8 w-[70px]" />
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            <Skeleton className="w-20 h-8" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="hidden size-8 lg:block" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="hidden size-8 lg:block" />
          </div>
        </div>
      </div>
    </div>
  )
}
