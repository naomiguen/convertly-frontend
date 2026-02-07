import { X, UploadCloud, Download, ArrowRight, CheckCircle, FileText, Trash2 } from 'lucide-react';
import { formatFileSize } from '../utils/format'; 

export default function UploadModal({ 
  selectedTool, 
  onClose, 
  files,  
  handleFileChange, 
  handleSubmit, 
  status, 
  processedFiles,  
  setStatus, 
  setFiles,  
  t 
}) {
  const toolKey = selectedTool.id === 'compress-pdf' ? 'compressPdf' : selectedTool.id;
  const toolTitle = t.tools[toolKey]?.title;
  const isCompression = ['compress', 'compress-pdf'].includes(selectedTool.id);

  // Fungsi hapus file dari list (sebelum upload)
  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  // Hitung persentase penghematan untuk satu file
  const calculateSavings = (original, processed) => {
    if (!original || !processed) return 0;
    const savings = ((original - processed) / original) * 100;
    return savings.toFixed(1);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
         onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl transition-all max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-pink-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            {toolTitle}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-pink-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {processedFiles.length === 0 ? (
            // --- TAMPILAN UPLOAD ---
            <>
              <div className="border-2 border-dashed border-pink-300 dark:border-slate-600 rounded-xl p-8 text-center bg-pink-50/50 dark:bg-slate-900/50 transition-colors">
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <UploadCloud className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {files.length > 0 ? `${files.length} file(s) selected` : t.chooseFile}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {files.length > 0 ? t.readyToProcess : t.dragAndDrop}
                </p>
                
                <label className="cursor-pointer inline-block">
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept={selectedTool.id.includes('pdf') ? '.pdf' : 'image/*'}
                    multiple  
                  />
                  <span className="inline-block bg-white dark:bg-slate-700 border-2 border-pink-300 dark:border-slate-500 text-pink-600 dark:text-pink-400 px-6 py-2 rounded-lg hover:bg-pink-50 dark:hover:bg-slate-600 transition-colors font-medium">
                    {files.length > 0 ? t.changeFile : t.selectFile}
                  </span>
                </label>
              </div>

              {/* List File yang Dipilih */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Selected Files:
                  </p>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-slate-700 rounded-lg p-3 border border-gray-200 dark:border-slate-600">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="w-5 h-5 text-pink-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFile(index)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors flex-shrink-0 ml-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Tombol Process */}
              {files.length > 0 && (
                <button 
                  onClick={handleSubmit} 
                  disabled={status === 'uploading' || status === 'processing'}
                  className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    status === 'uploading' || status === 'processing'
                      ? 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {status === 'idle' && `${t.startProcessing} (${files.length} files)`}
                  {status === 'uploading' && t.uploading}
                  {status === 'processing' && t.processing}
                </button>
              )}
            </>
          ) : (
            // --- TAMPILAN SUKSES DENGAN STATISTIK MULTIPLE FILES ---
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-pink-200 dark:border-slate-700">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-fade-in">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                {t.success}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                {processedFiles.length} file(s) ready to download
              </p>

              {/* List Hasil File */}
              <div className="space-y-3 mb-6">
                {processedFiles.map((result, index) => {
                  // Cari ukuran original dari files state
                  const originalFile = files.find(f => f.name === result.originalName);
                  const originalSize = originalFile ? originalFile.size : 0;
                  const savings = calculateSavings(originalSize, result.processedSize);

                  return (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-slate-600">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                            {result.originalName}
                          </p>
                          
                          {/* Statistik Ukuran */}
                          <div className="flex items-center gap-2 mt-2 text-xs">
                            <span className="line-through decoration-pink-500 text-gray-500 dark:text-gray-400">
                              {formatFileSize(originalSize)}
                            </span>
                            <ArrowRight className="w-3 h-3 text-gray-400" />
                            <span className="text-emerald-500 font-bold">
                              {formatFileSize(result.processedSize)}
                            </span>
                            
                            {/* Badge Hemat */}
                            {isCompression && savings > 0 && (
                              <span className="ml-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full">
                                -{savings}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Tombol Download */}
                      <a href={result.downloadUrl} download>
                        <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm flex items-center justify-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Tombol Process Another */}
              <button 
                onClick={() => { 
                  setStatus('idle'); 
                  setFiles([]); 
                }} 
                className="w-full text-pink-600 dark:text-pink-400 hover:text-pink-700 font-medium transition-colors text-sm py-2"
              >
                {t.processAnother}
              </button>
            </div>
          )}
          
          {/* Error Message */}
          {status === 'error' && (
            <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center text-sm">
              {t.errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}