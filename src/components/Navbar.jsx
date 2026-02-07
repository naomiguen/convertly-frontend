import { useState, useEffect } from 'react';
import { Sparkles, Globe, Moon, Sun, HelpCircle, ChevronDown } from 'lucide-react';
import { languages } from '../data/constants';

export default function Navbar({ language, setLanguage, isDarkMode, setIsDarkMode, setShowTutorial, t }) {
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.lang-dropdown-container')) {
        setShowLangDropdown(false);
      }
    };
    if (showLangDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showLangDropdown]);

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-pink-100 dark:border-slate-700 sticky top-0 z-40 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Convertly</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="relative lang-dropdown-container">
              <button 
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium px-3 py-2 rounded-lg hover:bg-pink-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-pink-200 dark:hover:border-slate-600"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-semibold">{language}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showLangDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50 animate-fade-in">
                  {Object.entries(languages).map(([code, { name, flag }]) => (
                    <button 
                      key={code}
                      onClick={() => { setLanguage(code); setShowLangDropdown(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        language === code ? 'bg-pink-50 dark:bg-slate-700 text-pink-600 dark:text-pink-400 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className="text-xl">{flag}</span>
                      <span>{name}</span>
                      {language === code && <span className="ml-auto text-pink-500">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-slate-800 rounded-lg transition-all border border-transparent hover:border-pink-200 dark:hover:border-slate-600"
              title={isDarkMode ? t.lightMode : t.darkMode}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Help Button */}
            <button 
              onClick={() => setShowTutorial(true)}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-slate-800 rounded-lg transition-all border border-transparent hover:border-pink-200 dark:hover:border-slate-600 group"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="hidden md:inline text-sm font-medium">{t.help}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}