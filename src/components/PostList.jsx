// src/components/PostList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './PostItem';
import Pagination from './Pagination';
import '../components/PostList.css';

const POSTS_PER_PAGE = 4;

const PostList = ({ refresh }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');

      setPosts(response.data.reverse()); // show latest first
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const indexOfLast = page * POSTS_PER_PAGE;
  const indexOfFirst = indexOfLast - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="post-list">
      {currentPosts.map((post) => (
        <Post key={post.id} post={post} onPostUpdate={fetchPosts} />
      ))}
      <Pagination
        totalPosts={posts.length}
        postsPerPage={POSTS_PER_PAGE}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </div>
  );
};

export default PostList;
