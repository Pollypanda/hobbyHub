import React, { useState } from 'react';
import { supabase } from '../client';
import '../styles/tailwind.css';

const PostForm = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "",
    upvotes: 0
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { error } = await supabase
        .from('Posts')
        .insert([{
          title: post.title,
          content: post.content,
          image: post.image,
          upvotes: post.upvotes
        }]);
      if (error) throw error;

      setPost({ title: "", content: "", image: "", upvotes: 0 });
      alert("Post created successfully!");
    } catch (error) {
      alert('Error creating post: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="post-form" onSubmit={handleSubmit}>
        <h2>Create a Post</h2>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={post.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
