// export const formatPrice = (price: number, locale: string = "en-US") => {
//     return new Intl.NumberFormat(locale, {
//       style: "currency",
//       currency: locale === "es-ES" ? "EUR" : "USD",
//     }).format(price);
//   };
  

  export const formatPrice = (price: number) => {
    let userLocale = "en-US"; // Idioma predeterminado
  
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      userLocale = navigator.language || "en-US";
    }
  
    const currency = userLocale === "es-ES" ? "EUR" : "USD";
  
    return new Intl.NumberFormat(userLocale, {
      style: "currency",
      currency,
    }).format(price);
  };