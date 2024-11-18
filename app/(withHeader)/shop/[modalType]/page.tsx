// Importation des composants modaux
import CartModal from "./_modals/Cart"

// import LoginModal from "./_modals/Login";
// import RegisterModal from "./_modals/Register";
// import NotFoundModal from "./_modals/NotFound"; // Fallback

// Définition du type pour les paramètres
type Params = {
  modalType: "cart"
}

// Fonction principale avec rendu conditionnel
export default function ModalsLobby({ params }: { params: Params }) {
  const { modalType } = params

  // Rendu conditionnel basé sur le type de modalType
  switch (modalType) {
    case "cart":
      return <CartModal />
    // case "login":
    //   return <LoginModal />;
    // case "register":
    //   return <RegisterModal />;
    default:
      // En cas de modalType non pris en charge
      return null
  }
}
