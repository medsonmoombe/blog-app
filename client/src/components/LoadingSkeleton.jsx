export default function LoadingSkeleton({ type = 'post' }) {
  if (type === 'post') {
    return (
      <div className="glass-card rounded-2xl overflow-hidden animate-pulse">
        <div className="relative aspect-video bg-gray-300 dark:bg-gray-700" />
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'comment') {
    return (
      <div className="glass-card rounded-xl p-4 animate-pulse">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'profile') {
    return (
      <div className="glass-card rounded-2xl p-6 animate-pulse">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5" />
        </div>
      </div>
    );
  }

  // Default skeleton
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
    </div>
  );
}
