import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useUserStore } from "../store";
import type { UserStoreState } from "../store";

const A = () => {
  const user = useUserStore((state) => (state as UserStoreState).userId);

  return (
    <div>
      <h1>Component A</h1>
      <h1>User Id: {user}</h1>
    </div>
  );
};

const B = () => {
  const user = useUserStore((state) => (state as UserStoreState).userId);

  return (
    <div>
      <h1>Component B</h1>
      <h1>User Id: {user}</h1>
    </div>
  );
};

const Root = () => {
  const user = useUserStore((state) => (state as UserStoreState).userId);
  const updateUserId = useUserStore(
    (state) => (state as UserStoreState).setUserId
  );

  return (
    <>
      <h1>User Id: {user}</h1>
      <button
        onClick={() => {
          updateUserId(user + 1);
        }}
      >
        <h1>Update User ID</h1>
      </button>
      <A />
      <B />
    </>
  );
};

// const Root = () => {
//   // const queryClient = useQueryClient();

//   // const { isLoading, isError, data } = useQuery({
//   //   queryKey: ["users"],
//   //   queryFn: async () => {
//   //     return (await axios.get("http://localhost:3000/getUsers")).data;
//   //   },
//   // });

//   // const mutation = useMutation({
//   //   mutationFn: ({ name }: { name: string }) => {
//   //     console.log(`CREATING: ${name}`);
//   //     return axios.post("http://localhost:3000/createUser", { name });
//   //   },
//   //   onSuccess: () => {
//   //     queryClient.invalidateQueries({ queryKey: ["users"] });
//   //   },
//   // });

//   // const {
//   //   register,
//   //   handleSubmit,
//   //   watch,
//   //   formState: { errors },
//   // } = useForm<{ name: string }>();

//   return (
//     <div className="flex flex-col items-center">
//       {/* <h1>Users: {JSON.stringify(data)}</h1>
//       <div>
//         <h1>Create New User:</h1>
//         <form
//           onSubmit={handleSubmit((data) => {
//             mutation.mutate(data);
//           })}
//         >
//           <h1>Name:</h1>
//           <input {...register("name")} className="border-black border-2" />
//         </form>
//       </div> */}
//       <A />
//       <B />
//     </div>
//   );
// };

export { Root };
