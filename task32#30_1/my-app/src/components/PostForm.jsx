import React, { useState } from 'react';
let ID = 0;
function PostForm(props) {
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };
  
  const handleSubmit = e => {
    e.preventDefault();

    ID++
    props.onSubmit({
      id: ID,
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='post-form'>
          <input
            placeholder='Post a message'
            value={input}
            onChange={handleChange}
            name='text'
            className='post-input'
          />
          <button onClick={handleSubmit} className='post-button'>
            POST
          </button>
    </form>
  );
}

export default PostForm;
