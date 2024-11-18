import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

// Define the counter state and actions
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

// Create the counter store with persistence
export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0, // Initial count value

      // Increase the count by 1
      increment: () => set((state) => ({ count: state.count + 1 })),

      // Decrease the count by 1
      decrement: () => set((state) => ({ count: state.count - 1 })),

      // Reset the count to 0
      reset: () => set({ count: 0 }),
    }),
    {
      name: "counter-storage", // Unique name for storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
)
