import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  FormInputGroup,
  useInput,
  useSignInUserMutation,
  signinCss as css,
  google,
  facebook,
} from "../index";
import z from "zod";

type SigninProps = {
  setFormType: Dispatch<SetStateAction<"signup" | "signin">>;
  setRequest: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      message: string;
      success: boolean;
      uninitialized: boolean;
    }>
  >;
};

const emailSchema = z
  .string({ required_error: "please provide your email" })
  .email({ message: "must be a valid email" });
const passwordSchema = z.string({
  required_error: "please provide a password",
});

const messageSuccess = "you are successfully logged in";
const messageError = "could not login with your email";

const Signin = ({ setFormType, setRequest }: SigninProps) => {
  const [email, setEmail, checkIfValidEmail] = useInput(emailSchema);
  const [password, setPassword, checkIfValidPassword] =
    useInput(passwordSchema);
  const [invalidSubmit, setInvalidSubmit] = useState(false);

  const [signIn, { isUninitialized, isLoading, isSuccess }] =
    useSignInUserMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = checkIfValidEmail();
    const isValidPassword = checkIfValidPassword();

    if (!isValidEmail || !isValidPassword) return setInvalidSubmit(true);

    signIn({ email: email.value!, password: password.value! });
  };

  useEffect(() => {
    if (!email.error && !password.error) setInvalidSubmit(false);
  }, [email.error, password.error]);

  useEffect(() => {
    const message = isSuccess ? messageSuccess : messageError;
    setRequest({
      message: message,
      loading: isLoading,
      success: isSuccess,
      uninitialized: isUninitialized,
    });
  }, [isLoading]);

  return (
    <div className={css["container"]}>
      <h3 className={css.heading}>Sign in</h3>
      <form onSubmit={handleSubmit}>
        <FormInputGroup
          groupName="email"
          inputInfo={email}
          setInput={setEmail}
          invalidSubmit={invalidSubmit}
        />
        <FormInputGroup
          groupName="password"
          inputInfo={password}
          setInput={setPassword}
          invalidSubmit={invalidSubmit}
        />
        <p className="form__change-type" onClick={() => setFormType("signup")}>
          Don't have an account?
        </p>
        <button className="form__btn">Sign in</button>
      </form>
      <span className="form__separate">or</span>
      <button className="sign-in-with">
        <img src={google} alt="google logo" />
        Sign in with Google
      </button>
      <button className="sign-in-with">
        <img src={facebook} alt="facebook logo" />
        Sign in with Facebook
      </button>
    </div>
  );
};

export default Signin;
