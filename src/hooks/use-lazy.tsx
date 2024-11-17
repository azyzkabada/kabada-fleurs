"use client"

import React, { ReactNode } from "react"
import { useInView } from "react-intersection-observer"

// Définition des props du composant LazyWrapper
interface LazyWrapperProps {
  children: ReactNode // Contenu à afficher lorsque visible
  threshold?: number // Pourcentage de visibilité nécessaire pour déclencher le rendu (0.1 par défaut)
  triggerOnce?: boolean // Si l'élément doit être rendu seulement une fois (true par défaut)
  fallback?: ReactNode // Contenu à afficher pendant que l'élément est invisible
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  threshold = 0.1,
  triggerOnce = true,
  fallback = null,
}) => {
  const { ref, inView } = useInView({ threshold, triggerOnce })

  return <div ref={ref}>{inView ? children : fallback}</div>
}

export default LazyWrapper
