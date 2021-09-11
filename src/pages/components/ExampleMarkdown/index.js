import React, { useState, useEffect } from 'react';

import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import marked from 'marked';

function App() {
  const [postMarkdown, setPostMarkdown] = useState('');

  const readmePath = require('./test.md');
  useEffect(() => {
    fetch(readmePath)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        console.log('text', text);
        setPostMarkdown(marked(text));
      });
  }, []);

  console.log('postMarkdown', postMarkdown);

  return (
    <section>
      <article dangerouslySetInnerHTML={{ __html: postMarkdown }}></article>
    </section>
  );
}

export default App;
