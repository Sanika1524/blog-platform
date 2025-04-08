// src/components/PostForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../components/PostForm.css';

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      title,
      content,
      likes: 0,
      comments: []
    };

    try {
      await axios.post('http://localhost:3001/posts', newPost);
      setTitle('');
      setContent('');
      onPostCreated();
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
