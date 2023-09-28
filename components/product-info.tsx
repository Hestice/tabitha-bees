"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { getSizeName, getSizeValue, getScentName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Props {
  product: SanityProduct
}

export function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedScent, setSelectedScent] = useState<string | null>(
    product.scent && product.scent.length > 0 ? product.scent[0] : null
  );

  const [quantity, setQuantity] = useState(1)
  const { addItem, incrementItem, cartDetails } = useShoppingCart()
  const { toast } = useToast();
  const isInCart = !!cartDetails?.[product._id]

  const sizeIndex = product.sizes.indexOf(selectedSize)
  const scentIndex = selectedScent !== null ? product.scent.indexOf(selectedScent) : -1
  const equivalentPriceBySize = product.prices[sizeIndex]
  const equivalentPriceByScent = scentIndex !== -1 ? product.prices[scentIndex] : 0
  const equivalentPrice = equivalentPriceByScent || equivalentPriceBySize

  console.log(cartDetails)
  useEffect(() => {
    setQuantity(1);
  }, [selectedSize, selectedScent]);

  function addToCart() {
    
    const item = {
      ...product,
      id: `${product.id}-${selectedSize}${selectedScent !== null ? `-${selectedScent}` : ""}`,
      product_data: {
        size: selectedSize,
        scent: selectedScent !== null ? selectedScent : "No Scent",
        price: equivalentPrice,
      },
    }
    const quantityObject = { count: quantity };
    addItem(item, quantityObject)
    // isInCart ? incrementItem(item._id, quantityObject) : addItem(item, quantityObject)
    console.log(item)

    toast({
      title: `${item.name} (${getSizeName(selectedSize)})`,
      description: `${quantity} Product(s) added to cart`,
      action: (
        <Link href='/cart'>
          <Button variant="link" className="gap-x-2 whitespace-nowrap">
            <span>Open Cart</span>
            <ArrowRight className="h-5 w-5"/>
          </Button>
        </Link>
      )
    })
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">₱{equivalentPrice}</p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{product.description}</div>
      </div>

      <div className="mt-4">
        <p>
          Size: <strong>{getSizeName(selectedSize)}</strong>
          <br />
          Content Weight: <strong>{getSizeValue(selectedSize)}</strong>
          {selectedScent !== null && ( // Check if a scent is selected
          <>
            <br />
            Scent: <strong>{getScentName(selectedScent)}</strong>
          </>
          )}
        </p>
        {product.sizes.map((size) => (
          <Button
            onClick={() => setSelectedSize(size)}
            key={size}
            variant={selectedSize === size ? 'default' : 'outline'}
            className="mr-2 mt-4"
          >
            {getSizeName(size)}
          </Button>
        ))}
      </div>

      {product.scent && product.scent.length > 0 && (
        <div className="mt-4">
          {product.scent.map((scent) => (
            <Button
              onClick={() => setSelectedScent(scent)}
              key={scent}
              variant={selectedScent === scent ? 'default' : 'outline'}
              className="mr-2 mt-4"
            >
              {getScentName(scent)}
            </Button>
          ))}
        </div>
      )}
      <br/>

      <form className="mt-6">
        {/* Quantity input field */}
        <div className="mt-4">
          <label htmlFor="quantity" className="font-medium text-gray-700">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            className="w-16 border rounded-md p-1 ml-2"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
          />
        </div>
        <div className="mt-4 flex">
          <Button
            type="button"
            onClick={addToCart}
            className="w-full bg-yellow-500 py-6 text-base font-medium text-white hover:bg-yellow-600  focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  )
}
