// import Link from "next/link"
// import { buttonVariants } from "@/src/components/ui/button"

// import { siteConfig } from "@/config/site"

// export default function IndexPage() {
//   return (
//     <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
//       <div className="flex max-w-[980px] flex-col items-start gap-2">
//         <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
//           Beautifully designed components <br className="hidden sm:inline" />
//           built with Radix UI and Tailwind CSS.
//         </h1>
//         <p className="max-w-[700px] text-lg text-muted-foreground">
//           Accessible and customizable components that you can copy and paste
//           into your apps. Free. Open Source. And Next.js 13 Ready.
//         </p>
//       </div>
//       <div className="flex gap-4">
//         <Link
//           href={siteConfig.links.docs}
//           target="_blank"
//           rel="noreferrer"
//           className={buttonVariants()}
//         >
//           Documentation
//         </Link>
//         <Link
//           target="_blank"
//           rel="noreferrer"
//           href={siteConfig.links.github}
//           className={buttonVariants({ variant: "outline" })}
//         >
//           GitHub
//         </Link>
//       </div>
//     </section>
//   )
// }

export default function HeroSection() {
  return (
    <div className="px-6 py-12 bg-white lg:px-16">
      <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Texte de la section */}
        <div>
          <button className="px-4 py-2 mb-4 font-medium text-purple-700 transition bg-purple-100 rounded-full hover:bg-purple-200">
            Checkout updates →
          </button>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
            Experience Life <br />
            from home
          </h1>
          <p className="mb-6 text-lg text-gray-600">
            The best experiences, without leaving your home. VR provides
            everything you need to stay sane and safe during the pandemic.
          </p>
          <button className="px-6 py-3 font-medium text-white transition bg-purple-700 rounded-lg hover:bg-purple-800">
            Take me home
          </button>
        </div>

        {/* Images empilées */}
        <div className="grid grid-cols-3 gap-4">
          <img
            src="https://i.pinimg.com/474x/4f/de/a5/4fdea5396fba4bb889d6af862109fe8e.jpg"
            alt="Image 1"
            className="rounded-lg object-cover w-full h-full aspect-[2/3]"
          />
          <div className="space-y-4">
            <img
              src="https://i.pinimg.com/736x/15/d8/59/15d85982ed3030aee5b80d511db7ed70.jpg"
              alt="Image 2"
              className="rounded-lg object-cover w-full h-full aspect-[2/3]"
            />
            <img
              src="https://i.pinimg.com/736x/15/d8/59/15d85982ed3030aee5b80d511db7ed70.jpg"
              alt="Image 3"
              className="rounded-lg object-cover w-full h-full aspect-[2/3]"
            />
          </div>
          <div className="space-y-4">
            <img
              src="https://i.pinimg.com/736x/15/d8/59/15d85982ed3030aee5b80d511db7ed70.jpg"
              alt="Image 4"
              className="rounded-lg object-cover w-full h-full aspect-[2/3]"
            />
            <img
              src="https://i.pinimg.com/736x/15/d8/59/15d85982ed3030aee5b80d511db7ed70.jpg"
              alt="Image 5"
              className="rounded-lg object-cover w-full h-full aspect-[2/3]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
