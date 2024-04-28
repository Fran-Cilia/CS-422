import axios from "axios";
import { useUserStore } from "../store";
import type { UserStoreState } from "../store";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC<{ id: number; name: string; pfpPath: string }> = ({
  id,
  name,
  pfpPath,
}) => {
  // const user = useUserStore((state) => (state as UserStoreState).userId);
  const updateUserId = useUserStore(
    (state) => (state as UserStoreState).setUserId
  );

  const nav = useNavigate();

  return (
    <button
      className="flex flex-col items-center border-[1px] border-[#e4e4e7] rounded-xl p-8"
      onClick={() => {
        updateUserId(id);
        nav("/pdfs");
      }}
    >
      <img src={pfpPath} className="h-24 w-24 rounded-full" />
      <h1 className="mt-4 font-semibold text-lg">{name}</h1>
    </button>
  );
};

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
        <h1 className="mt-24 text-4xl font-semibold">Welcome to SQ3R</h1>
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
