import { useNavigate } from "react-router-dom";

type pdf = {
  name: string;
  author: string;
  path: string;
};

const PdfCard: React.FC<pdf> = ({ name, author, path }) => {
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
          console.log(`${path}`);
          nav(`/pdfs/${path}`);
        }}
      >
        <h1 className="text-sm font-medium">View PDF</h1>
      </button>
    </div>
  );
};

const Pdfs = () => {
  const PDF_FILES: Array<pdf> = [
    {
      name: "Sommerville Chapter 6",
      author: "Sommerville",
      path: "sommerville.pdf",
    },
    {
      name: "ENGLISH FOR SCIENCE AND TECHNOLOGY",
      author: "Huckin & Olsen",
      path: "pg_par.pdf",
    },
    {
      name: "Sommerville Chapter 6",
      author: "Sommerville",
      path: "sommerville.pdf",
    },
    {
      name: "ENGLISH FOR SCIENCE AND TECHNOLOGY",
      author: "Huckin & Olsen",
      path: "pg_par.pdf",
    },
    {
      name: "Sommerville Chapter 6",
      author: "Sommerville",
      path: "sommerville.pdf",
    },
    {
      name: "ENGLISH FOR SCIENCE AND TECHNOLOGY",
      author: "Huckin & Olsen",
      path: "pg_par.pdf",
    },
  ];

  return (
    <div className="flex flex-col justify-center mx-12 mt-24">
      <h1 className="font-bold text-4xl">Select PDF</h1>
      <div className="mt-12 grid grid-cols-4 gap-4">
        {PDF_FILES.map(({ name, author, path }) => (
          <PdfCard name={name} author={author} path={path} />
        ))}
      </div>
    </div>
  );
};

export { Pdfs };
