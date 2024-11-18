// Importation des composants modaux
import CartModal from "@/app/(withHeader)/shop/[modalType]/_modals/Cart"

import { Modal } from "../../Modal"

// Définition du type pour les paramètres
type Params = {
  modalType: "cart"
}

// Map des modaux avec type explicite
const modalComponents: Record<Params["modalType"], React.ReactNode> = {
  cart: <CartModal />,
  // login: null, // Placeholder pour LoginModal (à remplacer par le vrai composant)
}

// Fonction principale avec rendu conditionnel
export default function ModalsLobby({ params }: { params: Params }) {
  const { modalType } = params

  const ModalContent = modalComponents[modalType]

  return ModalContent ? <Modal>{ModalContent}</Modal> : null
}
