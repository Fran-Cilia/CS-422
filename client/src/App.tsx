import React, { useRef } from 'react';
import "./App.css";

function App() {
  //References for the text input fields
  const chapterRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  const handleSaveClick = () => {
    
    // Checks if the reference is null, if so then blank, if not then assigns the value in the input field
    const chapterValue = chapterRef.current?.value || '';
    const headerValue = headerRef.current?.value || '';
    const notesValue = notesRef.current?.value || '';

    // Prints to log for testing
    console.log('Saving to database...');
    console.log('Chapter:', chapterValue);
    console.log('Header:', headerValue);
    console.log('Notes:', notesValue);

    // TODO: Make a function that saves this information in the DB

    
    // Clear text input fields after saving
    if (chapterRef.current) chapterRef.current.value = '';
    if (headerRef.current) headerRef.current.value = '';
    if (notesRef.current) notesRef.current.value = '';

    
  }

  return (
    // This is all the notes menu
    <div className="fixed bottom-0 right-0 bg-gray-200 w-96 h-80 p-5 border border-gray-300 flex flex-col">
      <div className="flex items-center mb-4">
        <h1 className="mr-2">Chapter:</h1>
        <input
          type="text"
          className="w-80 h-8 px-2 border border-gray-300"
          placeholder="Enter chapter title here..."
          ref={chapterRef}
        />
      </div>
      <div className="flex items-center mb-4">
        <h1 className="mr-2">Header:</h1>
        <input
          type="text"
          className="w-80 h-8 px-2 border border-gray-300"
          placeholder="Enter header title here..."
          ref={headerRef}
        />
      </div>
      <div className="flex mb-4">
        <h1 className="mr-2">Notes:</h1>
        <textarea
          className="w-80 h-32 px-2 border border-gray-300 resize-none"
          placeholder="Enter notes here..."
          ref={notesRef}
        />
      </div>
      <div className="text-center">
        <button
          type="button"
          className="w-full h-10 bg-gray-700 text-white rounded-md hover:bg-gray-800"
          onClick={() => handleSaveClick()}
        >
          Save Note!
        </button>
      </div>
    </div>


  );
}

export default App;