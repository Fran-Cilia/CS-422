/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: Answer.tsx: Describes the "answer" component which contains all data related to a question answer object.
type Note = {
  id: string;
  chapter: string;
  header: string;
  question: string;
  answer: string;
};

const Answer: React.FC<Omit<Note, "id">> = ({
  chapter,
  header,
  question,
  answer,
}) => {
  return (
    <>
      <div className="border-[#e4e4e7] border-[1px] rounded-xl p-4 flex flex-col justify-between gap-8">
        <div>
          <h1 className="font-bold text-2xl">{chapter}</h1>
          <h1 className="mt-2 text-md font-light text-[#71717a]">
            Header: {header}
          </h1>
          <h1 className="mt-2 text-md font-light text-[#71717a]">
            Question: {question}
          </h1>
          <h1 className="mt-2 text-md font-light text-[#71717a]">
            Answer: {answer}
          </h1>
        </div>
      </div>
    </>
  );
};

export { Answer };
