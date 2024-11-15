import Link from "next/link"
import PageContainer from "@/src/components/layout/page-container"
import { buttonVariants } from "@/src/components/ui/button"
import { Heading } from "@/src/components/ui/heading"
import { Separator } from "@/src/components/ui/separator"
import { Employee } from "@/src/constants/data"
import { fakeUsers } from "@/src/constants/mock-api"
import { cn } from "@/src/lib/cn-utils"
import { searchParamsCache } from "@/src/lib/searchparams"
import { Plus } from "lucide-react"

import EmployeeTable from "./employee-tables"

type TEmployeeListingPage = {}

export default async function EmployeeListingPage({}: TEmployeeListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page")
  const search = searchParamsCache.get("q")
  const gender = searchParamsCache.get("gender")
  const pageLimit = searchParamsCache.get("limit")

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(gender && { genders: gender }),
  }

  // mock api call
  const data = await fakeUsers.getUsers(filters)
  const totalUsers = data.total_users
  const employee: Employee[] = data.users

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Employee (${totalUsers})`}
            description="Manage employees (Server side table functionalities.)"
          />

          <Link
            href={"/dashboard/employee/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="w-4 h-4 mr-2" /> Add New
          </Link>
        </div>
        <Separator />
        <EmployeeTable data={employee} totalData={totalUsers} />
      </div>
    </PageContainer>
  )
}
