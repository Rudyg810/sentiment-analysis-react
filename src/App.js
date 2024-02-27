import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import beautify from "json-beautify";
import sentimentFrench from "sentiment-fr";
import Sentiment from "sentiment";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [result, setResult] = useState({});

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    const sentiment = new Sentiment();
    sentiment.registerLanguage("fr", { labels: sentimentFrench });
    setResult(sentiment.analyze(text, { language }));
  }, [text, language]);

  return (
    <div className="App">
      <h1>Hello Sentiment</h1>

      <label>Language:</label>{" "}
      <select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
      </select>
      <br />
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here..."
      />
      <button>Submit</button>
      <SyntaxHighlighter language="javascript" style={dracula}>
        {beautify(result, null, 2, 100)}
      </SyntaxHighlighter>
    </div>
  );
}
