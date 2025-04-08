// src/components/CommentSection.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/CommentSection.css';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/posts/${postId}`);
      setComments(response.data.comments || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment = { id: Date.now(), text, likes: 0 };
    const updatedComments = [...comments, newComment];

    try {
      await axios.patch(`http://localhost:5000/posts/${postId}`, {
        comments: updatedComments
      });
      setComments(updatedComments);
      setText('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleLikeComment = async (id) => {
    const updatedComments = comments.map((c) =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    );
    try {
      await axios.patch(`http://localhost:5000/posts/${postId}`, {
        comments: updatedComments
      });
      setComments(updatedComments);
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  const handleDeleteComment = async (id) => {
    const updatedComments = comments.filter((c) => c.id !== id);
    try {
      await axios.patch(`http://localhost:5000/posts/${postId}`, {
        comments: updatedComments
      });
      setComments(updatedComments);
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  return (
    <div className="comment-section">
      <h4>💬 Comments</h4>
      <form onSubmit={handleAddComment} className="comment-form">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id}>
            <span>{comment.text}</span>
            <div className="comment-actions">
              <button onClick={() => handleLikeComment(comment.id)}>👍 {comment.likes}</button>
              <button onClick={() => handleDeleteComment(comment.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
