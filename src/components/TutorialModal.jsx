import { X } from 'lucide-react';

export default function TutorialModal({ onClose, t }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t.tutorialTitle}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {[
            { step: 1, text: t.tutorialStep1 },
            { step: 2, text: t.tutorialStep2 },
            { step: 3, text: t.tutorialStep3 },
            { step: 4, text: t.tutorialStep4 }
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-8 h-8 flex-shrink-0 bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center font-bold">
                {item.step}
              </div>
              <p className="text-gray-600 dark:text-gray-300 pt-1">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 dark:bg-slate-900/50 text-center">
          <button onClick={onClose} className="w-full py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
            {t.tutorialButton}
          </button>
        </div>
      </div>
    </div>
  );
}