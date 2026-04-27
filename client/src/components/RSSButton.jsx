import { HiRss } from 'react-icons/hi';
import { useState } from 'react';

export default function RSSButton() {
  const [showModal, setShowModal] = useState(false);
  const rssUrl = `${window.location.origin}/api/rss`;

  const copyRSSUrl = () => {
    navigator.clipboard.writeText(rssUrl);
    alert('RSS feed URL copied to clipboard!');
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-xl font-medium text-sm transition-all duration-300 border border-orange-500/20"
        title="Subscribe via RSS"
      >
        <HiRss className="w-5 h-5" />
        <span className="hidden sm:inline">Subscribe</span>
      </button>

      {/* RSS Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="glass-card rounded-2xl p-8 max-w-md w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <HiRss className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Subscribe via RSS</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get updates in your RSS reader
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    RSS Feed URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={rssUrl}
                      readOnly
                      className="flex-1 px-4 py-2 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={copyRSSUrl}
                      className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    <strong>How to subscribe:</strong>
                  </p>
                  <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-decimal list-inside">
                    <li>Copy the RSS feed URL above</li>
                    <li>Open your RSS reader app (Feedly, Inoreader, etc.)</li>
                    <li>Add a new feed and paste the URL</li>
                    <li>Get notified when new posts are published!</li>
                  </ol>
                </div>

                <div className="flex gap-3">
                  <a
                    href={rssUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-xl font-medium text-sm hover:bg-orange-600 transition-all duration-300 text-center"
                  >
                    Open RSS Feed
                  </a>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 bg-transparent border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
