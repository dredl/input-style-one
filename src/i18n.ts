import i18n from "i18next"
// import LanguageDetector from "i18next-browser-languagedetector"
// import { reactI18nextModule } from "react-i18next"
import commonRU from "./i18n/ru/common"
import commonEn from "./i18n/en/common"
import commonKK from "./i18n/kk/common"
i18n
  // .use(reactI18nextModule)
  // .use(LanguageDetector)
  .init({
    fallbackLng: "en", // use en if detected lng is not available
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    resources: {
      ru: { common: commonRU },
      en: { common: commonEn },
      kk: { common: commonKK }
    },
    ns: ["common"],
    defaultNS: "common",
    // react-i18next options
    react: {
      wait: true
    },
    keySeparator: "-->" // we do not use keys in form messages.welcome
  })

export default i18n
