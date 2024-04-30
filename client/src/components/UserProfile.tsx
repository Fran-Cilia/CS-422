/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: UserProfile.tsx: Describes the user profiles shown on the User selection page.  
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store";
import type { UserStoreState } from "../store";

// Define the UserProfile component
const UserProfile: React.FC<{ id: number; name: string; pfpPath: string }> = ({
  id,
  name,
  pfpPath,
}) => {
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

// Export the UserProfile component
export { UserProfile };
