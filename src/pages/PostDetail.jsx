import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import '../styles/tailwind.css';


const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
    } catch (error) {
      console.error('Error fetching post:', error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId);
  
      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      const { error } = await supabase
        .from('Posts')
        .update({ comment: newComment })
        .eq('id', postId);
      if (error) throw error;
  
      // After successful submission, clear the form or redirect the user
      setNewComment('');
      fetchComments();
      alert("Comment submitted successfully!");
    } catch (error) {
      alert('Error submitting comment: ' + error.message);
    }
  };

  const handleUpvote = async () => {
    try {
      const { error } = await supabase
        .from('Posts')
        .update({ upvotes: post.upvotes + 1 })
        .eq('id', postId);
      if (error) throw error;
  
      // Update the local state to reflect the upvote
      setPost(prevState => ({ ...prevState, upvotes: prevState.upvotes + 1 }));
      alert("Post upvoted successfully!");
    } catch (error) {
      alert('Error upvoting post: ' + error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) {
        console.error('Error deleting comment:', error);
      } else {
        // Refresh comments after deletion
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };



  const handleDeletePost = async () => {
    try {
      const { error } = await supabase
        .from('Posts')
        .delete()
        .eq('id', postId);
  
      if (error) {
        console.error('Error deleting post:', error);
      } else {
        // Redirect to the home page after successful deletion
        history.push('/');
      }
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto"> {/* Centered container */}

      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt={post.title} className="post-image" />}
      <p>Upvotes: {post.upvotes}</p>

      {/* Display comments */}
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <div>{comment.content}</div>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>

       {/* Edit and delete buttons */}
       {/* Edit and delete buttons */}
       <div className="button-container">
        <Link to={`/edit-post/${postId}`} className="edit-button">
            Edit Post <span role="img" aria-label="Edit">✏️</span>
        </Link>
        <button className="delete-button" onClick={handleDeletePost}>
            Delete Post
        </button>
        </div>
        
        {/* Upvote button */}
        <button onClick={handleUpvote}>👍</button>

      <form onSubmit={handleSubmitComment}>
        <div>
          <label htmlFor="comment"></label>
          <textarea
            id="comment"
            name="comment"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Write your comment..."
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default PostDetail;
