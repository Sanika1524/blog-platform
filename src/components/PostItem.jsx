import React, { useState } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection';
import '../components/PostItem.css';

const Post = ({ post, onPostUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/posts/${post.id}`);
      onPostUpdate();
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleEdit = async () => {
    try {
      const updatedPost = {
        ...post,
        title,
        content,
      };
      await axios.put(`http://localhost:3001/posts/${post.id}`, updatedPost);
      setIsEditing(false);
      onPostUpdate();
    } catch (err) {
      console.error('Error saving post:', err);
    }
  };

  const handleLike = async () => {
    try {
      await axios.patch(`http://localhost:3001/posts/${post.id}`, {
        likes: post.likes + 1
      });
      onPostUpdate();
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  return (
    <div className="post">
      {isEditing ? (
        <>
          <input
            className="post-edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="post-edit-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleEdit}>💾 Save</button>
        </>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className="post-actions">
            <button onClick={handleLike}>👍 {post.likes}</button>
            <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
            <button onClick={handleDelete}>🗑️ Delete</button>
          </div>
        </>
      )}

      <CommentSection postId={post.id} />
    </div>
  );
};

export default Post;
