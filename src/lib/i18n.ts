import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      dashboard: {
        title: "Music Analytics Dashboard",
        metrics: {
          totalUsers: "Total Users",
          activeUsers: "Active Users",
          totalStreams: "Total Streams",
          revenue: "Revenue",
          topArtist: "Top Artist",
        },
        charts: {
          userGrowth: "User Growth",
          revenue: "Revenue Distribution",
          topSongs: "Top Songs",
        },
      },
    },
  },
  es: {
    translation: {
      dashboard: {
        title: "Panel de Analytics de Música",
        metrics: {
          totalUsers: "Usuarios Totales",
          activeUsers: "Usuarios Activos",
          totalStreams: "Reproducciones Totales",
          revenue: "Ingresos",
          topArtist: "Artista Principal",
        },
        charts: {
          userGrowth: "Crecimiento de Usuarios",
          revenue: "Distribución de Ingresos",
          topSongs: "Canciones Principales",
        },
      },
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
