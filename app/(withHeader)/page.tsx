import LazyWrapper from "@/src/hooks/use-lazy"

import CategoriesBar from "@/app/(withHeader)/_homepage/CategoriesBar"
import CategoriesSection from "@/app/(withHeader)/_homepage/CategoriesSection"
import HeroSection from "@/app/(withHeader)/_homepage/HeroSection"
import ProductsSection from "@/app/(withHeader)/_homepage/ProductsSection"

export default function IndexPage() {
  return (
    <>
      {" "}
      <CategoriesBar />
      {/* HeroSection */}
      <HeroSection />
      {/* CategoriesSection */}
      <CategoriesSection />
      {/* ProductSection */}
      <LazyWrapper fallback={<p>loading</p>}>
        <ProductsSection />
      </LazyWrapper>
    </>
  )
}
