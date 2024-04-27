import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import '../styles/tailwind.css';


const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase.from("Posts").select().eq("id", postId).single();
      if (error) {
        throw error;
      }
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const { error } = await supabase.from("Posts").update(post).eq("id", postId);
      if (error) {
        throw error;
      }
      alert("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };
  
  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("Posts").delete().eq("id", postId);
      if (error) {
        throw error;
      }
      alert("Post deleted successfully!");
      // Redirect to home page or any other desired page
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleUpdate}>
        <label htmlFor="title">Title:</label><br />
        <input type="text" id="title" name="title" value={post.title || ''} onChange={handleChange} /><br />
        <label htmlFor="content">Content:</label><br />
        <textarea id="content" name="content" value={post.content || ''} onChange={handleChange} /><br />
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
        <button type="submit">Update Post</button>
        <button type="button" onClick={handleDelete}>Delete Post</button>
      </form>
    </div>
  );
};

export default EditPost;


