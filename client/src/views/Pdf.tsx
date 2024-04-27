import { useParams } from "react-router-dom";
import sommervillePdf from "../assets/sommerville.pdf";
import pg_parPdf from "../assets/pg_par.pdf";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

type Note = {
  id: string;
  chapter: string;
  header: string;
  body: string;
};

const Note: React.FC<Note> = ({ id, chapter, header, body }) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return axios.post("http://localhost:3000/deleteNote", { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div>
      <div className="border-[#e4e4e7] border-[1px] rounded-xl p-4 flex flex-col justify-between gap-8">
        <div>
          <h1 className="font-bold text-2xl">{chapter}</h1>
          <h1 className="mt-2 text-md font-light text-[#71717a]">
            Header: {header}
          </h1>
          <h1 className="mt-2 text-md font-light text-[#71717a]">
            Body: {body}
          </h1>
        </div>
        <div className="flex flex-row justify-between">
          <div />
          <button
            className="px-2 py-1 border-[1px] border-red-500 rounded-md text-red-500 text-sm font-semibold"
            onClick={() => {
              deleteNoteMutation.mutate({ id });
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Pdf = () => {
  const { pdfId } = useParams();

  const queryClient = useQueryClient();

  const {
    isLoading: notesIsLoading,
    isError: notesIsError,
    data: notesData,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      return (
        await axios.get("http://localhost:3000/getNotes", {
          params: {
            pdfId: pdfId,
          },
        })
      ).data.reverse() as Array<Note>;
    },
  });

  console.log(`NOTES DATA: ${JSON.stringify(notesData)}`);

  const {
    isLoading: pdfIsLoading,
    isError: pdfIsError,
    data: pdfData,
  } = useQuery({
    queryKey: ["pdf"],
    queryFn: async () => {
      return (
        await axios.get("http://localhost:3000/getPdf", {
          params: {
            pdfId: pdfId,
          },
        })
      ).data;
    },
  });

  const createNoteMutation = useMutation({
    mutationFn: ({
      pdfId,
      chapter,
      header,
      body,
    }: {
      pdfId: string;
      chapter: string;
      header: string;
      body: string;
    }) => {
      console.log(
        `CREATING NOTE: pdfID: ${pdfId} | chapter: ${chapter} | header: ${header} | body: ${body}`
      );
      return axios.post("http://localhost:3000/createNote", {
        pdfId,
        chapter,
        header,
        body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  console.log(`PDF DATA: ${JSON.stringify(pdfData)}`);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<{ chapter: string; header: string; body: string }>();

  return (
    notesData &&
    pdfData && (
      <>
        <div className="flex flex-row w-screen h-screen">
          <iframe
            src={(() => {
              if (pdfData.path == "sommerville.pdf") {
                return sommervillePdf;
              } else {
                return sommervillePdf;
              }
            })()}
            className="w-1/2"
          ></iframe>
          <div className="w-1/2 m-8 pb-16 flex flex-col gap-y-4 h-screen overflow-y-auto">
            {/* <h1>PDF Path: {pdfData.path}</h1> */}
            {/* <h1>NOTES DATA: {JSON.stringify(notesData)}</h1> */}
            <div className="border-[#e4e4e7] border-[1px] rounded-xl p-4 flex flex-col justify-between">
              <form
                onSubmit={handleSubmit((data) => {
                  createNoteMutation.mutate({
                    pdfId: pdfId as string,
                    ...data,
                  });
                  reset();
                })}
              >
                <div className="grid grid-cols-2">
                  <div>
                    <h1>Chapter: </h1>
                    <h1>Header: </h1>
                    <h1>Body: </h1>
                  </div>
                  <div>
                    <input
                      {...register("chapter")}
                      className="border-black border-2"
                    />
                    <input
                      {...register("header")}
                      className="border-black border-2"
                    />
                    <input
                      {...register("body")}
                      className="border-black border-2"
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div />
                  <button
                    className=" bg-black text-white rounded-md px-2 py-1.5 mt-8"
                    type="submit"
                  >
                    <h1 className="text-sm font-medium">Add Note</h1>
                  </button>
                </div>
              </form>
            </div>
            {notesData.map(({ id, chapter, header, body }) => (
              <Note id={id} chapter={chapter} header={header} body={body} />
            ))}
          </div>
        </div>
      </>
    )
  );

  // return (
  // notesData &&
  // pdfData &&
  // notesData && pdfData &&
  // <h1>PDF DATA: {JSON.stringify(pdfData.path)}</h1>

  // (pdfData.path === "sommerville.pdf" ? <h1>Sommerville</h1> : <h1>Other</h1>)
  // (pdfData.pdfPath == "sommerville.pdf" ? (
  //   <>
  //     <div className="flex flex-row w-screen bg-red-200 h-screen">
  //       <iframe src={sommervillePdf} className="w-1/2"></iframe>
  //       <h1 className="w-1/2">PDF Path: {pdfData.pdfPath}</h1>
  //     </div>
  //   </>
  // ) : (
  //   <></>
  // ))
  // );

  // if (pdfData?.pdfPath === "sommerville.pdf") {
  //   return (
  //     <>
  //       <div className="flex flex-row w-screen bg-red-200 h-screen">
  //         <iframe src={sommervillePdf} className="w-1/2"></iframe>
  //         <h1 className="w-1/2">PDF Path: {pdfData.pdfPath}</h1>
  //       </div>
  //     </>
  //   );
  // } else if (pdfData?.pdfPath === "pg_par.pdf") {
  //   return (
  //     <>
  //       <div className="flex flex-row w-screen bg-red-200 h-screen">
  //         <iframe src={pg_parPdf} className="w-1/2"></iframe>
  //         <h1 className="w-1/2">PDF Path: {pdfData.pdfPath}</h1>
  //       </div>
  //     </>
  //   );
  // }
};

export { Pdf };
