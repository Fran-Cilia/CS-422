import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "../components";

const Login = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return (await axios.get("http://localhost:3000/getUsers")).data;
    },
  });

  return (
    data && (
      <div className="h-screen flex flex-col items-center">
        <h1 className="mt-24 text-4xl font-semibold">Welcome to ARA</h1>
        <h1 className="mt-12 text-4xl font-semibold">Select User</h1>

        <div className="flex flex-row items-center gap-x-8 mt-24">
          {data.map(
            ({
              id,
              name,
              pfpPath,
            }: {
              id: number;
              name: string;
              pfpPath: string;
            }) => (
              <UserProfile id={id} name={name} pfpPath={pfpPath} />
            )
          )}
        </div>
      </div>
    )
  );
};

export { Login };
