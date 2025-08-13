import { useRefreshTokenMutation } from "@/redux/features/auth/authAPi";

const useRefreshToken = () => {
  const [refreshToken] = useRefreshTokenMutation();
  const getNewRefreshToken = async () => {
    try {
      const sm = await refreshToken(undefined);
      console.log(sm);
    } catch (error) {
      console.error(error);
    }
  };
  return getNewRefreshToken;
};

export default useRefreshToken;
