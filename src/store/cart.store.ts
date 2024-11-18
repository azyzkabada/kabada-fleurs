import { StateCreator, create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

// Define the structure of a cart item
interface CartItem {
  id: string
  price: number
  image: string
  name: string
  quantity: number
  // Add other properties as needed
}

// Define the cart state and actions
interface CartState {
  cart: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

// Create the cart store with persistence
export const useCartStore = create<CartState>(
  persist(
    (set, get) => ({
      cart: [], // Initialize the cart as an empty array

      // Add an item to the cart
      addItem: (item) => {
        const cart = get().cart
        // Check if the item already exists in the cart
        const existingItem = cart.find((i) => i.id === item.id)

        if (existingItem) {
          // If it exists, increase its quantity
          set({
            cart: cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          })
        } else {
          // If not, add it to the cart with quantity 1
          set({
            cart: [...cart, { ...item, quantity: 1 }],
          })
        }
      },

      // Remove an item from the cart by its ID
      removeItem: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        })
      },

      // Update the quantity of a specific item
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          // Remove the item if the quantity is zero or less
          get().removeItem(id)
        } else {
          // Update the item's quantity
          set({
            cart: get().cart.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          })
        }
      },

      // Clear all items from the cart
      clearCart: () => {
        set({ cart: [] })
      },

      // Get the total number of items in the cart
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },

      // Calculate the total price of all items in the cart
      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: "cart-storage", // Unique name for storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  ) as StateCreator<CartState>
)
