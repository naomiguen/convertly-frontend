import { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

// Import Modular Components & Data
import Navbar from './components/Navbar';
import TutorialModal from './components/TutorialModal';
import UploadModal from './components/UploadModal';
import { tools, translations } from './data/constants';
import { useTheme } from './hooks/useTheme';

const API_BASE = "http://127.0.0.1:8000/api/v1";

function App() {
  // --- STATE ---
  const [selectedTool, setSelectedTool] = useState(null);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle");
  const [processedFiles, setProcessedFiles] = useState([]);
  
  // UI State
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);
  const [language, setLanguage] = useState('EN');
  
  const { isDarkMode, setIsDarkMode } = useTheme();
  const t = translations[language];

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeFilter === 'All' || tool.category === activeFilter;
    const toolKey = tool.id === 'compress-pdf' ? 'compressPdf' : tool.id;
    const toolTitle = t.tools[toolKey]?.title || '';
    const toolDesc = t.tools[toolKey]?.desc || '';
    const matchesSearch = toolTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          toolDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --- HANDLERS ---
  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    setFiles([]);
    setStatus("idle");
    setProcessedFiles([]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
    }
  };

  const handleSubmit = async () => {
    if (!files || files.length === 0) {
      alert(t.selectFileFirst);
      return;
    }
    
    try {
      setStatus("uploading");
      
      const formData = new FormData();
      files.forEach((fileItem) => {
        formData.append("files", fileItem);
      });
      
      const uploadRes = await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (!uploadRes.data || !uploadRes.data.data) {
        throw new Error("Invalid response format from upload endpoint");
      }
      
      const uploadedDataList = uploadRes.data.data;
      
      if (!Array.isArray(uploadedDataList)) {
        throw new Error("Backend did not return an array");
      }
      
      if (uploadedDataList.length === 0) {
        throw new Error("No files were uploaded successfully");
      }

      setStatus("processing");
      
      const processPromises = uploadedDataList.map(async (fileData) => {
        if (!fileData.saved_name) {
          return null;
        }
        
        try {
          const payload = {
            filename: fileData.saved_name,
            action: selectedTool.id === 'compress-pdf' ? 'compress-pdf' : selectedTool.id
          };
          
          const processRes = await axios.post(`${API_BASE}/process-file`, payload);
          
          return {
            originalName: fileData.original_name,
            processedFile: processRes.data.processed_file,
            processedSize: processRes.data.processed_size,
            downloadUrl: `${API_BASE}/download/${processRes.data.processed_file}`
          };
          
        } catch (err) {
          return null;
        }
      });

      const results = await Promise.all(processPromises);
      
      const validResults = results.filter(r => r !== null);
      
      if (validResults.length === 0) {
        throw new Error("All files failed to process");
      }
      
      setProcessedFiles(validResults);
      setStatus("done");

    } catch (error) {
      alert(`Error: ${error.response?.data?.detail || error.message}`);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      
      <Navbar 
        language={language} setLanguage={setLanguage}
        isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}
        setShowTutorial={setShowTutorial} t={t}
      />

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent pb-1">
          {t.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          {t.subtitle}
        </p>

        <div className="max-w-md mx-auto mb-10 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text" placeholder={t.searchPlaceholder}
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-pink-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm transition-all"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['All', 'PDF Tools', 'Image Tools', 'Converters'].map((filter) => (
            <button
              key={filter} onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-slate-700 border border-pink-100 dark:border-slate-700'
              }`}
            >
              {filter === 'All' ? t.filterAll : filter === 'PDF Tools' ? t.filterPDF : filter === 'Image Tools' ? t.filterImage : t.filterConverters}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const toolKey = tool.id === 'compress-pdf' ? 'compressPdf' : tool.id;
              return (
                <div
                  key={tool.id} onClick={() => handleToolClick(tool)}
                  className="group bg-white dark:bg-slate-800 rounded-2xl p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-pink-100 dark:border-slate-700"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-white shadow-lg`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{t.tools[toolKey]?.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t.tools[toolKey]?.desc}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10">
             <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-slate-800 mb-3"><Search className="w-8 h-8 text-gray-400" /></div>
             <p className="text-gray-500 dark:text-gray-400">{t.noResults} "{searchQuery}"</p>
          </div>
        )}
      </main>

      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} t={t} />}
      
      {selectedTool && (
        <UploadModal 
          selectedTool={selectedTool} 
          onClose={() => setSelectedTool(null)}
          files={files}  
          handleFileChange={handleFileChange} 
          handleSubmit={handleSubmit}
          status={status} 
          processedFiles={processedFiles}  
          setStatus={setStatus} 
          setFiles={setFiles}  
          t={t}
        />
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}

export default App;