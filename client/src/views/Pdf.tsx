import { useParams } from "react-router-dom";
import sommervillePdf from "../assets/sommerville.pdf";
import pg_parPdf from "../assets/pg_par.pdf";

const Pdf = () => {
  const { pdfPath } = useParams();

  if (pdfPath === "sommerville.pdf") {
    return (
      <>
        <div className="flex flex-row w-screen bg-red-200 h-screen">
          <iframe src={sommervillePdf} className="w-1/2"></iframe>
          <h1 className="w-1/2">PDF Path: {pdfPath}</h1>
        </div>
      </>
    );
  } else if (pdfPath === "pg_par.pdf") {
    return (
      <>
        <div className="flex flex-row w-screen bg-red-200 h-screen">
          <iframe src={pg_parPdf} className="w-1/2"></iframe>
          <h1 className="w-1/2">PDF Path: {pdfPath}</h1>
        </div>
      </>
    );
  }
};

export { Pdf };
