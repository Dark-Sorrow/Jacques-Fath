"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type Lang = "RU" | "EN" | "FR"

export type MegaMenuColumn = {
  title: string
  links: string[]
}

export type MegaMenuData = {
  women: MegaMenuColumn[]
  men: MegaMenuColumn[]
  house: MegaMenuColumn[]
}

export type Translations = {
  nav: {
    women: string
    men: string
    house: string
    search: string
    account: string
    bag: string
  }
  megaMenu: MegaMenuData
  hero: {
    eyebrow: string
    headline: string[]
    body: string
    cta: string
  }
  collections: {
    women: string
    men: string
    house: string
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
      women: "WOMEN",
      men: "MEN",
      house: "HOUSE",
      search: "SEARCH",
      account: "ACCOUNT",
      bag: "BAG (0)",
    },
    megaMenu: {
      women: [
        { title: "NEW IN", links: ["New Arrivals", "View All"] },
        { title: "CLOTHING", links: ["Dresses", "Coats & Jackets", "Tops & Blouses", "Trousers & Skirts", "Knitwear", "Evening Wear"] },
        { title: "ACCESSORIES", links: ["Bags", "Shoes", "Scarves & Silk", "Jewellery", "Belts"] },
        { title: "COLLECTIONS", links: ["Couture", "Prêt-à-Porter", "Resort", "Archive"] },
      ],
      men: [
        { title: "NEW IN", links: ["New Arrivals", "View All"] },
        { title: "CLOTHING", links: ["Suits", "Coats & Jackets", "Shirts", "Trousers", "Knitwear", "Tailoring"] },
        { title: "ACCESSORIES", links: ["Bags", "Shoes", "Ties & Pocket Squares", "Belts", "Cufflinks"] },
        { title: "COLLECTIONS", links: ["Couture", "Prêt-à-Porter", "Resort", "Archive"] },
      ],
      house: [
        { title: "THE HOUSE", links: ["Our Story", "Heritage", "Jacques Fath"] },
        { title: "SAVOIR-FAIRE", links: ["Couture Ateliers", "Materials", "Archive"] },
        { title: "NEWS", links: ["Latest News", "Events", "Press"] },
        { title: "SERVICES", links: ["Personal Shopping", "Bespoke", "Boutiques"] },
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
      house: "THE HOUSE",
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
      women: "FEMME",
      men: "HOMME",
      house: "MAISON",
      search: "RECHERCHER",
      account: "COMPTE",
      bag: "PANIER (0)",
    },
    megaMenu: {
      women: [
        { title: "NOUVEAUTÉS", links: ["Nouvelles Arrivées", "Tout Voir"] },
        { title: "VÊTEMENTS", links: ["Robes", "Manteaux & Vestes", "Tops & Blouses", "Pantalons & Jupes", "Maille", "Tenues de Soirée"] },
        { title: "ACCESSOIRES", links: ["Sacs", "Chaussures", "Foulards & Soie", "Bijoux", "Ceintures"] },
        { title: "COLLECTIONS", links: ["Couture", "Prêt-à-Porter", "Resort", "Archives"] },
      ],
      men: [
        { title: "NOUVEAUTÉS", links: ["Nouvelles Arrivées", "Tout Voir"] },
        { title: "VÊTEMENTS", links: ["Costumes", "Manteaux & Vestes", "Chemises", "Pantalons", "Maille", "Tailleur"] },
        { title: "ACCESSOIRES", links: ["Sacs", "Chaussures", "Cravates & Pochettes", "Ceintures", "Boutons de Manchette"] },
        { title: "COLLECTIONS", links: ["Couture", "Prêt-à-Porter", "Resort", "Archives"] },
      ],
      house: [
        { title: "LA MAISON", links: ["Notre Histoire", "Héritage", "Jacques Fath"] },
        { title: "SAVOIR-FAIRE", links: ["Ateliers Couture", "Matières", "Archives"] },
        { title: "ACTUALITÉS", links: ["Dernières Nouvelles", "Événements", "Presse"] },
        { title: "SERVICES", links: ["Shopping Personnalisé", "Sur-Mesure", "Boutiques"] },
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
      house: "LA MAISON",
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
      women: "ЖЕНЩИНАМ",
      men: "МУЖЧИНАМ",
      house: "ДОМ",
      search: "ПОИСК",
      account: "АККАУНТ",
      bag: "КОРЗИНА (0)",
    },
    megaMenu: {
      women: [
        { title: "НОВИНКИ", links: ["Новые Поступления", "Смотреть Все"] },
        { title: "ОДЕЖДА", links: ["Платья", "Пальто и Жакеты", "Топы и Блузки", "Брюки и Юбки", "Трикотаж", "Вечерние Наряды"] },
        { title: "АКСЕССУАРЫ", links: ["Сумки", "Обувь", "Платки и Шёлк", "Украшения", "Ремни"] },
        { title: "КОЛЛЕКЦИИ", links: ["Кутюр", "Прет-а-порте", "Резорт", "Архив"] },
      ],
      men: [
        { title: "НОВИНКИ", links: ["Новые Поступления", "Смотреть Все"] },
        { title: "ОДЕЖДА", links: ["Костюмы", "Пальто и Жакеты", "Рубашки", "Брюки", "Трикотаж", "Пошив"] },
        { title: "АКСЕССУАРЫ", links: ["Сумки", "Обувь", "Галстуки и Платки", "Ремни", "Запонки"] },
        { title: "КОЛЛЕКЦИИ", links: ["Кутюр", "Прет-а-порте", "Резорт", "Архив"] },
      ],
      house: [
        { title: "ДОМ", links: ["Наша История", "Наследие", "Jacques Fath"] },
        { title: "МАСТЕРСТВО", links: ["Ателье Кутюр", "Материалы", "Архив"] },
        { title: "НОВОСТИ", links: ["Последние Новости", "Мероприятия", "Пресса"] },
        { title: "СЕРВИС", links: ["Персональный Шопинг", "На Заказ", "Бутики"] },
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
      house: "ДОМ",
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
        description: "Изготовлено с исключительным мастерством во Франции.",
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
        { value: "all", label: "Все Позиции" },
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
        { id: 7, name: "Кожаные Туфли", price: "€ 1 100", category: "shoes" },
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
