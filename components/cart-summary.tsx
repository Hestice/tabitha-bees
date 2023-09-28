"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"

export function CartSummary() {
  const {formattedTotalPrice, totalPrice, cartDetails, cartCount } = useShoppingCart()
  console.log("formattedTotalPrice:", formattedTotalPrice)
  console.log("totalPrice: ",totalPrice)
  console.log("cartDetails: ",cartDetails)
  console.log("cartCount: ",cartCount)

  const itemsInCart = Object.values(cartDetails || {})

  const _totalPrice = Object.values(cartDetails || {}).reduce((acc, item) => {
    const productData = item.product_data as { price: number }; 
    if (productData && typeof productData.price === 'number') {
      const price = productData.price;
      return acc + price * item.quantity;
    }
    return acc;
  }, 0);

  function onCheckout() {}

  return (
    <section
      aria-labelledby="summary-heading"
      className="sticky top-20 mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        {itemsInCart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between "
            >
              <dt className="text-sm"> {/* @ts-ignore */}
                {item.name} {item.product_data.size === 'tube' ? null : `- ${item.product_data.size}` } {/* @ts-ignore */}
                {item.product_data.scent === 'No Scent' ? null : `/ ${item.product_data.scent}`} 
                <span className="text-gray-500"> ({item.quantity})</span>
              </dt>
              <dd className="text-sm font-medium">
                {/* @ts-ignore */}
                ₱ {item.product_data.price * item.quantity}
              </dd>
            </div>
          ))}

        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order Total</dt>
          <dd className="text-base font-medium">₱ {_totalPrice}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </Button>
      </div>
    </section>
  )
}
