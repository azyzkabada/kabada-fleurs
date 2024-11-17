import { createSearchParamsCache, parseAsBoolean } from "nuqs/server"

export const sidebarCache = createSearchParamsCache({
  isOpen: parseAsBoolean.withDefault(false), // Par défaut, la sidebar est fermée
})
