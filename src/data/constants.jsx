import { FileImage, FileText, Scissors, Layers, RefreshCw } from 'lucide-react';

export const tools = [
  {
    id: 'compress',
    icon: <FileImage className="w-7 h-7" />,
    gradient: 'from-pink-500 to-rose-500',
    category: 'Image Tools'
  },
  {
    id: 'resize',
    icon: <RefreshCw className="w-7 h-7" />,
    gradient: 'from-fuchsia-500 to-pink-500',
    category: 'Image Tools'
  },
  {
    id: 'pdf',
    icon: <FileText className="w-7 h-7" />,
    gradient: 'from-rose-500 to-pink-500',
    category: 'Converters'
  },
  {
    id: 'compress-pdf',
    icon: <Layers className="w-7 h-7" />,
    gradient: 'from-pink-600 to-rose-600',
    category: 'PDF Tools'
  },
  {
    id: 'merge',
    icon: <Layers className="w-7 h-7" />,
    gradient: 'from-purple-500 to-pink-500',
    category: 'PDF Tools'
  },
  {
    id: 'split',
    icon: <Scissors className="w-7 h-7" />,
    gradient: 'from-pink-500 to-purple-500',
    category: 'PDF Tools'
  }
];

export const languages = {
  EN: { name: 'English', flag: '🇬🇧' },
  ID: { name: 'Indonesia', flag: '🇮🇩' },
  ES: { name: 'Español', flag: '🇪🇸' }
};

export const translations = {
  EN: {
    title: "Transform Your Files",
    subtitle: "Compress, convert, and optimize your files in seconds. Free.",
    searchPlaceholder: "Search tools (e.g., 'Compress', 'PDF')...",
    filterAll: "All",
    filterPDF: "PDF Tools",
    filterImage: "Image Tools",
    filterConverters: "Converters",
    noResults: "No tools found matching",
    help: "Help",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    tutorialTitle: "How to use Convertly",
    tutorialStep1: "Select a tool from the dashboard (e.g., Compress Image).",
    tutorialStep2: "Upload your file by dragging it or clicking browse.",
    tutorialStep3: "Wait for the magic process to finish.",
    tutorialStep4: "Download your newly optimized file!",
    tutorialButton: "Got it, let's go!",
    chooseFile: "Choose a file",
    readyToProcess: "Ready to process",
    dragAndDrop: "Drag and drop or click to browse",
    changeFile: "Change File",
    selectFile: "Select File",
    startProcessing: "Start Processing",
    uploading: "Uploading...",
    processing: "Processing...",
    success: "Success!",
    fileReady: "Your file is ready.",
    downloadNow: "Download Now",
    processAnother: "Process Another File",
    errorMessage: "Something went wrong. Please try again.",
    selectFileFirst: "Please select a file first!",
    tools: {
      compress: { title: "Compress Image", desc: "Reduce image file size while maintaining quality." },
      resize: { title: "Resize Image", desc: "Resize your images to exact pixel dimensions." },
      pdf: { title: "Image to PDF", desc: "Convert JPG or PNG images into PDF documents." },
      compressPdf: { title: "Compress PDF", desc: "Optimize PDF files for web and sharing." },
      merge: { title: "Merge PDF", desc: "Combine multiple PDFs into one unified document." },
      split: { title: "Split PDF", desc: "Extract pages from your PDF files instantly." }
    }
  },
  ID: {
    title: "Ubah File Anda",
    subtitle: "Kompres, konversi, dan optimalkan file Anda dalam hitungan detik. Gratis.",
    searchPlaceholder: "Cari alat (misalnya 'Kompres', 'PDF')...",
    filterAll: "Semua",
    filterPDF: "Alat PDF",
    filterImage: "Alat Gambar",
    filterConverters: "Konverter",
    noResults: "Tidak ada alat yang cocok dengan",
    help: "Bantuan",
    darkMode: "Mode gelap",
    lightMode: "Mode terang",
    tutorialTitle: "Cara menggunakan Convertly",
    tutorialStep1: "Pilih alat dari dashboard (misalnya Kompres Gambar).",
    tutorialStep2: "Unggah file Anda dengan drag & drop atau klik browse.",
    tutorialStep3: "Tunggu proses ajaib selesai.",
    tutorialStep4: "Unduh file yang sudah dioptimalkan!",
    tutorialButton: "Mengerti, ayo mulai!",
    chooseFile: "Pilih file",
    readyToProcess: "Siap diproses",
    dragAndDrop: "Seret dan lepas atau klik untuk memilih",
    changeFile: "Ganti File",
    selectFile: "Pilih File",
    startProcessing: "Mulai Proses",
    uploading: "Mengunggah...",
    processing: "Memproses...",
    success: "Berhasil!",
    fileReady: "File Anda sudah siap.",
    downloadNow: "Unduh Sekarang",
    processAnother: "Proses File Lain",
    errorMessage: "Terjadi kesalahan. Silakan coba lagi.",
    selectFileFirst: "Silakan pilih file terlebih dahulu!",
    tools: {
      compress: { title: "Kompres Gambar", desc: "Kurangi ukuran file gambar sambil menjaga kualitas." },
      resize: { title: "Ubah Ukuran Gambar", desc: "Ubah ukuran gambar Anda ke dimensi piksel yang tepat." },
      pdf: { title: "Gambar ke PDF", desc: "Konversi gambar JPG atau PNG menjadi dokumen PDF." },
      compressPdf: { title: "Kompres PDF", desc: "Optimalkan file PDF untuk web dan berbagi." },
      merge: { title: "Gabung PDF", desc: "Gabungkan beberapa PDF menjadi satu dokumen." },
      split: { title: "Pisah PDF", desc: "Ekstrak halaman dari file PDF Anda secara instan." }
    }
  },
  ES: {
    title: "Transforma Tus Archivos",
    subtitle: "Comprime, convierte y optimiza tus archivos en segundos. Gratis.",
    searchPlaceholder: "Buscar herramientas (ej. 'Comprimir', 'PDF')...",
    filterAll: "Todos",
    filterPDF: "Herramientas PDF",
    filterImage: "Herramientas de Imagen",
    filterConverters: "Convertidores",
    noResults: "No se encontraron herramientas que coincidan con",
    help: "Ayuda",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    tutorialTitle: "Cómo usar Convertly",
    tutorialStep1: "Selecciona una herramienta del panel (ej. Comprimir Imagen).",
    tutorialStep2: "Sube tu archivo arrastrándolo o haciendo clic en examinar.",
    tutorialStep3: "Espera a que termine el proceso mágico.",
    tutorialStep4: "¡Descarga tu archivo recién optimizado!",
    tutorialButton: "¡Entendido, vamos!",
    chooseFile: "Elegir archivo",
    readyToProcess: "Listo para procesar",
    dragAndDrop: "Arrastra y suelta o haz clic para buscar",
    changeFile: "Cambiar Archivo",
    selectFile: "Seleccionar Archivo",
    startProcessing: "Iniciar Proceso",
    uploading: "Subiendo...",
    processing: "Procesando...",
    success: "¡Éxito!",
    fileReady: "Tu archivo está listo.",
    downloadNow: "Descargar Ahora",
    processAnother: "Procesar Otro Archivo",
    errorMessage: "Algo salió mal. Por favor, inténtalo de nuevo.",
    selectFileFirst: "¡Por favor selecciona un archivo primero!",
    tools: {
      compress: { title: "Comprimir Imagen", desc: "Reduce el tamaño del archivo de imagen manteniendo la calidad." },
      resize: { title: "Redimensionar Imagen", desc: "Cambia el tamaño de tus imágenes a dimensiones exactas en píxeles." },
      pdf: { title: "Imagen a PDF", desc: "Convierte imágenes JPG o PNG en documentos PDF." },
      compressPdf: { title: "Comprimir PDF", desc: "Optimiza archivos PDF para web y compartir." },
      merge: { title: "Combinar PDF", desc: "Combina varios PDFs en un documento unificado." },
      split: { title: "Dividir PDF", desc: "Extrae páginas de tus archivos PDF al instante." }
    }
  }
};