import { Toaster } from "react-hot-toast";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthPagesWrapper from "../../components/AuthPagesWrapper/AuthPagesWrapper";

const SignUpPage = () => {
  return (
    <AuthPagesWrapper>
      <Toaster />
      <AuthForm />
    </AuthPagesWrapper>
  );
};
export default SignUpPage;
