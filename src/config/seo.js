// Static, public-facing summaries. Avoid hard-coded canonical URLs until the
// production hostname (Workers vs Pages / custom domain) is confirmed.
export const seoByPath = Object.freeze({
  "/": {
    id: {
      title: "Daffa Project Index | Portfolio Web Developer",
      description: "Jelajahi portfolio interaktif Daffa Project Index: proyek aplikasi web, keterampilan, pengalaman pengembangan, dan perjalanan profesional.",
    },
    en: {
      title: "Daffa Project Index | Web Developer Portfolio",
      description: "Explore Daffa Project Index, an interactive portfolio featuring web applications, development skills, project experience, and professional work.",
    },
  },
  "/about": {
    id: {
      title: "Tentang Saya | Daffa Project Index",
      description: "Kenali latar belakang, pendekatan pengembangan, dan bidang keahlian di balik proyek-proyek web yang ditampilkan dalam Daffa Project Index.",
    },
    en: {
      title: "About | Daffa Project Index",
      description: "Learn about the background, development approach, and areas of expertise behind the web projects presented in Daffa Project Index.",
    },
  },
  "/projects": {
    id: {
      title: "Proyek & Studi Kasus | Daffa Project Index",
      description: "Temukan studi kasus CashMate, EduLens, K3Connect, dan Chatbot BAA: masalah yang diselesaikan, teknologi yang dipakai, serta fitur utamanya.",
    },
    en: {
      title: "Projects & Case Studies | Daffa Project Index",
      description: "Explore CashMate, EduLens, K3Connect, and the BAA Chatbot: their goals, implementation technologies, and key application features.",
    },
  },
  "/skills": {
    id: {
      title: "Keahlian | Daffa Project Index",
      description: "Lihat teknologi dan alat yang digunakan dalam pengembangan antarmuka, aplikasi web, integrasi data, dan berbagai proyek interaktif.",
    },
    en: {
      title: "Skills | Daffa Project Index",
      description: "Discover the technologies and tools used to build web interfaces, interactive applications, and data-driven software projects.",
    },
  },
  "/experience": {
    id: {
      title: "Pengalaman | Daffa Project Index",
      description: "Telusuri pengalaman pengembangan aplikasi web, kolaborasi proyek, dan pekerjaan teknis yang membentuk perjalanan Daffa Project Index.",
    },
    en: {
      title: "Experience | Daffa Project Index",
      description: "Explore the web development experience, project collaborations, and technical work behind the Daffa Project Index portfolio.",
    },
  },
  "/certificates": {
    id: {
      title: "Pembelajaran | Daffa Project Index",
      description: "Ikuti perjalanan pembelajaran, pelatihan, dan pengembangan keterampilan teknis yang mendukung pekerjaan dan proyek aplikasi web.",
    },
    en: {
      title: "Learning | Daffa Project Index",
      description: "Browse the learning journey, training, and technical skills development that support web application projects and professional growth.",
    },
  },
  "/contact": {
    id: {
      title: "Kontak | Daffa Project Index",
      description: "Hubungi pengembang Daffa Project Index untuk diskusi proyek, kolaborasi, atau kesempatan kerja di bidang pengembangan website dan aplikasi web.",
    },
    en: {
      title: "Contact | Daffa Project Index",
      description: "Get in touch with the creator of Daffa Project Index about projects, collaborations, or opportunities in website and web application development.",
    },
  },
});

export function getSeoMetadata(pathname, language) {
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const page = seoByPath[normalizedPath] ?? seoByPath["/"];
  return page[language] ?? page.id;
}
