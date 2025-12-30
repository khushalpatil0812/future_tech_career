import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h2>
      <p className="text-muted-foreground mb-8">Oops! The page you are looking for doesn't exist.</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
