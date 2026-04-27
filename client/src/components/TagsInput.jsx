import { useState } from 'react';
import { HiX, HiPlus } from 'react-icons/hi';

export default function TagsInput({ tags = [], onChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = inputValue.trim().toLowerCase();
    
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(e);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        Tags
      </label>
      
      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-500 transition-colors"
              >
                <HiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag (press Enter)"
          className="flex-1 px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 py-3 bg-primary/10 text-primary-light rounded-xl hover:bg-primary/20 transition-colors flex items-center gap-2"
        >
          <HiPlus className="w-4 h-4" />
          Add
        </button>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-600 mt-2">
        Add tags to help readers find your content. Press Enter or click Add.
      </p>
    </div>
  );
}
