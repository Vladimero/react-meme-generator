import './style.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [memes, setMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState({
    id: 'drunk',
    name: 'Drunk Baby',
  });
  const [topText, setTopText] = useState('_');
  const [bottomText, setBottomText] = useState('_');

  useEffect(() => {
    fetch('https://api.memegen.link/templates/')
      .then((response) => response.json())
      .then((data) => {
        setMemes(data);
      })
      .catch((error) => {
        console.log(`${error} The images can not be accessed`);
      });
  }, []);

  const memeUrl = `https://api.memegen.link/images/${currentMeme.id}/${topText}/${bottomText}.png`;

  // pass an updater function for download meme
  const downloadImage = () => {
    saveAs(memeUrl, 'generated_meme.png');
  };

  return (
    <>
      <header className="title">
        <h1>React Meme Generator</h1>
        <hr />
      </header>
      <main>
        <div className="meme">
          <img
            src={memeUrl}
            alt="not able to load the meme"
            data-test-id="meme-image"
          />
        </div>

        <br />
        <br />

        <div className="form">
          <form onSubmit={(event) => event.preventDefault()}>
            <div>
              <label htmlFor="topText">Top text:</label>
              <input
                id="topText"
                onChange={(event) => {
                  // for totally empty boxes when page loads
                  if (event.target.value.length > 0) {
                    setTopText(event.target.value);
                  } else {
                    setTopText('');
                  }
                }}
              />
              <br />
              <br />
              <label htmlFor="bottomText">Bottom text:</label>
              <input
                id="bottomText"
                onChange={(event) => {
                  // for totally empty boxes when page loads
                  if (event.target.value.length > 0) {
                    setBottomText(event.target.value);
                  } else {
                    setBottomText('');
                  }
                }}
              />
            </div>

            <br />

            <div>
              <label htmlFor="memeTemplate">Choose a meme:</label>
              <select
                id="memeTemplate"
                onChange={(event) => {
                  const selectedTemplate = memes.find(
                    (template) => template.id === event.target.value,
                  );
                  setCurrentMeme(selectedTemplate);
                }}
              >
                {memes.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        <br />

        <div>
          <button onClick={downloadImage}>Download</button>
        </div>
      </main>
    </>
  );
}
