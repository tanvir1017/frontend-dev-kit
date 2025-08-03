import { ForgetPasswordComp } from "@/components/page/forget-password/forget-password";

const ForgetPassword = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-xl">
        <ForgetPasswordComp />
      </div>
    </div>
  );
};

export default ForgetPassword;
