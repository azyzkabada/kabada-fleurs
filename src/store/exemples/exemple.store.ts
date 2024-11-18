import { create } from "zustand"

// Define the counter state and actions
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

// Create the counter store without persistence
export const useCounterStore = create<CounterState>((set) => ({
  count: 0, // Initial count value

  // Increase the count by 1
  increment: () => set((state) => ({ count: state.count + 1 })),

  // Decrease the count by 1
  decrement: () => set((state) => ({ count: state.count - 1 })),

  // Reset the count to 0
  reset: () => set({ count: 0 }),
}))
