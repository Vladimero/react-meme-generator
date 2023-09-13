import './style.css';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [memes, setMemes] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  useEffect(() => {
    fetch('https://api.memegen.link/templates/')
      .then((data) => data.json())
      .then((response) => {
        setMemes(response);
        // Initialize currentImage with the first meme template when the data is loaded.
        if (response.length > 0) {
          const firstTemplate = response[0];
          setCurrentImage({ id: firstTemplate.id, name: firstTemplate.name });
        }
      })
      .catch((error) => {
        console.log(`${error} The images can not be accessed`);
      });
  }, []);

  return (
    <>
      <header className="title">
        <h1>React Meme Generator</h1>
        <hr />
      </header>

      <main>
        <div className="meme">
          {currentImage && (
            <img
              src={`https://api.memegen.link/images/${currentImage.id}/${topText}/${bottomText}.png`}
              alt="Error ocured"
              data-test-id="meme-image"
            />
          )}
        </div>

        <br />
        <br />

        <div className="form">
          <div>
            <label htmlFor="topText">
              <span>Top text</span>
            </label>
            <input
              id="topText"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="bottomText">
              <span>Bottom text</span>
            </label>
            <input
              id="bottomText"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
          </div>

          <br />

          <div>
            <label htmlFor="memeTemplate">Change the meme</label>
            <select
              id="memeTemplate"
              value={currentImage ? currentImage.id : ''}
              onChange={(e) => {
                const selectedTemplate = memes.find(
                  (template) => template.id === e.target.value,
                );
                setCurrentImage(selectedTemplate);
              }}
            >
              {memes.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />

        <div>
          <button>Download</button>
        </div>
      </main>
    </>
  );
}
