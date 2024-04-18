import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { useForm, SubmitHandler } from "react-hook-form";

function App() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await ky.get("http://localhost:3000/getUsers").json();

      console.log(`RESPONSE: ${JSON.stringify(response)}`);

      return response;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ name }: { name: string }) => {
      console.log(`CREATING: ${name}`);
      return ky.post("http://localhost:3000/createUser", { json: { name } });
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
}

export default App;
