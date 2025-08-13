import usePersist from "@/hooks/usePersist";
import { useRefreshTokenMutation } from "@/redux/features/auth/authAPi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";

const PersistLogin = () => {
  const [persist] = usePersist();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState<boolean>(false);

  const [
    refreshToken,
    { isLoading, isSuccess, isError, error, isUninitialized },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      console.log("hello persist login");
      const verifyRefreshToken = async () => {
        console.log("Verify Refresh Token");
        try {
          //        const response =
          await refreshToken(undefined);

          //          const { accessToken } = response.data;

          setTrueSuccess(true);
        } catch (error) {
          console.error("adkfasdlf;", error);
        }
      };
      if (!accessToken && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;

  if (!persist) {
    // Persist: No
    console.log("No persistence");
    content = <Outlet />;
  } else if (isLoading) {
    // Persist: Yes, token: no
    console.log("loading...");
    content = <p>Loading...</p>;
  } else if (isError) {
    // Persist: Yes, token: no
    console.log("From Persist", error?.data?.message);
    content = (
      <>
        <Outlet />
      </>
    );
  } else if (isSuccess || trueSuccess) {
    // Persist: Yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (accessToken && isUninitialized) {
    // Persist: Yes, token: yes
    console.log(isUninitialized);
    console.log("token and uninitialized");
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
