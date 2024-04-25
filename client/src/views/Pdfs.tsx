type pdf = {
  name: string;
  author: string;
  path: string;
};

const PdfCard: React.FC<pdf> = ({ name, author, path }) => {
  return (
    <div className="border-[#e4e4e7] border-[1px] rounded-xl p-4 flex flex-col">
      <h1 className="font-bold text-2xl">{name}</h1>
      <h1 className="mt-2 text-md font-light text-[#71717a]">By: {author}</h1>
      <button
        className=" bg-black text-white rounded-md px-2 py-1.5 mt-8 mx-4"
        onClick={() => {
          console.log(`${path}`);
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
      path: "../../public/sommerville.pdf",
    },
    {
      name: "Sommerville Chapter 6",
      author: "Sommerville",
      path: "../../public/sommerville.pdf",
    },
    {
      name: "Sommerville Chapter 6",
      author: "Sommerville",
      path: "../../public/sommerville.pdf",
    },
    {
      name: "Sommerville Chapter 6",
      author: "Sommerville",
      path: "../../public/sommerville.pdf",
    },
    {
      name: "Sommerville Chapter 6",
      author: "Sommerville",
      path: "../../public/sommerville.pdf",
    },
    {
      name: "Sommerville Chapter 6",
      author: "Sommerville",
      path: "../../public/sommerville.pdf",
    },
    {
      name: "Sommerville Chapter 6",
      author: "Sommerville",
      path: "../../public/sommerville.pdf",
    },
    {
      name: "Sommerville Chapter 6",
      author: "Sommerville",
      path: "../../public/sommerville.pdf",
    },
    {
      name: "Sommerville Chapter 6",
      author: "Sommerville",
      path: "../../public/sommerville.pdf",
    },
  ];

  return (
    <div className="mx-32 mt-24">
      <h1 className="font-bold text-4xl">Select PDF</h1>
      <div className="flex flex-wrap mt-12 gap-x-4 gap-y-4">
        {PDF_FILES.map(({ name, author, path }) => (
          <PdfCard name={name} author={author} path={path} />
        ))}
      </div>
    </div>
  );
};

export { Pdfs };
