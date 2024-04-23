import React, { useRef } from 'react';
import "./App.css";

function App() {
  const chapterRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  const handleSaveClick = () => {
    const chapterValue = chapterRef.current?.value || '';
    const headerValue = headerRef.current?.value || '';
    const notesValue = notesRef.current?.value || '';

    console.log('Saving to database...');
    console.log('Chapter:', chapterValue);
    console.log('Header:', headerValue);
    console.log('Notes:', notesValue);

    // TODO: Make a function that saves this information in the DB

    // Clear input fields after saving
    if (chapterRef.current) chapterRef.current.value = '';
    if (headerRef.current) headerRef.current.value = '';
    if (notesRef.current) notesRef.current.value = '';

    
  }

  return (
    <div className="notes-menu">
      <div className = "chapter-section">
        <h1>Chapter:</h1>
        <input type="text" className= "chapter-input" placeholder = "enter chapter title here..." ref = {chapterRef}/>
      </div>
      <div className = "header-section">
        <h1>Header:</h1>
        <input type="text" className= "header-input" placeholder = "enter header title here..." ref = {headerRef}/>
      </div>
      <div className = "notes-section">
        <h1>Notes:</h1>
        <textarea className = "notes-textarea" placeholder = "enter notes here..." ref = {notesRef}/>
      </div>
      <div className = "save-section">
        <button type = "button" className = "save-button" onClick={() => handleSaveClick()}>
          Save Note!
        </button>
      </div>
    </div>
  );
}

export default App;