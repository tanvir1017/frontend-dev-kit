import { useGetMeQuery } from "@/redux/features/users/userApi";
import { useAppSelector } from "@/redux/hooks";
import { ApiResponse } from "@/types/types";
import { Navigate } from "react-router";

const Home = () => {
  const { data, isLoading, isError, error } = useGetMeQuery("curr-user", {
    //pollingInterval: 15000,
  });
  const currUser = useAppSelector((state) => state.user.currUser);

  const useInfo = data as ApiResponse;

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    setTimeout(() => {
      <Navigate to="/login" replace />;
    }, 5000);
    content = <div>Error: {JSON.stringify(error)}</div>;
  }

  if (!isLoading && !isError && useInfo) {
    content = (
      <div>
        <h1 className="text-2xl font-bold text-center">
          Welcome, {currUser?.name.firstName} {currUser?.name.lastName}
        </h1>
      </div>
    );
  }

  return content;
};

export default Home;
