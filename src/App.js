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
  const [score, setScore] = useState(0);
  const [underlineColor, setUnderlineColor] = useState("black");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    const sentiment = new Sentiment();
    sentiment.registerLanguage("fr", { labels: sentimentFrench });
    const analysis = sentiment.analyze(text, { language });
    setResult(analysis);
    setScore(analysis.score);

    // Update underline color based on sentiment score
    if (analysis.score > 0) {
      setUnderlineColor("green");
    } else if (analysis.score < 0) {
      setUnderlineColor("red");
    } else {
      setUnderlineColor("black");
    }
  }, [text, language]);

  return (
    <div className="App">
      <h1>Hello Sentiment</h1>
      <p>
        Input text in here and see{" "}
        <a href="https://github.com/thisandagain/sentiment">
          thisandagain/sentiment
        </a>{" "}
        in action.
      </p>
      <label>Language:</label>{" "}
      <select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
      <br />
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type something..."
        style={{ borderBottom: `2px solid ${underlineColor}` }}
      />
      <div style={{ borderBottom: `2px solid ${underlineColor}`,color: underlineColor}}>
        Score: {score}
      </div>
      <SyntaxHighlighter language="javascript" style={dracula}>
        {beautify(result, null, 2, 100)}
      </SyntaxHighlighter>
    </div>
  );
}
