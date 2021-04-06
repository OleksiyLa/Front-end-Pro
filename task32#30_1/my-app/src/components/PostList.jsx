import React, { useState } from 'react';
import PostForm from './PostForm';
import Post from './Post';

function PostList() {
  const [posts, setPosts] = useState([]);

  const addPost = post => {
    if (!post.text || /^\s*$/.test(post.text)) {
      return;
    }

    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  const removePost = id => {
    const removedArr = [...posts].filter(post => post.id !== id);
    setPosts(removedArr);
  };

  return (
    <React.Fragment>
      <h1>POST something</h1>
      <PostForm onSubmit={addPost} />
      <Post
        posts={posts}
        removePost={removePost}
      />
    </React.Fragment>
  );
}

export default PostList;
