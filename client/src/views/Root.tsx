import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

const Root = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return (await axios.get("http://localhost:3000/getUsers")).data;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ name }: { name: string }) => {
      console.log(`CREATING: ${name}`);
      return axios.post("http://localhost:3000/createUser", { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ name: string }>();

  return (
    <div className="flex flex-col items-center">
      <h1>Users: {JSON.stringify(data)}</h1>
      <div>
        <h1>Create New User:</h1>
        <form
          onSubmit={handleSubmit((data) => {
            mutation.mutate(data);
          })}
        >
          <h1>Name:</h1>
          <input {...register("name")} className="border-black border-2" />
        </form>
      </div>
    </div>
  );
};

export { Root };
