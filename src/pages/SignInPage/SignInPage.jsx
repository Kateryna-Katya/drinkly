import { Toaster } from "react-hot-toast";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthPagesWrapper from "../../components/AuthPagesWrapper/AuthPagesWrapper";

const SignInPage = () => {
  return (
    <AuthPagesWrapper signin>
      <Toaster />
      <AuthForm signin />
    </AuthPagesWrapper>
  );
};
export default SignInPage;
