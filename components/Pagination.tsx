"use client"
import { Button } from "@/components/ui/controls/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

export function Pagination({ currentPage, onPrevious, onNext, hasPrevious, hasNext }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-white/20"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-md border border-white/20 font-medium">
        Page {currentPage}
      </span>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={!hasNext}
        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-white/20"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
