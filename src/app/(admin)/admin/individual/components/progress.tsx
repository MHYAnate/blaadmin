"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  className?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    // Ensure value is within bounds
    const normalizedValue = Math.min(Math.max(value, 0), max)
    const percentage = (normalizedValue / max) * 100

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={normalizedValue}
        aria-valuetext={`${Math.round(percentage)}%`}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
        {...props}
      >
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{
            width: `${percentage}%`,
            transform: `translateX(0%)`,
          }}
        />
      </div>
    )
  },
)

Progress.displayName = "Progress"

export { Progress }
