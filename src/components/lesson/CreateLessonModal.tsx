import { X, Plus, Sparkles, Settings, Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { useVocabRecall } from '@/hooks/useVocabRecall';
import type { Category } from '@/types';

const TITLE_MIN_LENGTH = 3;

function getTitleError(value: string): string {
  if (!value.trim()) return 'O título deve ter pelo menos 3 caracteres';
  if (value.trim().length < TITLE_MIN_LENGTH) return 'O título deve ter pelo menos 3 caracteres';
  return '';
}

function getCategoryError(value: string): string {
  if (!value || !value.trim()) return 'Selecione uma categoria';
  return '';
}

function getWordError(word: { word: string; translation: string }): string {
  const hasWord = word.word.trim().length > 0;
  const hasTranslation = word.translation.trim().length > 0;
  if (hasWord && !hasTranslation) return 'Palavra e tradução são obrigatórias';
  if (!hasWord && hasTranslation) return 'Palavra e tradução são obrigatórias';
  return '';
}

export function CreateLessonModal() {
  const { showCreateModal, toggleCreateModal, addLesson } = useVocabRecall();
  const { showToast } = useToast();

  const [lessonTitle, setLessonTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [words, setWords] = useState<Array<{ word: string; translation: string; context: string }>>([
    { word: '', translation: '', context: '' },
  ]);

  const [errors, setErrors] = useState<{
    title?: string;
    category?: string;
    words?: string;
    wordByIndex?: Record<number, string>;
  }>({});

  const [categories, setCategories] = useState([
    'Food',
    'Sports',
    'Technology',
    'Travel',
    'Transports',
    'Business',
  ]);

  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const addWordField = () => {
    setWords([...words, { word: '', translation: '', context: '' }]);
    setErrors((e) => ({ ...e, words: undefined, wordByIndex: undefined }));
  };

  const updateWord = (index: number, field: 'word' | 'translation' | 'context', value: string) => {
    setWords((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    setErrors((e) => {
      const next = { ...e };
      if (next.wordByIndex) {
        const nextByIndex = { ...next.wordByIndex };
        delete nextByIndex[index];
        next.wordByIndex = Object.keys(nextByIndex).length ? nextByIndex : undefined;
      }
      return next;
    });
  };

  const addCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()]);
      setNewCategoryName('');
    }
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingValue(categories[index]);
  };

  const saveEdit = () => {
    if (editingIndex !== null && editingValue.trim()) {
      const newCategories = [...categories];
      newCategories[editingIndex] = editingValue.trim();
      setCategories(newCategories);
      setEditingIndex(null);
      setEditingValue('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingValue('');
  };

  const resetForm = () => {
    setLessonTitle('');
    setSelectedCategory('business');
    setWords([{ word: '', translation: '', context: '' }]);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    toggleCreateModal();
  };

  const handleTitleChange = (value: string) => {
    setLessonTitle(value);
    setErrors((e) => ({ ...e, title: getTitleError(value) || undefined }));
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as Category | '');
    setErrors((e) => ({ ...e, category: getCategoryError(value) || undefined }));
  };

  const handleCreate = () => {
    const titleError = getTitleError(lessonTitle);
    const categoryError = getCategoryError(selectedCategory);
    const validWords = words
      .filter((w) => w.word.trim() || w.translation.trim())
      .map((w) => ({
        word: w.word.trim(),
        translation: w.translation.trim(),
        context: w.context.trim() || undefined,
      }));

    const wordByIndex: Record<number, string> = {};
    words.forEach((w, i) => {
      const err = getWordError(w);
      if (err) wordByIndex[i] = err;
    });

    const wordsGeneralError =
      validWords.length === 0 ? 'Adicione pelo menos uma palavra à lição' : undefined;

    const hasWordErrors = Object.keys(wordByIndex).length > 0;

    if (titleError || categoryError || wordsGeneralError || hasWordErrors) {
      setErrors({
        title: titleError || undefined,
        category: categoryError || undefined,
        words: wordsGeneralError,
        wordByIndex: hasWordErrors ? wordByIndex : undefined,
      });
      return;
    }

    const category = (selectedCategory as Category).toLowerCase() as Category;
    addLesson({
      title: lessonTitle.trim(),
      date: new Date().toISOString().slice(0, 10),
      wordsCount: validWords.length,
      category,
      words: validWords,
    });
    resetForm();
    toggleCreateModal();
    showToast('Lição criada com sucesso! ✓', 'success');
  };

  return (
    <AnimatePresence>
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={handleClose}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col w-full h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-2xl md:rounded-2xl bg-white shadow-2xl"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>

            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 shrink-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white" size={18} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Create New Lesson</h2>
              </div>
              <button
                onClick={handleClose}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-100 rounded-lg p-1.5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1 min-h-0">
              <div className="space-y-4">
                <div>
                  <label htmlFor="lessonTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    id="lessonTitle"
                    placeholder="e.g., Business English - Meeting Vocabulary"
                    value={lessonTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className={`w-full px-4 py-3 text-base border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all hover:border-gray-300 ${
                      errors.title ? 'border-destructive' : 'border-gray-200'
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className={`flex-1 px-4 py-3 text-base border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white ${
                        errors.category ? 'border-destructive' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat.toLowerCase()}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowCategoryManager(!showCategoryManager)}
                      className={`px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all ${
                        showCategoryManager ? 'bg-blue-50 border-primary text-primary' : 'text-gray-600'
                      }`}
                      title="Manage categories"
                    >
                      <Settings size={18} />
                    </button>
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-sm text-destructive">{errors.category}</p>
                  )}

                  {showCategoryManager && (
                    <div className="mt-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Manage Categories</h4>
                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                          placeholder="New category name"
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm bg-white"
                        />
                        <button
                          type="button"
                          onClick={addCategory}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all text-sm font-medium flex items-center gap-1"
                        >
                          <Plus size={16} />
                          Add
                        </button>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {categories.map((category, index) => (
                          <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-2 border border-gray-200">
                            {editingIndex === index ? (
                              <>
                                <input
                                  type="text"
                                  value={editingValue}
                                  onChange={(e) => setEditingValue(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                                  className="flex-1 px-2 py-1 border border-gray-200 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                  autoFocus
                                />
                                <button
                                  type="button"
                                  onClick={saveEdit}
                                  className="px-2 py-1 text-xs font-medium text-green-600 hover:bg-green-50 rounded transition-all"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  className="px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded transition-all"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <span className="flex-1 text-sm text-gray-700">{category}</span>
                                <button
                                  type="button"
                                  onClick={() => startEditing(index)}
                                  className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded transition-all"
                                  title="Edit category"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeCategory(index)}
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                                  title="Remove category"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Add Words to this Lesson</h3>
                {errors.words && (
                  <p className="mb-2 text-sm text-destructive">{errors.words}</p>
                )}
                <div className="space-y-4">
                  {words.map((word, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-500">Word #{index + 1}</span>
                        {words.length > 1 && (
                          <button
                            onClick={() => setWords(words.filter((_, i) => i !== index))}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Word in English"
                          value={word.word}
                          onChange={(e) => updateWord(index, 'word', e.target.value)}
                          className={`w-full px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white ${
                            errors.wordByIndex?.[index] ? 'border-destructive' : 'border-gray-200'
                          }`}
                        />
                        {errors.wordByIndex?.[index] && (
                          <p className="mt-1 text-xs text-destructive">{errors.wordByIndex[index]}</p>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Translation (PT-BR)"
                        value={word.translation}
                        onChange={(e) => updateWord(index, 'translation', e.target.value)}
                        className={`w-full px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white ${
                          errors.wordByIndex?.[index] ? 'border-destructive' : 'border-gray-200'
                        }`}
                      />
                      <textarea
                        rows={2}
                        placeholder="Context sentence..."
                        value={word.context}
                        onChange={(e) => updateWord(index, 'context', e.target.value)}
                        className="w-full px-3 py-2 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none bg-white"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={addWordField}
                  className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:border-primary hover:text-primary hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Add Another Word
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t border-gray-100 bg-gradient-to-b from-transparent to-gray-50/50 shrink-0">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105"
              >
                Create Lesson
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
