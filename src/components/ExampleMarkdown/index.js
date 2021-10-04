import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

export const execPOST = (url, body) => {
  return fetch(url, {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

function App() {
  const [post, setPost] = useState('');

  // useEffect(() => {
  //     import(`./test.md`)
  //         .then(res => {
  //             console.log('res.default',res.default);
  //             fetch(res.default)
  //                 .then(res => res.text())
  //                 .then(res => {
  //                     console.log(typeof res,res);
  //                     setPost(res);
  //                 })
  //                 .catch(err => console.log(err));
  //         })
  //         .catch(err => console.log(err));

  // });

  const [mdText, setMdText] = useState('');

  useEffect(() => {
    fetch(
      'https://homnaydocgi.sgp1.digitaloceanspaces.com/test/Clean%20Architecture%20on%20Frontend.md'
    )
      .then((response) => {
        if (response.ok) return response.text();
        else return Promise.reject("Didn't fetch text correctly");
      })
      .then((text) => {
        setMdText(text);
      })
      .catch((error) => console.error(error));
  });

  return (
    <div>
      asdmasdnaskjdb
      <Markdown>{mdText}</Markdown>
    </div>
  );
}

export default App;
