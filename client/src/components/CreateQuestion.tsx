/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: CreateQuestion.tsx: Describes the input form used to create a new question on the Note Taking page.
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

const CreateQuestion: React.FC<{ pdfId: string }> = ({ pdfId }) => {
  const queryClient = useQueryClient();

  const createQuestionMutation = useMutation({
    mutationFn: ({
      pdfId,
      chapter,
      header,
      question,
    }: {
      pdfId: string;
      chapter: string;
      header: string;
      question: string;
    }) => {
      return axios.post("http://localhost:3000/createQuestion", {
        pdfId,
        chapter,
        header,
        question,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<{ chapter: string; header: string; question: string }>();

  return (
    <>
      <div className="border-[#e4e4e7] border-[1px] rounded-xl p-4">
        <form
          className="flex flex-col justify-between mt-8"
          onSubmit={handleSubmit((data) => {
            createQuestionMutation.mutate({ pdfId, ...data });
            reset();
          })}
        >
          <div className="flex flex-row gap-x-2">
            <h1>Chapter: </h1>
            <input
              {...register("chapter")}
              className="border-[#e4e4e7] border-[1px] rounded-md w-full"
            />
          </div>
          <div className="flex flex-row gap-x-2">
            <h1>Header: </h1>
            <input
              {...register("header")}
              className="border-[#e4e4e7] border-[1px] rounded-md w-full"
            />
          </div>
          <div className="flex flex-row gap-x-2">
            <h1>Question: </h1>
            <input
              {...register("question")}
              className="border-[#e4e4e7] border-[1px] rounded-md w-full"
            />
          </div>

          <div className="flex flex-row justify-between mt-8 mb-2">
            <div></div>
            <button
              className="px-2.5 py-1.5 bg-black rounded-md text-sm font-semibold text-white"
              type="submit"
            >
              <h1>Create Question</h1>
            </button>
          </div>
        </form>
        <div />
      </div>
    </>
  );
};

export { CreateQuestion };
