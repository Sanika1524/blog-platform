import React, { useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './App.css';

const App = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'light' : 'dark'
    );
  };

  return (
    <div className="main-container">
      <h1>📝 Blogging Platform</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <PostForm onPostCreated={() => setRefreshPosts(!refreshPosts)} />
      <PostList refresh={refreshPosts} />
    </div>
  );
};

export default App;
