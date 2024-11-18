import Image from "next/image"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

type CardWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  headerTitle: string
  headerDescription: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
  heroImage?: string
}

export const CardWrapper = (props: CardWrapperProps) => {
  const {
    heroImage,
    headerTitle,
    headerDescription,
    backButtonLabel,
    backButtonHref,
    showSocial,
    children,
    ...rest
  } = props

  return (
    <Card className="w-[400px] shadow mx-4 md:mx-0" {...rest}>
      {heroImage ? (
        <div className="relative w-1/4 pt-6 mx-auto">
          <Image
            src={heroImage}
            alt="Hero Image"
            width={24}
            height={24}
            className="relative w-full h-full max-w-md select-none"
          />
        </div>
      ) : null}
      <CardHeader className="text-center">
        <CardTitle>{headerTitle}</CardTitle>
        <CardDescription>{headerDescription}</CardDescription>
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}

      <CardFooter className="py-3">
        <Button
          variant="link"
          className="w-full text-sm font-bold"
          size="sm"
          asChild
        >
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
