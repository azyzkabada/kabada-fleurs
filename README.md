# 🌸 Kabada Fleurs - Boutique et Services en Ligne 🌸

Kabada Fleurs est une application web de commerce en ligne offrant une expérience personnalisée pour l'achat de fleurs, cartes cadeaux, et autres services liés aux célébrations et moments spéciaux.

## 📝 Table des Matières

- [🌸 Kabada Fleurs - Boutique et Services en Ligne 🌸](#-kabada-fleurs---boutique-et-services-en-ligne-)
  - [📝 Table des Matières](#-table-des-matières)
  - [🌟 Introduction](#-introduction)
  - [🚀 Fonctionnalités](#-fonctionnalités)
  - [📦 Dépendances](#-dépendances)
  - [🛠️ Installation](#️-installation)
  - [🖥️ Utilisation](#️-utilisation)
  - [🔧 Configuration](#-configuration)
  - [🤝 Contribuer](#-contribuer)
  - [📜 Licence](#-licence)
  - [✍️ Auteur](#️-auteur)

---

## 🌟 Introduction

Kabada Fleurs est conçu pour transformer vos moments spéciaux en expériences mémorables grâce à une interface intuitive et des services modernes. Les fonctionnalités incluent :

- Vente en ligne de fleurs fraîches.
- Achat et envoi de cartes cadeaux.
- Gestion d'utilisateur avec comptes personnalisés.
- Intégrations de paiement et authentification sécurisée.

---

## 🚀 Fonctionnalités

- **Catalogue en ligne** : Parcourez et achetez une large gamme de produits floraux.
- **Cartes cadeaux personnalisées** : Créez et envoyez des cartes cadeaux uniques.
- **Authentification OAuth** : Se connecter via Google, Facebook, GitHub, ou e-mail.
- **Système de notifications** : Suivez vos commandes et recevez des mises à jour.
- **Gestion des comptes** : Historique d'achat, préférences utilisateur, et recommandations.

---

## 📦 Dépendances

Voici quelques-unes des principales bibliothèques utilisées dans le projet :

- **Framework** : Next.js 14
- **Gestion des états** : Zustand
- **UI et Design** : Tailwind CSS, ShadCN avec Radix UI
- **Base de données** : Prisma avec PostgreSQL
- **Sécurité** : OAuthm , Bcryptjs, Jsonwebtoken
- **Autres** : React Hook Form, Lucide Icons, Nodemailer pour les e-mails.

Pour une liste complète, consultez le fichier `package.json`.

---

## 🛠️ Installation

1. Clonez le projet :

   ```bash
   git clone https://github.com/azyzkabada/kabada-fleurs.git
   cd kabada-fleurs
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez les variables d'environnement :

   Créez un fichier `.env` à la racine et ajoutez les clés suivantes (basées sur vos configurations fournies) :

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://hlxsztkqfvxjbrwmmfww.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   NEXTAUTH_SECRET=...
   NEXTAUTH_URL=http://localhost:3000
   .......

   ```

4. Démarrez l'application :

   ```bash
   npm run dev
   ```

   L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## 🖥️ Utilisation

- **Mode développement** : `npm run dev`
- **Construire pour la production** : `npm run build`
- **Prévisualisation de la production** : `npm run preview`
- **Migration Prisma** : `npm run prisma:migrate`

---

## 🔧 Configuration

Pour activer toutes les fonctionnalités, configurez les services suivants :

- **NextAuth** : Configurez les clients OAuth (Google, GitHub, Facebook).
- **Nodemailer** : Gère l'envoi des e-mails via SMTP.

---

## 🤝 Contribuer

Les contributions sont bienvenues ! Voici comment procéder :

1. Forkez le dépôt.
2. Créez une branche : `git checkout -b feature/nom-fonctionnalité`.
3. Apportez vos modifications et committez : `git commit -m "Ajout d'une fonctionnalité XYZ"`.
4. Poussez vos changements : `git push origin feature/nom-fonctionnalité`.
5. Créez une pull request.

---

## 📜 Licence

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus de détails.

---

## ✍️ Auteur

Ce projet a été développé par Azyz Kabada, passionné par le développement web et l'expérience utilisateur.

---

🎉 Merci de choisir **Kabada Fleurs** ! Transformons chaque moment en une célébration spéciale. 🌷
