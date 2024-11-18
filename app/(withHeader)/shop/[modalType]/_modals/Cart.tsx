"use client"

import { useState } from "react"
import Image from "next/image"
import { Icons } from "@/src/components/icons"
import { Button } from "@/src/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Separator } from "@/src/components/ui/separator"
import { useCartStore } from "@/src/store/cart.store"

export default function Cart() {
  // Gestion du store Zustand
  const cart = useCartStore((state) => state.cart)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  // État local pour la taxe
  const [tax, setTax] = useState(0.08)

  // Gestionnaires d'événements
  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity)
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id)
  }

  // Calcul des totaux
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const total = subtotal + subtotal * tax

  return (
    <main className="container flex flex-col gap-8 p-6 mx-auto">
      {/* Titre de la page */}
      <h1 className="text-3xl font-bold">Votre panier</h1>

      {/* Contenu du panier */}
      <section className="grid gap-6">
        {cart.length === 0 ? (
          <div className="py-12 text-center">
            <h2 className="text-xl font-semibold">Votre panier est vide</h2>
            <p className="text-muted-foreground">
              Ajoutez des articles pour commencer vos achats !
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
        )}
      </section>

      {/* Résumé du panier */}
      {cart.length > 0 && (
        <section className="grid gap-4 p-6 bg-gray-100 rounded-lg shadow-sm">
          <CartSummary subtotal={subtotal} tax={tax} total={total} />
        </section>
      )}
    </main>
  )
}

// Composant pour chaque article du panier
function CartItem({
  item,
  onQuantityChange,
  onRemoveItem,
}: {
  item: any
  onQuantityChange: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
      {/* Image du produit */}
      <Image
        src={item?.image || "/placeholder.svg"}
        alt={item.name}
        width={100}
        height={100}
        className="object-cover rounded-md"
        style={{ aspectRatio: "1 / 1" }}
      />

      {/* Informations produit */}
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <div className="flex items-center gap-4 mt-2">
          <Select
            value={item.quantity.toString()}
            onValueChange={(value) =>
              onQuantityChange(item.id, parseInt(value))
            }
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((quantity) => (
                <SelectItem key={quantity} value={quantity.toString()}>
                  {quantity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="font-semibold text-gray-700">
            {(item.price * item.quantity).toFixed(2)} €
          </div>
        </div>
      </div>

      {/* Bouton de suppression */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemoveItem(item.id)}
        aria-label="Supprimer"
      >
        <Icons.trashIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
      </Button>
    </div>
  )
}

// Composant pour le résumé du panier
function CartSummary({
  subtotal,
  tax,
  total,
}: {
  subtotal: number
  tax: number
  total: number
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span>Sous-total</span>
        <span className="font-semibold">{subtotal.toFixed(2)} €</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Taxe ({(tax * 100).toFixed(0)}%)</span>
        <span className="font-semibold">{(subtotal * tax).toFixed(2)} €</span>
      </div>
      <Separator />
      <div className="flex items-center justify-between text-lg font-bold">
        <span>Total</span>
        <span>{total.toFixed(2)} €</span>
      </div>
      <Button size="lg" className="w-full">
        Passer à la caisse
      </Button>
    </>
  )
}
