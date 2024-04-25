import React from "react";
import "./PDFPreview.css";

interface PDFPreviewProps {
  title: string;
  onClick: () => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ title, onClick }) => {
  return (
    <div className="pdf-preview" onClick={onClick}>
      <p>{title}</p>
    </div>
  );
};

export default PDFPreview;