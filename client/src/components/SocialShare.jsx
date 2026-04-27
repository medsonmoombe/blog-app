import { HiShare } from 'react-icons/hi';
import { FaTwitter, FaLinkedin, FaFacebook, FaWhatsapp, FaLink } from 'react-icons/fa';

export default function SocialShare({ url, title, description }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    // You can add toast notification here
    alert('Link copied to clipboard!');
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
        <HiShare className="w-4 h-4" />
        Share:
      </span>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          title="Share on Twitter"
        >
          <FaTwitter className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => handleShare('linkedin')}
          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          title="Share on LinkedIn"
        >
          <FaLinkedin className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => handleShare('facebook')}
          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          title="Share on Facebook"
        >
          <FaFacebook className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => handleShare('whatsapp')}
          className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
          title="Share on WhatsApp"
        >
          <FaWhatsapp className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Copy Link"
        >
          <FaLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
