// Importation des composants modaux
import LogoutModal from "@/app/(withHeader)/session/[modalType]/_modals/Logout"

import { Modal } from "../../Modal"

// Définition du type pour les paramètres
type Params = {
  modalType: "logout" | "login" | "register"
}

// Map des modaux avec type explicite
const modalComponents: Record<Params["modalType"], React.ReactNode> = {
  logout: <LogoutModal />,
  login: null, // Placeholder pour LoginModal (à remplacer par le vrai composant)
  register: null, // Placeholder pour RegisterModal (à remplacer par le vrai composant)
}

// Fonction principale avec rendu conditionnel
export default function ModalsLobby({ params }: { params: Params }) {
  const { modalType } = params

  const ModalContent = modalComponents[modalType]

  return ModalContent ? <Modal>{ModalContent}</Modal> : null
}
