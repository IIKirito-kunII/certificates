import React, { useState } from "react";
import { FaExpand, FaCompress } from "react-icons/fa";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "./App.css";

const defaultInput = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`;
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == "\`\`\`" && lastLine == "\`\`\`") {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [link to my Linkedin](https://www.linkedin.com/in/lavish-kumar-varshney-32b141222/), and
> Block Quotes!

> Multi-Line Quote
>
>> Nested Quote

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just ls if you want!
1. And last but not least, let's not forget embedded images:

![alt text for image](/vite.svg)
`;

export default function App() {
  const [input, setInput] = useState(defaultInput);
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);
  const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false);

  const getMarkup = () => {
    return {
      __html: DOMPurify.sanitize(
        marked(input, {
          gfm: true,
          breaks: true,
          renderer: new marked.Renderer(),
        })
      ),
    };
  };

  const toggleFullScreen = (section) => {
    if (section === "editor") {
      setIsEditorFullScreen(!isEditorFullScreen);
    } else if (section === "preview") {
      setIsPreviewFullScreen(!isPreviewFullScreen);
    }
  };

  return (
    <>
      <div
        className="input"
        style={{ display: isPreviewFullScreen ? "none" : "inherit" }}
      >
        <nav>
          <h2>
            <b>Editor</b>
          </h2>
          <button
            onClick={() => toggleFullScreen("editor")}
            title={isEditorFullScreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isEditorFullScreen ? (
              <FaCompress size={30} />
            ) : (
              <FaExpand size={30} />
            )}
          </button>
        </nav>
        <textarea
          id="editor"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ height: isEditorFullScreen ? "100vh" : "inherit" }}
        ></textarea>
      </div>
      <div
        className="output"
        style={{ display: isEditorFullScreen ? "none" : "inherit" }}
      >
        <nav>
          <h2>
            <b>Previewer</b>
          </h2>
          <button
            onClick={() => toggleFullScreen("preview")}
            title={isPreviewFullScreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isPreviewFullScreen ? (
              <FaCompress size={30} />
            ) : (
              <FaExpand size={30} />
            )}
          </button>
        </nav>
        <div id="preview" dangerouslySetInnerHTML={getMarkup()}></div>
      </div>
    </>
  );
}
