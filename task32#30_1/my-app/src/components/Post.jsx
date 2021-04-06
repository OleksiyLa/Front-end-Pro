import React from 'react';

const Post = ({ posts, removePost }) => {

  return posts.map((post, index) => (
    <div
      className="flex"
      key={index}
    >
      <h3 >
        {post.text}
      </h3>
      <button
        onClick={() => removePost(post.id)} className="btn"
      >Delete</button>
    </div>
  ));
};

export default Post;
