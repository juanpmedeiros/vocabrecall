import { X, Upload, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddWordModal({ isOpen, onClose }: AddWordModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={onClose}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white" size={18} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">New Word</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-100 rounded-lg p-1.5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all hover:border-gray-300 bg-gray-50 focus:bg-white"
                >
                  <option value="">Select a category</option>
                  <option value="food">🍽️ Food</option>
                  <option value="sports">🏆 Sports</option>
                  <option value="technology">💻 Technology</option>
                  <option value="travel">✈️ Travel</option>
                  <option value="transports">🚆 Transports</option>
                  <option value="business">💼 Business</option>
                </select>
              </div>

              <div>
                <label htmlFor="word" className="block text-sm font-semibold text-gray-700 mb-2">
                  Word in English
                </label>
                <input
                  type="text"
                  id="word"
                  placeholder="e.g., Serendipity"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all hover:border-gray-300"
                />
              </div>

              <div>
                <label htmlFor="context" className="block text-sm font-semibold text-gray-700 mb-2">
                  Context Sentence
                </label>
                <textarea
                  id="context"
                  rows={3}
                  placeholder="Write a sentence using this word..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all resize-none hover:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload contextual image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="text-white" size={24} />
                  </div>
                  <p className="text-sm font-medium text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <div>
                <label htmlFor="translation" className="block text-sm font-semibold text-gray-700 mb-2">
                  Translation (PT-BR)
                </label>
                <input
                  type="text"
                  id="translation"
                  placeholder="Tradução em português"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all hover:border-gray-300"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gradient-to-b from-transparent to-gray-50/50">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
              >
                Save Word
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
