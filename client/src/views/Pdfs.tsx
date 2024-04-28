import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store";
import type { UserStoreState } from "../store";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type pdf = {
  id: number;
  name: string;
  author: string;
  path: string;
};

const PdfCard: React.FC<pdf> = ({ id, name, author, path }) => {
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

const Pdfs = () => {
  const user = useUserStore((state) => (state as UserStoreState).userId);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["pdfs"],
    queryFn: async () => {
      return (
        await axios.get("http://localhost:3000/getPdfs", {
          params: {
            userId: user,
          },
        })
      ).data as Array<pdf>;
    },
  });

  return (
    data && (
      <div className="flex flex-col justify-center mx-12 mt-24">
        {/* <h1>USER: {user}</h1> */}
        {/* <h1>PDFS: {JSON.stringify(data)}</h1> */}
        <h1 className="font-bold text-4xl">Select PDF</h1>
        <div className="mt-12 grid grid-cols-4 gap-4">
          {data.map(({ id, name, author, path }) => (
            <PdfCard id={id} name={name} author={author} path={path} />
          ))}
        </div>
      </div>
    )
  );
};

export { Pdfs };
