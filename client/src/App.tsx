import React from "react";
import PDFPreview from "./components/PDFPreview";
import "./App.css";

function App() {
  const PDF_TITLES = ["Sommerville", "PDF Title 2", "PDF Title 3", "PDF Title 4"];

  const handlePDFClick = (title: string) => {
    // TODO: Handle PDF redirection/routing here
    console.log("PDF clicked:", title);
  };

  return (
    <div className="pdf-menu">
      {/* TODO: Add navbar */}
      <h1>Menu</h1>
      {PDF_TITLES.map((title, index) => (
        <PDFPreview key={index} title={title} onClick={() => handlePDFClick(title)} />
      ))}
    </div>
  );
}

export default App;
