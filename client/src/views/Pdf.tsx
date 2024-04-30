/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: Pdf.tsx: Describes the PDF Viewer component that displays arbitrary PDFs as part of the note taking page.
import { useParams } from "react-router-dom";
import sommervillePdf from "../assets/sommerville.pdf";
import som5 from "../assets/som5.pdf";
import som6 from "../assets/som6.pdf";
import som7 from "../assets/som7.pdf";
import som22 from "../assets/som22.pdf";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Question, Answer, CreateQuestion, UserGuide } from "../components";

// Define the structure of notes
type Note = {
  id: string;
  chapter: string;
  header: string;
  question: string;
  answer: string;
};

// PDF Viewer component
const Pdf = () => {
  const { pdfId } = useParams();

  const [showNotes, setShowNotes] = useState(true);

  // Query to fetch notes data
  const {
    isLoading: notesIsLoading,
    isError: notesIsError,
    data: notesData,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      // Receive notes data from the ARS
      const result = (
        await axios.get("http://localhost:3000/getNotes", {
          params: {
            pdfId: pdfId,
          },
        })
      ).data.reverse() as Array<Note>;

      return {
        questions: result.filter(({ answer }) => !answer),
        answers: result.filter(({ answer }) => answer),
      };
    },
  });

  console.log(`NOTES DATA: ${JSON.stringify(notesData)}`);

  // Query to fetch PDF data
  const {
    isLoading: pdfIsLoading,
    isError: pdfIsError,
    data: pdfData,
  } = useQuery({
    queryKey: ["pdf"],
    queryFn: async () => {
      // Fetch PDF data from the ARS
      return (
        await axios.get("http://localhost:3000/getPdf", {
          params: {
            pdfId: pdfId,
          },
        })
      ).data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<{ chapter: string; header: string; body: string }>();

  // Render the components
  return (
    notesData &&
    pdfData && (
      <div className="flex flex-row w-screen h-screen">
        <iframe
          src={(() => {
            if (pdfData.path == "som5.pdf") {
              return som5;
            } else if (pdfData.path == "som6.pdf") {
              return som6;
            } else if (pdfData.path == "som7.pdf") {
              return som7;
            } else if (pdfData.path == "som22.pdf") {
              return som22;
            } else {
              return sommervillePdf;
            }
          })()}
          className="w-1/2"
        ></iframe>
        <div className="w-1/2 m-8 pb-16 flex flex-col gap-y-4 h-screen overflow-y-auto">
          {/* <h1>PDF Path: {pdfData.path}</h1> */}
          {/* <h1>NOTES DATA: {JSON.stringify(notesData)}</h1> */}
          <UserGuide />
          <button
            className="mx-24 mb-8 px-2.5 py-1.5 bg-black rounded-md text-white"
            onClick={() => {
              setShowNotes(!showNotes);
            }}
          >
            {showNotes ? <h1>Review Mode</h1> : <h1>Show Notes</h1>}
          </button>
          {showNotes ? (
            <>
              <h1 className="text-3xl font-bold">CREATE QUESTION</h1>
              <CreateQuestion pdfId={pdfId!} />
              <h1 className="text-3xl font-bold">QUESTIONS</h1>
              {notesData.questions.map(({ id, chapter, header, question }) => (
                <Question
                  id={id}
                  chapter={chapter}
                  header={header}
                  question={question}
                  reviewMode={false}
                />
              ))}
              <h1 className="text-3xl font-bold">ANSWERS</h1>
              {notesData.answers.map(({ chapter, header, answer }) => (
                <Answer chapter={chapter} header={header} answer={answer} />
              ))}
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">QUESTIONS</h1>
              {[...notesData.questions, ...notesData.answers].map(
                ({ id, chapter, header, question }) => (
                  <Question
                    id={id}
                    chapter={chapter}
                    header={header}
                    question={question}
                    reviewMode={true}
                  />
                )
              )}
            </>
          )}
        </div>
      </div>
    )
  );
};

export { Pdf };
