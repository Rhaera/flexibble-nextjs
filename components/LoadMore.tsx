"use client"

import { useRouter } from "next/navigation"
import Button from "./Button"

type LoadMoreParams = {
  startCursor: string,
  endCursor: string,
  hasPreviousPage: boolean,
  hasNextPage: boolean
}

const LoadMore = ({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage
}: LoadMoreParams) => {
  const router = useRouter()
  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search)
    if (direction === "next" && hasNextPage) {
      currentParams.delete("startcursor")
      currentParams.set("endcursor", endCursor)
    }
    if (direction === "first" && hasPreviousPage) {
      currentParams.delete("endcursor")
      currentParams.set("startcursor", startCursor)
    }
    router.push(`${window.location.pathname}?${currentParams.toString()}`)
  }
  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button title="First Page" handleClick={() => handleNavigation("first")} />
      )}
      {hasNextPage && (
        <Button title="Next" handleClick={() => handleNavigation("next")} />
      )}
    </div>
  )
}

export default LoadMore
