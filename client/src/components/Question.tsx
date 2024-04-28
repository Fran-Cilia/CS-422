import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

type Note = {
  id: string;
  chapter: string;
  header: string;
  question: string;
  answer: string;
};

const Question: React.FC<Omit<Note, "answer"> & { reviewMode: boolean }> = ({
  id,
  chapter,
  header,
  question,
  reviewMode = false,
}) => {
  const queryClient = useQueryClient();

  const answerQuestionMutation = useMutation({
    mutationFn: ({ id, answer }: { id: string; answer: string }) => {
      return axios.post("http://localhost:3000/answerQuestion", { id, answer });
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
  } = useForm<{ answer: string }>();

  return (
    <div>
      <div className="border-[#e4e4e7] border-[1px] rounded-xl p-4 flex flex-col justify-between">
        <div>
          <h1 className="font-bold text-2xl">{chapter}</h1>
          <h1 className="mt-2 text-md font-light text-[#71717a]">
            Header: {header}
          </h1>
          <h1 className="mt-2 text-md font-light text-[#71717a]">
            Question: {question}
          </h1>
        </div>
        {!reviewMode && (
          <form
            className="flex flex-col justify-between mt-8"
            onSubmit={handleSubmit((data) => {
              answerQuestionMutation.mutate({ id, ...data });
              reset();
            })}
          >
            <div className="flex flex-row gap-x-2">
              <h1>Answer: </h1>
              <input
                {...register("answer")}
                className="border-[#e4e4e7] border-[1px] rounded-md w-full"
              />
            </div>

            <div className="flex flex-row justify-between mt-8 mb-2">
              <div></div>
              <button
                className="px-2.5 py-1.5 bg-black rounded-md text-sm font-semibold text-white"
                type="submit"
              >
                <h1>Answer Question</h1>
              </button>
            </div>
          </form>
        )}

        <div />
      </div>
    </div>
  );
};

export { Question };
