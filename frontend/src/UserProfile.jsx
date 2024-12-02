import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './components/Post';

function UserProfile({ currentUser }) {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchUserAndPosts();
  }, [username]);

  const fetchUserAndPosts = async () => {
    try {
      // Fetch user profile
      const userResponse = await fetch(`http://localhost:3000/api/users/profile/${username}`);
      if (!userResponse.ok) throw new Error('User not found');
      const userData = await userResponse.json();
      setUser(userData);
      setDescription(userData.description);

      // Fetch user's posts
      const postsResponse = await fetch(`http://localhost:3000/api/posts/user/${username}`);
      if (!postsResponse.ok) throw new Error('Failed to fetch posts');
      const postsData = await postsResponse.json();
      setPosts(postsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDescription = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ description })
      });

      if (!response.ok) throw new Error('Failed to update description');

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditing(false);
    } catch (err) {
      setError('Failed to update description');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
        <p className="text-gray-600 mb-4">
          Joined {new Date(user.createdAt).toLocaleDateString()}
        </p>
        
        {editing ? (
          <div className="mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            />
            <div className="mt-2 space-x-2">
              <button
                onClick={handleUpdateDescription}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <p>{user.description || 'No description yet.'}</p>
            {currentUser && currentUser.username === username && (
              <button
                onClick={() => setEditing(true)}
                className="text-blue-600 mt-2"
              >
                Edit Description
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <Post
            key={post._id}
            post={post}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}

export default UserProfile;