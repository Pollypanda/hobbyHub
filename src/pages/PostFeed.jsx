import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import '../styles/tailwind.css';

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('Posts')
        .select('id, title, upvotes, created_at');

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortPosts = (postsToSort) => {
    if (sortBy === 'upvotes') {
      return postsToSort.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === 'time') {
      return postsToSort.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    // Default sort by created time
    return postsToSort;
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPosts = sortPosts(filteredPosts);

  return (
    <div className="posts-container">
      <div className="posts-feed">
        <div className="search-container">
          <label htmlFor="search" className="label">Search by title:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Enter title..."
            className="input"
          />
        </div>

        <div className="sort-container">
          <label htmlFor="sort" className="label">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="select"
          >
            <option value="created_at">Date</option>
            <option value="upvotes">Upvotes</option>
            <option value="time">Time</option>
          </select>
        </div>

        {sortedPosts.map(post => (
          <div key={post.id} className="post">
            <Link to={`/post-detail/${post.id}`} className="title">
              {post.title}
            </Link>
            <p className="text">Upvotes: {post.upvotes}</p>
            <p className="text">Created at: {new Date(post.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsFeed;
