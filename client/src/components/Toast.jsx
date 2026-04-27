import { useEffect } from 'react';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiX } from 'react-icons/hi';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <HiCheckCircle className="w-5 h-5 text-green-500" />,
    error: <HiExclamationCircle className="w-5 h-5 text-red-500" />,
    info: <HiInformationCircle className="w-5 h-5 text-blue-500" />,
  };

  const colors = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  };

  const textColors = {
    success: 'text-green-800 dark:text-green-200',
    error: 'text-red-800 dark:text-red-200',
    info: 'text-blue-800 dark:text-blue-200',
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-fade-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${colors[type]} shadow-lg backdrop-blur-sm min-w-[300px] max-w-md`}>
        {icons[type]}
        <p className={`flex-1 text-sm font-medium ${textColors[type]}`}>
          {message}
        </p>
        <button
          onClick={onClose}
          className={`${textColors[type]} hover:opacity-70 transition-opacity`}
        >
          <HiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
