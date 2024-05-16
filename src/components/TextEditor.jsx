import React, { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import ReactQuill from "react-quill";
import { useNavigate } from 'react-router-dom';

import "react-quill/dist/quill.snow.css";


function TextEditor() {
    const navigator = useNavigate();
    const [socket, setSocket] = useState(null);
    const [checkValue, setCheckValue] = useState(true);
    const [CreateInput, setCreateInput] = useState('');
    const [words,setWords] = useState('')

const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
    ];


   useEffect(() => {
    const s = io('http://localhost:5001');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!CreateInput) return;
    socket.emit('join-group', CreateInput);
  }, [CreateInput, socket]);
    
    useEffect(() => {
  if (!socket) return;

  socket.on('load-document', (data) => {
    setWords(data); 
  });

  
}, [words, socket]);


  useEffect(() => {
    if (!socket) return;

    socket.on('received-words', (word) => {
      setWords(word);
    });
  }, [words, socket]);

  function joinCreateGroup() {
    setCheckValue(false);
    navigator(`/documents/${CreateInput}`);
  }

  const handleTextChange = (value) => {
    setWords(value);
    socket.emit('send-words', value);
  };

  return (
    <div className="container">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={words}
        onChange={handleTextChange}
      />
      {checkValue && (
        <div className="pop_up">
          <label htmlFor="join">
            create/join a team
            <input
              type="text"
              value={CreateInput}
              placeholder="Enter the name"
              onChange={(e) => {
                setCreateInput(e.target.value);
              }}
            />
          </label>
          <button onClick={joinCreateGroup}>confirm</button>
        </div>
      )}
    </div>
  );
}

export default TextEditor;