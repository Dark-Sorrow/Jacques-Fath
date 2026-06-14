"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type Lang = "RU" | "EN" | "FR"

export type MenuSection = {
  label: string
  links: { title: string; href: string }[]
}

export type MenuData = {
  catalog: MenuSection[]
  editorial: MenuSection[]
}

export type Translations = {
  nav: {
    menu: string
    search: string
    account: string
    bag: string
  }
  menu: MenuData
  hero: {
    eyebrow: string
    headline: string[]
    body: string
    cta: string
  }
  collections: {
    women: string
    men: string
    accessories: string
    discover: string
  }
  announcement: {
    address: string
    presentation: string
  }
  maison: {
    headline: string[]
    body: string
    cta: string
  }
  newArrivals: {
    title: string
    viewAll: string
    products: string[]
  }
  heritage: {
    since: string
    headline: string
    body: string
    cta: string
  }
  services: {
    shipping: { title: string; description: string }
    returns: { title: string; description: string }
    shopping: { title: string; description: string }
    madeIn: { title: string; description: string }
  }
  catalog: {
    title: string
    subtitle: string
    filters: string
    sortBy: string
    sortOptions: { value: string; label: string }[]
    categories: { value: string; label: string }[]
    sizes: string[]
    colors: { value: string; label: string }[]
    filterLabels: {
      category: string
      size: string
      color: string
      price: string
    }
    products: {
      id: number
      name: string
      price: string
      category: string
    }[]
    resultsCount: string
    addToBag: string
    wishlist: string
    newLabel: string
  }
  footer: {
    joinTitle: string
    joinBody: string
    emailPlaceholder: string
    newsletter: string
    columns: {
      clientServices: { title: string; links: string[] }
      boutiques: { title: string; links: string[] }
      theHouse: { title: string; links: string[] }
      legal: { title: string; links: string[] }
      followUs: { title: string; links: string[] }
    }
    copyright: string
  }
}

const translations: Record<Lang, Translations> = {
  EN: {
    nav: {
      menu: "MENU",
      search: "SEARCH",
      account: "ACCOUNT",
      bag: "BAG (0)",
    },
    menu: {
      catalog: [
        { label: "WOMEN", links: [{ title: "New Arrivals", href: "/catalog" }, { title: "Dresses", href: "/catalog" }, { title: "Coats & Jackets", href: "/catalog" }, { title: "Tops & Blouses", href: "/catalog" }, { title: "Trousers & Skirts", href: "/catalog" }, { title: "Knitwear", href: "/catalog" }, { title: "Evening Wear", href: "/catalog" }] },
        { label: "MEN", links: [{ title: "New Arrivals", href: "/catalog" }, { title: "Suits", href: "/catalog" }, { title: "Coats & Jackets", href: "/catalog" }, { title: "Shirts", href: "/catalog" }, { title: "Trousers", href: "/catalog" }, { title: "Knitwear", href: "/catalog" }, { title: "Tailoring", href: "/catalog" }] },
        { label: "ACCESSORIES", links: [{ title: "Bags", href: "/catalog" }, { title: "Shoes", href: "/catalog" }, { title: "Scarves & Silk", href: "/catalog" }, { title: "Jewellery", href: "/catalog" }, { title: "Belts", href: "/catalog" }, { title: "Cufflinks", href: "/catalog" }] },
        { label: "COLLECTIONS", links: [{ title: "Couture", href: "/catalog" }, { title: "Prêt-à-Porter", href: "/catalog" }, { title: "Resort", href: "/catalog" }, { title: "Archive", href: "/catalog" }, { title: "View All", href: "/catalog" }] },
      ],
      editorial: [
        { label: "MAISON", links: [{ title: "Our Story", href: "/" }, { title: "Jacques Fath", href: "/" }, { title: "Heritage & Archives", href: "/" }, { title: "Savoir-Faire", href: "/" }] },
        { label: "NEWS", links: [{ title: "Latest News", href: "/news" }, { title: "Shows & Events", href: "/" }, { title: "Press", href: "/" }, { title: "Collaborations", href: "/" }] },
        { label: "SERVICES", links: [{ title: "Personal Shopping", href: "/" }, { title: "Bespoke", href: "/" }, { title: "Boutiques", href: "/" }, { title: "Book an Appointment", href: "/" }] },
      ],
    },
    hero: {
      eyebrow: "Maison Jacques Fath",
      headline: ["TIMELESS", "FRENCH ELEGANCE"],
      body: "Discover the Maison Jacques Fath online boutique and explore our new collection.",
      cta: "SHOP THE COLLECTION",
    },
    collections: {
      women: "WOMEN",
      men: "MEN",
      accessories: "ACCESSORIES",
      discover: "Discover",
    },
    announcement: {
      address: "11 May 2026 — Maison de couture has reopened at:",
      presentation: "The presentation of the renewed house will take place on 6 September 2026",
    },
    maison: {
      headline: ["THE ESSENCE", "OF PARISIAN", "COUTURE"],
      body: "Rooted in heritage. Defined by modernity. Jacques Fath continues to shape the language of elegance with a timeless vision.",
      cta: "DISCOVER THE HOUSE",
    },
    newArrivals: {
      title: "NEW ARRIVALS",
      viewAll: "VIEW ALL",
      products: ["EVENING DRESS", "LEATHER BAG", "WOOL COAT", "SILK TOP", "LEATHER LOAFERS"],
    },
    heritage: {
      since: "Since 1937",
      headline: "AN ICONIC HERITAGE",
      body: "Since 1937, Maison Jacques Fath has embodied the spirit of Parisian couture with boldness, refinement and vision.",
      cta: "EXPLORE OUR HISTORY",
    },
    services: {
      shipping: {
        title: "COMPLIMENTARY SHIPPING",
        description: "Enjoy complimentary shipping on all orders.",
      },
      returns: {
        title: "EASY RETURNS",
        description: "Complimentary returns within 30 days.",
      },
      shopping: {
        title: "PERSONAL SHOPPING",
        description: "Book an appointment with our style advisors.",
      },
      madeIn: {
        title: "MADE IN FRANCE",
        description: "Crafted with exceptional savoir-faire in France.",
      },
    },
    catalog: {
      title: "COLLECTION",
      subtitle: "New Season 2026",
      filters: "FILTERS",
      sortBy: "SORT BY",
      sortOptions: [
        { value: "newest", label: "Newest First" },
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
      ],
      categories: [
        { value: "all", label: "All Pieces" },
        { value: "dresses", label: "Dresses" },
        { value: "coats", label: "Coats & Jackets" },
        { value: "tops", label: "Tops & Blouses" },
        { value: "trousers", label: "Trousers & Skirts" },
        { value: "knitwear", label: "Knitwear" },
        { value: "bags", label: "Bags" },
        { value: "shoes", label: "Shoes" },
        { value: "accessories", label: "Accessories" },
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: [
        { value: "ivory", label: "Ivory" },
        { value: "noir", label: "Noir" },
        { value: "beige", label: "Beige" },
        { value: "camel", label: "Camel" },
        { value: "bordeaux", label: "Bordeaux" },
      ],
      filterLabels: {
        category: "CATEGORY",
        size: "SIZE",
        color: "COLOR",
        price: "PRICE",
      },
      products: [
        { id: 1, name: "Silk Evening Dress", price: "€ 3 200", category: "dresses" },
        { id: 2, name: "Cashmere Wrap Coat", price: "€ 4 800", category: "coats" },
        { id: 3, name: "Structured Leather Bag", price: "€ 2 100", category: "bags" },
        { id: 4, name: "Pleated Chiffon Blouse", price: "€ 890", category: "tops" },
        { id: 5, name: "Wide-Leg Wool Trousers", price: "€ 1 450", category: "trousers" },
        { id: 6, name: "Merino Turtleneck", price: "€ 760", category: "knitwear" },
        { id: 7, name: "Leather Pumps", price: "€ 1 100", category: "shoes" },
        { id: 8, name: "Belted Midi Dress", price: "€ 2 700", category: "dresses" },
        { id: 9, name: "Double-Breasted Blazer", price: "€ 3 400", category: "coats" },
        { id: 10, name: "Chain Minaudière", price: "€ 1 800", category: "bags" },
        { id: 11, name: "Silk Slip Skirt", price: "€ 1 200", category: "trousers" },
        { id: 12, name: "Fine-Knit Cardigan", price: "€ 980", category: "knitwear" },
      ],
      resultsCount: "pieces",
      addToBag: "ADD TO BAG",
      wishlist: "Save",
      newLabel: "NEW",
    },
    footer: {
      joinTitle: "JOIN THE MAISON",
      joinBody: "Subscribe to our newsletter and be the first to discover new collections, exclusive items, and private events.",
      emailPlaceholder: "Enter your email",
      newsletter: "Subscribe",
      columns: {
        clientServices: {
          title: "CLIENT SERVICES",
          links: ["Contact Us", "Shipping & Delivery", "Returns & Exchanges", "FAQ"],
        },
        boutiques: {
          title: "BOUTIQUES",
          links: ["Paris", "New York", "London", "Tokyo"],
        },
        theHouse: {
          title: "THE HOUSE",
          links: ["Our Story", "Heritage", "Savoir-Faire", "News"],
        },
        legal: {
          title: "LEGAL",
          links: ["Terms & Conditions", "Privacy Policy", "Cookies"],
        },
        followUs: {
          title: "FOLLOW US",
          links: ["Instagram", "Facebook", "Pinterest"],
        },
      },
      copyright: "© MAISON JACQUES FATH 2024",
    },
  },
  FR: {
    nav: {
      menu: "MENU",
      search: "RECHERCHER",
      account: "COMPTE",
      bag: "PANIER (0)",
    },
    menu: {
      catalog: [
        { label: "FEMME", links: [{ title: "Nouvelles Arrivées", href: "/catalog" }, { title: "Robes", href: "/catalog" }, { title: "Manteaux & Vestes", href: "/catalog" }, { title: "Tops & Blouses", href: "/catalog" }, { title: "Pantalons & Jupes", href: "/catalog" }, { title: "Maille", href: "/catalog" }, { title: "Tenues de Soirée", href: "/catalog" }] },
        { label: "HOMME", links: [{ title: "Nouvelles Arrivées", href: "/catalog" }, { title: "Costumes", href: "/catalog" }, { title: "Manteaux & Vestes", href: "/catalog" }, { title: "Chemises", href: "/catalog" }, { title: "Pantalons", href: "/catalog" }, { title: "Maille", href: "/catalog" }, { title: "Tailleur", href: "/catalog" }] },
        { label: "ACCESSOIRES", links: [{ title: "Sacs", href: "/catalog" }, { title: "Chaussures", href: "/catalog" }, { title: "Foulards & Soie", href: "/catalog" }, { title: "Bijoux", href: "/catalog" }, { title: "Ceintures", href: "/catalog" }, { title: "Boutons de Manchette", href: "/catalog" }] },
        { label: "COLLECTIONS", links: [{ title: "Couture", href: "/catalog" }, { title: "Prêt-à-Porter", href: "/catalog" }, { title: "Resort", href: "/catalog" }, { title: "Archives", href: "/catalog" }, { title: "Tout Voir", href: "/catalog" }] },
      ],
      editorial: [
        { label: "MAISON", links: [{ title: "Notre Histoire", href: "/" }, { title: "Jacques Fath", href: "/" }, { title: "Héritage & Archives", href: "/" }, { title: "Savoir-Faire", href: "/" }] },
        { label: "ACTUALITÉS", links: [{ title: "Dernières Nouvelles", href: "/news" }, { title: "Défilés & Événements", href: "/" }, { title: "Presse", href: "/" }, { title: "Collaborations", href: "/" }] },
        { label: "SERVICES", links: [{ title: "Shopping Personnalisé", href: "/" }, { title: "Sur-Mesure", href: "/" }, { title: "Boutiques", href: "/" }, { title: "Prendre Rendez-vous", href: "/" }] },
      ],
    },
    hero: {
      eyebrow: "Maison Jacques Fath",
      headline: ["ÉLÉGANCE", "FRANÇAISE INTEMPORELLE"],
      body: "Découvrez la boutique en ligne de la Maison Jacques Fath et explorez notre nouvelle collection.",
      cta: "ACHETER LA COLLECTION",
    },
    collections: {
      women: "FEMME",
      men: "HOMME",
      accessories: "ACCESSOIRES",
      discover: "Découvrir",
    },
    announcement: {
      address: "11 mai 2026 — La Maison de couture a rouvert ses portes au :",
      presentation: "La présentation de la maison renouvelée aura lieu le 6 septembre 2026",
    },
    maison: {
      headline: ["L'ESSENCE DE", "LA COUTURE", "PARISIENNE"],
      body: "Ancrée dans l'héritage. Définie par la modernité. Jacques Fath continue de façonner le langage de l'élégance avec une vision intemporelle.",
      cta: "DÉCOUVRIR LA MAISON",
    },
    newArrivals: {
      title: "NOUVELLES ARRIVÉES",
      viewAll: "VOIR TOUT",
      products: ["ROBE DU SOIR", "SAC EN CUIR", "MANTEAU EN LAINE", "HAUT EN SOIE", "MOCASSINS EN CUIR"],
    },
    heritage: {
      since: "Depuis 1937",
      headline: "UN HÉRITAGE ICONIQUE",
      body: "Depuis 1937, la Maison Jacques Fath incarne l'esprit de la couture parisienne avec audace, raffinement et vision.",
      cta: "EXPLORER NOTRE HISTOIRE",
    },
    services: {
      shipping: {
        title: "LIVRAISON OFFERTE",
        description: "Profitez de la livraison offerte sur toutes les commandes.",
      },
      returns: {
        title: "RETOURS FACILES",
        description: "Retours gratuits sous 30 jours.",
      },
      shopping: {
        title: "SHOPPING PERSONNALISÉ",
        description: "Prenez rendez-vous avec nos conseillers de style.",
      },
      madeIn: {
        title: "FABRIQUÉ EN FRANCE",
        description: "Confectionné avec un savoir-faire exceptionnel en France.",
      },
    },
    catalog: {
      title: "COLLECTION",
      subtitle: "Nouvelle Saison 2026",
      filters: "FILTRES",
      sortBy: "TRIER PAR",
      sortOptions: [
        { value: "newest", label: "Plus Récents" },
        { value: "price-asc", label: "Prix Croissant" },
        { value: "price-desc", label: "Prix Décroissant" },
      ],
      categories: [
        { value: "all", label: "Toutes les Pièces" },
        { value: "dresses", label: "Robes" },
        { value: "coats", label: "Manteaux & Vestes" },
        { value: "tops", label: "Tops & Blouses" },
        { value: "trousers", label: "Pantalons & Jupes" },
        { value: "knitwear", label: "Maille" },
        { value: "bags", label: "Sacs" },
        { value: "shoes", label: "Chaussures" },
        { value: "accessories", label: "Accessoires" },
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: [
        { value: "ivory", label: "Ivoire" },
        { value: "noir", label: "Noir" },
        { value: "beige", label: "Beige" },
        { value: "camel", label: "Camel" },
        { value: "bordeaux", label: "Bordeaux" },
      ],
      filterLabels: {
        category: "CATÉGORIE",
        size: "TAILLE",
        color: "COULEUR",
        price: "PRIX",
      },
      products: [
        { id: 1, name: "Robe du Soir en Soie", price: "€ 3 200", category: "dresses" },
        { id: 2, name: "Manteau Enveloppant Cachemire", price: "€ 4 800", category: "coats" },
        { id: 3, name: "Sac en Cuir Structuré", price: "€ 2 100", category: "bags" },
        { id: 4, name: "Blouse en Mousseline Plissée", price: "€ 890", category: "tops" },
        { id: 5, name: "Pantalon Large en Laine", price: "€ 1 450", category: "trousers" },
        { id: 6, name: "Col Roulé en Mérinos", price: "€ 760", category: "knitwear" },
        { id: 7, name: "Escarpins en Cuir", price: "€ 1 100", category: "shoes" },
        { id: 8, name: "Robe Midi Ceinturée", price: "€ 2 700", category: "dresses" },
        { id: 9, name: "Blazer Croisé", price: "€ 3 400", category: "coats" },
        { id: 10, name: "Minaudière à Chaîne", price: "€ 1 800", category: "bags" },
        { id: 11, name: "Jupe Lingerie en Soie", price: "€ 1 200", category: "trousers" },
        { id: 12, name: "Cardigan en Fine Maille", price: "€ 980", category: "knitwear" },
      ],
      resultsCount: "pièces",
      addToBag: "AJOUTER AU PANIER",
      wishlist: "Sauvegarder",
      newLabel: "NOUVEAU",
    },
    footer: {
      joinTitle: "REJOINDRE LA MAISON",
      joinBody: "Abonnez-vous à notre newsletter et soyez le premier à découvrir les nouvelles collections, les articles exclusifs et les événements privés.",
      emailPlaceholder: "Entrez votre email",
      newsletter: "S'abonner",
      columns: {
        clientServices: {
          title: "SERVICE CLIENT",
          links: ["Nous contacter", "Livraison", "Retours & Échanges", "FAQ"],
        },
        boutiques: {
          title: "BOUTIQUES",
          links: ["Paris", "New York", "Londres", "Tokyo"],
        },
        theHouse: {
          title: "LA MAISON",
          links: ["Notre Histoire", "Héritage", "Savoir-Faire", "Actualités"],
        },
        legal: {
          title: "LÉGAL",
          links: ["Conditions Générales", "Politique de Confidentialité", "Cookies"],
        },
        followUs: {
          title: "NOUS SUIVRE",
          links: ["Instagram", "Facebook", "Pinterest"],
        },
      },
      copyright: "© MAISON JACQUES FATH 2024",
    },
  },
  RU: {
    nav: {
      menu: "МЕНЮ",
      search: "ПОИСК",
      account: "АККАУНТ",
      bag: "КОРЗИНА (0)",
    },
    menu: {
      catalog: [
        { label: "ЖЕНЩИНАМ", links: [{ title: "Новые Поступления", href: "/catalog" }, { title: "Платья", href: "/catalog" }, { title: "Пальто и Жакеты", href: "/catalog" }, { title: "Топы и Блузки", href: "/catalog" }, { title: "Брюки и Юбки", href: "/catalog" }, { title: "Трикотаж", href: "/catalog" }, { title: "Вечерние Наряды", href: "/catalog" }] },
        { label: "МУЖЧИНАМ", links: [{ title: "Новые Поступления", href: "/catalog" }, { title: "Костюмы", href: "/catalog" }, { title: "Пальто и Жакеты", href: "/catalog" }, { title: "Рубашки", href: "/catalog" }, { title: "Брюки", href: "/catalog" }, { title: "Трикотаж", href: "/catalog" }, { title: "Пошив", href: "/catalog" }] },
        { label: "АКСЕССУАРЫ", links: [{ title: "Сумки", href: "/catalog" }, { title: "Обувь", href: "/catalog" }, { title: "Платки и Шёлк", href: "/catalog" }, { title: "Украшения", href: "/catalog" }, { title: "Ремни", href: "/catalog" }, { title: "Запонки", href: "/catalog" }] },
        { label: "КОЛЛЕКЦИИ", links: [{ title: "Кутюр", href: "/catalog" }, { title: "Прет-а-порте", href: "/catalog" }, { title: "Резорт", href: "/catalog" }, { title: "Архив", href: "/catalog" }, { title: "Смотреть Все", href: "/catalog" }] },
      ],
      editorial: [
        { label: "MAISON", links: [{ title: "Наша История", href: "/" }, { title: "Jacques Fath", href: "/" }, { title: "Наследие и Архив", href: "/" }, { title: "Мастерство", href: "/" }] },
        { label: "НОВОСТИ", links: [{ title: "Последние Новости", href: "/news" }, { title: "Показы и События", href: "/" }, { title: "Пресса", href: "/" }, { title: "Коллаборации", href: "/" }] },
        { label: "СЕРВИС", links: [{ title: "Персональный Шопинг", href: "/" }, { title: "На Заказ", href: "/" }, { title: "Бутики", href: "/" }, { title: "Записаться на Приём", href: "/" }] },
      ],
    },
    hero: {
      eyebrow: "Maison Jacques Fath",
      headline: ["ВЕЧНА��", "ФРАНЦУЗСКАЯ ЭЛЕГАНТНОСТЬ"],
      body: "Откройте для себя интернет-бутик Maison Jacques Fath и изучите нашу новую коллекцию.",
      cta: "СМОТРЕТЬ КОЛЛЕКЦИЮ",
    },
    collections: {
      women: "ЖЕНЩИНАМ",
      men: "МУЖЧИНАМ",
      accessories: "АКСЕССУАРЫ",
      discover: "Открыть",
    },
    announcement: {
      address: "11 мая 2026 — Maison de couture возобновил работу по адресу:",
      presentation: "Презентация обновлённого дома состоится 6 сентября 2026 года",
    },
    maison: {
      headline: ["СУТЬ", "ПАРИЖСКОЙ", "КУТЮРЫ"],
      body: "Укоренённый в традиции. Определённый современностью. Jacques Fath продолжает формировать язык элегантности с вечным видением.",
      cta: "ОТКРЫТЬ ДОМ",
    },
    newArrivals: {
      title: "НОВЫЕ ПОСТУПЛЕНИЯ",
      viewAll: "СМОТРЕТЬ ВСЕ",
      products: ["ВЕЧЕРНЕЕ ПЛАТЬЕ", "КОЖАНАЯ СУМКА", "ШЕРСТЯНОЕ ПАЛЬТО", "ШЁЛКОВЫЙ ТОП", "КОЖАНЫЕ ЛОФЕРЫ"],
    },
    heritage: {
      since: "С 1937 года",
      headline: "ИКОНИЧЕСКОЕ НАСЛЕДИЕ",
      body: "С 1937 года Maison Jacques Fath воплощает дух парижской кутюры со смелостью, утончённостью и видением.",
      cta: "УЗНАТЬ ИСТОРИЮ",
    },
    services: {
      shipping: {
        title: "БЕСПЛАТНАЯ ДОСТАВКА",
        description: "Наслаждайтесь бесплатной доставкой по всем заказам.",
      },
      returns: {
        title: "ЛЁГКИЙ ВОЗВРАТ",
        description: "Бесплатный возврат в течение 30 дней.",
      },
      shopping: {
        title: "ПЕРСОНАЛЬНЫЙ ШОПИНГ",
        description: "Запишитесь на встречу с нашими стилистами.",
      },
      madeIn: {
        title: "СДЕЛАНО ВО ФРАНЦИИ",
        description: "Изготовлено с исключительным мастерством во Фра��ции.",
      },
    },
    catalog: {
      title: "КОЛЛЕКЦИЯ",
      subtitle: "Новый Сезон 2026",
      filters: "ФИЛЬТРЫ",
      sortBy: "СОРТИРОВКА",
      sortOptions: [
        { value: "newest", label: "Сначала Новые" },
        { value: "price-asc", label: "Цена: По возрастанию" },
        { value: "price-desc", label: "Цена: По убыванию" },
      ],
      categories: [
        { value: "all", label: "Все Пози��ии" },
        { value: "dresses", label: "Платья" },
        { value: "coats", label: "Пальто и Жакеты" },
        { value: "tops", label: "Топы и Блузки" },
        { value: "trousers", label: "Брюки и Юбки" },
        { value: "knitwear", label: "Трикотаж" },
        { value: "bags", label: "Сумки" },
        { value: "shoes", label: "Обувь" },
        { value: "accessories", label: "Аксессуары" },
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: [
        { value: "ivory", label: "Слоновая Кость" },
        { value: "noir", label: "Чёрный" },
        { value: "beige", label: "Бежевый" },
        { value: "camel", label: "Кэмел" },
        { value: "bordeaux", label: "Бордо" },
      ],
      filterLabels: {
        category: "КАТЕГОРИЯ",
        size: "РАЗМЕР",
        color: "ЦВЕТ",
        price: "ЦЕНА",
      },
      products: [
        { id: 1, name: "Вечернее Платье из Шёлка", price: "€ 3 200", category: "dresses" },
        { id: 2, name: "Кашемировое Пальто", price: "€ 4 800", category: "coats" },
        { id: 3, name: "Структурированная Кожаная Сумка", price: "€ 2 100", category: "bags" },
        { id: 4, name: "Плиссированная Блуза из Шифона", price: "€ 890", category: "tops" },
        { id: 5, name: "Широкие Шерстяные Брюки", price: "€ 1 450", category: "trousers" },
        { id: 6, name: "Водолазка из Мериноса", price: "€ 760", category: "knitwear" },
        { id: 7, name: "Кожаные Т��фли", price: "€ 1 100", category: "shoes" },
        { id: 8, name: "Платье Миди с Поясом", price: "€ 2 700", category: "dresses" },
        { id: 9, name: "Двубортный Блейзер", price: "€ 3 400", category: "coats" },
        { id: 10, name: "Минодьер на Цепочке", price: "€ 1 800", category: "bags" },
        { id: 11, name: "Шёлковая Юбка-комбинация", price: "€ 1 200", category: "trousers" },
        { id: 12, name: "Кардиган тонкой вязки", price: "€ 980", category: "knitwear" },
      ],
      resultsCount: "позиций",
      addToBag: "В КОРЗИНУ",
      wishlist: "Сохранить",
      newLabel: "НОВИНКА",
    },
    footer: {
      joinTitle: "ПРИСОЕДИНИТЬСЯ К MAISON",
      joinBody: "Подпишитесь на нашу рассылку и первыми узнайте о новых коллекциях, эксклюзивных предметах и частных мероприятиях.",
      emailPlaceholder: "Введите ваш email",
      newsletter: "Подписаться",
      columns: {
        clientServices: {
          title: "СЕРВИС",
          links: ["Связаться с нами", "Доставка", "Возвраты", "Вопросы"],
        },
        boutiques: {
          title: "БУТИКИ",
          links: ["Париж", "Нью-Йорк", "Лондон", "Токио"],
        },
        theHouse: {
          title: "ДОМ",
          links: ["Наша история", "Наследие", "Мастерство", "Новости"],
        },
        legal: {
          title: "ПРАВОВОЕ",
          links: ["Условия использования", "Политика конфиденциальности", "Cookies"],
        },
        followUs: {
          title: "МЫ В СЕТИ",
          links: ["Instagram", "Facebook", "Pinterest"],
        },
      },
      copyright: "© MAISON JACQUES FATH 2024",
    },
  },
}

type LangContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("EN")
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used within LangProvider")
  return ctx
}
