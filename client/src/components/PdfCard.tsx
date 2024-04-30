/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: PdfCard.tsx: Describes the cards shown on the Document Selection. 
import { useNavigate } from "react-router-dom";

const PdfCard: React.FC<{ id: string; name: string; author: string }> = ({
  id,
  name,
  author,
}) => {
  const nav = useNavigate();

  return (
    <div className="border-[#e4e4e7] border-[1px] rounded-xl p-4 flex flex-col justify-between">
      <div>
        <h1 className="font-bold text-2xl">{name}</h1>
        <h1 className="mt-2 text-md font-light text-[#71717a]">By: {author}</h1>
      </div>
      <button
        className=" bg-black text-white rounded-md px-2 py-1.5 mx-4 mt-8"
        onClick={() => {
          console.log(`${id}`);
          nav(`/pdfs/${id}`);
        }}
      >
        <h1 className="text-sm font-medium">View PDF</h1>
      </button>
    </div>
  );
};

export { PdfCard };
