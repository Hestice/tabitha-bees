"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { getSizeName } from "@/lib/utils"
import { getSizeValue } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Props {
  product: SanityProduct
}

export function ProductInfo({product}:Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const sizeIndex = product.sizes.indexOf(selectedSize)
  function addToCart() {}
  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">₱{product.prices[sizeIndex]}</p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{product.description}</div>
      </div>

      <div className="mt-4">
        <p>
          Size: <strong>{getSizeName(selectedSize)}</strong>
          <br/>
          Content Weight: <strong>{getSizeValue(selectedSize)}</strong>
        </p>
        {product.sizes.map((size) => (
          <Button onClick={()=> 
            setSelectedSize(size)}
          key={size} variant={selectedSize === size ? 'default' : 'outline'} className="mr-2 mt-4">
            {getSizeName(size)}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            type="button"
            className="w-full bg-yellow-500 py-6 text-base font-medium text-white hover:bg-yellow-600  focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  )
}
