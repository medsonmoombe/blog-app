import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiTag } from 'react-icons/hi';

export default function PopularTags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularTags();
  }, []);

  const fetchPopularTags = async () => {
    try {
      const res = await fetch('/api/post/tags/popular');
      const data = await res.json();
      if (res.ok) {
        setTags(data.slice(0, 15)); // Show top 15 tags
      }
    } catch (error) {
      console.log('Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <HiTag className="w-5 h-5 text-primary-light" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Popular Tags
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag._id}
            to={`/search?tag=${tag._id}`}
            className="group inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 hover:bg-primary hover:text-white transition-all"
          >
            #{tag._id}
            <span className="text-[10px] opacity-70">({tag.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
