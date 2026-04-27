import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { HiUpload, HiPhotograph, HiExclamationCircle, HiCheckCircle } from 'react-icons/hi';
import TagsInput from '../components/TagsInput';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="font-inter min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="glow-orb-1" style={{ top: '-300px', right: '-200px' }} />
      <div className="glow-orb-2" style={{ bottom: '-200px', left: '-150px' }} />

      <main className="relative z-10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 mb-4">
              New Article
            </span>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              Create a Post
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Share your knowledge with the community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title and Category */}
            <div className="glass-card rounded-2xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter post title..."
                    required
                    id="title"
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="uncategorized">Select a category</option>
                    <option value="javascript">JavaScript</option>
                    <option value="reactjs">React.js</option>
                    <option value="nextjs">Next.js</option>
                    <option value="nodejs">Node.js</option>
                    <option value="typescript">TypeScript</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SEO Fields */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">
                SEO Settings (Optional)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Meta Description
                  </label>
                  <textarea
                    placeholder="Brief description for search engines (150-160 characters)"
                    rows="3"
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Keywords
                  </label>
                  <input
                    type="text"
                    placeholder="javascript, react, tutorial (comma separated)"
                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="glass-card rounded-2xl p-6">
              <TagsInput
                tags={formData.tags || []}
                onChange={(tags) => setFormData({ ...formData, tags })}
              />
            </div>

            {/* Image Upload */}
            <div className="glass-card rounded-2xl p-6">
              <label className="block text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">
                Featured Image
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-white/10 rounded-xl p-6 hover:border-primary/40 transition-colors">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1 w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary-light hover:file:bg-primary/20 file:cursor-pointer cursor-pointer"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleUpdloadImage}
                    disabled={imageUploadProgress}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                  >
                    {imageUploadProgress ? (
                      <>
                        <div className="w-5 h-5">
                          <CircularProgressbar
                            value={imageUploadProgress}
                            text={`${imageUploadProgress}%`}
                            styles={{
                              root: { width: '20px', height: '20px' },
                              text: { fontSize: '32px', fill: '#fff' },
                              path: { stroke: '#fff' },
                            }}
                          />
                        </div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <HiUpload className="w-4 h-4" />
                        <span>Upload</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {imageUploadError && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <HiExclamationCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{imageUploadError}</p>
                </div>
              )}

              {/* Image Preview */}
              {formData.image && (
                <div className="mt-4">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={formData.image}
                      alt="upload"
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 rounded-lg bg-green-500/20 border border-green-500/30 backdrop-blur-sm flex items-center gap-2">
                        <HiCheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs font-medium text-green-400">Uploaded</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Editor */}
            <div className="glass-card rounded-2xl p-6">
              <label className="block text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">
                Content
              </label>
              <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-300 dark:border-white/10 overflow-hidden">
                <ReactQuill
                  theme="snow"
                  placeholder="Write something amazing..."
                  className="h-72"
                  required
                  onChange={(value) => {
                    setFormData({ ...formData, content: value });
                  }}
                />
              </div>
            </div>

            {/* Publish Error */}
            {publishError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                <HiExclamationCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{publishError}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                onClick={() => setFormData({ ...formData, status: 'published' })}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Publish Post
              </button>
              <button
                type="submit"
                onClick={() => setFormData({ ...formData, status: 'draft' })}
                className="flex-1 px-6 py-3 bg-gray-600 dark:bg-gray-700 text-white rounded-xl font-medium text-sm hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-transparent border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
