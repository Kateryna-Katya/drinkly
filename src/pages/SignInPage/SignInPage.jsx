import AuthForm from "../../components/AuthForm/AuthForm";
import AuthPagesWrapper from "../../components/AuthPagesWrapper/AuthPagesWrapper";

const SignInPage = () => {
  return (
    <AuthPagesWrapper signin>
      <AuthForm signin />
    </AuthPagesWrapper>
  );
};
export default SignInPage;
