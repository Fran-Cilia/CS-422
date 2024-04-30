/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: Login.tsx: Describes the format of the login page as well as all styling. 
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "../components";

// Component representing the login page
const Login = () => {
  // Fetching user data using React Query
  const { isLoading, isError, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // Fetching user data from the ARS
      return (await axios.get("http://localhost:3000/getUsers")).data;
    },
  });

  // Rendering user profiles if data is available
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
