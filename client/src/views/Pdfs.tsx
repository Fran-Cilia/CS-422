import { useUserStore } from "../store";
import type { UserStoreState } from "../store";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PdfCard } from "../components";

type pdf = {
  id: string;
  name: string;
  author: string;
  path: string;
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
          {data.map(({ id, name, author }) => (
            <PdfCard id={id} name={name} author={author} />
          ))}
        </div>
      </div>
    )
  );
};

export { Pdfs };
