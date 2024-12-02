import { useState } from 'react';

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    if (content.length > 280) {
      setError('Post content cannot exceed 280 characters');
      return;
    }

    try {
      await onSubmit(content);
      setContent(''); 
      setError(''); 
    } catch (error) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
        />
        <div className="flex justify-between items-center mt-2">
          <span className={`text-sm ${
            content.length > 280 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {content.length}/280
          </span>
          {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        disabled={!content.trim() || content.length > 280}
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;