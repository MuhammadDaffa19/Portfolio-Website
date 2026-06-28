export const projects = [
  {
    id: "chatbot-baa",
    title: "Chatbot AI BAA",
    category: "Thesis Project",
    year: "2026",
    role: "Full Stack Developer",
    status: "In Development",
    image: "/images/projects/chatbot-baa.webp",
    description:
      "Prototipe chatbot akademik untuk layanan informasi BAA ITPLN yang dirancang untuk menjawab pertanyaan mahasiswa berdasarkan knowledge base FAQ dan SOP resmi.",
    stack: ["Flask", "Python", "JavaScript", "OpenAI API", "HTML", "CSS"],
    highlights: [
      "Chatbot akademik",
      "Knowledge base FAQ & SOP",
      "Routing jawaban",
      "Streaming respons",
    ],
    problem:
      "Mahasiswa sering membutuhkan informasi akademik secara cepat, tetapi informasi tersebut dapat tersebar di beberapa sumber dan tetap harus sesuai dengan ketentuan resmi BAA.",
    solution:
      "Saya mengembangkan prototipe chatbot berbasis Flask yang memanfaatkan knowledge base FAQ dan SOP, routing jawaban berdasarkan topik pertanyaan, riwayat percakapan, serta antarmuka chat yang interaktif.",
    impact:
      "Project ini menjadi implementasi utama dalam skripsi saya dan menunjukkan bagaimana chatbot berbasis AI dapat membantu penyampaian informasi akademik secara lebih cepat, terarah, dan tetap mengacu pada sumber resmi.",
    features: [
      "Knowledge base FAQ dan SOP",
      "Routing jawaban berdasarkan topik akademik",
      "UI chat interaktif",
      "Riwayat percakapan",
      "Streaming respons per paragraf",
    ],
  },
  {
    id: "cashmate",
    title: "CashMate",
    category: "Client Project",
    year: "2026",
    role: "Web App Developer",
    status: "Completed",
    image: "/images/projects/cashmate.webp",
    description:
      "Aplikasi kasir berbasis web untuk kebutuhan UMKM dengan fitur transaksi, riwayat penjualan, pengelolaan hutang pelanggan, dan penyimpanan data menggunakan Firebase.",
    stack: ["HTML", "CSS", "JavaScript", "Firebase"],
    highlights: [
      "Dashboard kasir",
      "Riwayat transaksi",
      "BonLater / hutang pelanggan",
      "Firebase Hosting & Firestore",
    ],
    problem:
      "Client membutuhkan aplikasi kasir sederhana yang dapat membantu mencatat transaksi, melihat riwayat penjualan, dan mengelola hutang pelanggan tanpa sistem yang terlalu kompleks.",
    solution:
      "Saya membangun aplikasi kasir web dengan dashboard penjualan, fitur input transaksi, riwayat transaksi, fitur BonLater untuk hutang pelanggan, serta penyimpanan data berbasis Firebase.",
    impact:
      "Aplikasi ini membantu proses pencatatan transaksi menjadi lebih rapi, memudahkan pemantauan penjualan, dan mengurangi risiko data transaksi tercecer.",
    features: [
      "Dashboard ringkasan penjualan",
      "Pencatatan transaksi kasir",
      "Riwayat transaksi",
      "Manajemen hutang pelanggan",
      "Firebase Hosting dan Firestore",
    ],
  },
  {
    id: "edulens",
    title: "EduLens",
    category: "Client Project",
    year: "2026",
    role: "Frontend Developer",
    status: "Completed",
    image: "/images/projects/edulens.webp",
    description:
      "Web app analisis tingkat kesulitan soal untuk guru SD dengan input data Excel, naskah soal Word, visualisasi dashboard, dan laporan PDF.",
    stack: ["React", "Vite", "Tailwind CSS", "SheetJS", "Recharts"],
    highlights: [
      "Upload Excel",
      "Analisis kesulitan soal",
      "Dashboard visual",
      "Download laporan PDF",
    ],
    problem:
      "Guru membutuhkan cara yang lebih praktis untuk menganalisis tingkat kesulitan soal berdasarkan data nilai siswa tanpa harus melakukan perhitungan secara manual.",
    solution:
      "Saya membuat EduLens sebagai aplikasi analisis berbasis web dengan fitur upload Excel, input naskah soal, perhitungan tingkat kesulitan, visualisasi chart, dan laporan PDF.",
    impact:
      "Project ini membantu guru membaca hasil evaluasi soal secara lebih cepat, terstruktur, dan mudah dipresentasikan sebagai bahan pertimbangan pembelajaran.",
    features: [
      "Upload data nilai Excel",
      "Input naskah soal Word",
      "Analisis tingkat kesulitan soal",
      "Visualisasi chart dashboard",
      "Download laporan PDF",
    ],
  },
  {
    id: "k3connect",
    title: "K3Connect",
    category: "Client Project",
    year: "2026",
    role: "Frontend Developer",
    status: "Completed",
    image: "/images/projects/k3connect.webp",
    description:
      "Website statis interaktif untuk pencatatan data sertifikasi K3, dibuat berdasarkan kebutuhan client dengan fitur dashboard, data personel, data sertifikat, form input, dan status sertifikat.",
    stack: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    highlights: [
      "Website statis client",
      "Dashboard sertifikasi K3",
      "Data personel & sertifikat",
      "Penyimpanan LocalStorage",
    ],
    problem:
      "Client membutuhkan website sederhana untuk menampilkan konsep pencatatan sertifikasi K3 yang mudah dipahami, ringan, dan dapat digunakan untuk kebutuhan presentasi.",
    solution:
      "Saya membuat website statis interaktif menggunakan HTML, CSS, dan JavaScript dengan fitur dashboard, data personel, data sertifikat, form tambah data, status aktif/expired, dan penyimpanan LocalStorage.",
    impact:
      "Website ini membantu client mempresentasikan alur pencatatan sertifikasi K3 secara lebih jelas, rapi, dan mudah dipahami tanpa membutuhkan backend atau database kompleks.",
    features: [
      "Dashboard sertifikasi K3",
      "Data personel K3",
      "Data sertifikat",
      "Form tambah data",
      "Status aktif dan expired",
    ],
  },
];