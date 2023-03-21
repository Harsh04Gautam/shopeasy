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
  useSignUpUserMutation,
  signupCss as css,
  google,
  facebook,
} from "../index";
import z from "zod";

type SignupProps = {
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

const nameSchema = z
  .string({ required_error: "please provide your name" })
  .min(4, "name must  contain at least four characters");
const emailSchema = z
  .string({ required_error: "please provide your email" })
  .email({ message: "must be a valid email" });
const passwordSchema = z
  .string({ required_error: "please provide a password" })
  .min(6, { message: "password must contain at least 6 characters" });

const messageSuccess =
  "we sent a verification mail to your email address" as const;
const messageError = "could not signup, please try again later" as const;

const Signup = ({ setFormType, setRequest }: SignupProps) => {
  const [name, setName, checkIfValidName] = useInput(nameSchema);
  const [email, setEmail, checkIfValidEmail] = useInput(emailSchema);
  const [password, setPassword, checkIfValidPassword] =
    useInput(passwordSchema);
  const [
    passwordConfirmation,
    setPasswordConfirmation,
    checkIfValidPasswrodConfirmation,
  ] = useInput(passwordSchema);

  const [invalidSubmit, setInvalidSubmit] = useState(false);

  const [signUpUser, { isLoading, isSuccess, isUninitialized }] =
    useSignUpUserMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidName = checkIfValidName();
    const isValidEmail = checkIfValidEmail();
    const isValidPassword = checkIfValidPassword();
    const isValidPasswordConfirmation = checkIfValidPasswrodConfirmation();

    if (
      !isValidName ||
      !isValidEmail ||
      !isValidPassword ||
      !isValidPasswordConfirmation
    )
      return setInvalidSubmit(true);

    signUpUser({
      name: name.value!,
      email: email.value!,
      password: password.value!,
      passwordConfirmation: passwordConfirmation.value!,
    });

    setName({ value: null, error: null, showError: false });
    setEmail({ value: null, error: null, showError: false });
    setPassword({ value: null, error: null, showError: false });
    setPasswordConfirmation({ value: null, error: null, showError: false });
  };

  useEffect(() => {
    const message = isSuccess ? messageSuccess : messageError;
    setRequest({
      message: message,
      loading: isLoading,
      success: isSuccess,
      uninitialized: isUninitialized,
    });
  }, [isLoading]);

  useEffect(() => {
    checkIfValidPasswrodConfirmation();
    if (password.value !== passwordConfirmation.value)
      setPasswordConfirmation((prev) => ({
        ...prev,
        error: "passwords do not match",
        showError: true,
      }));
  }, [password.value, passwordConfirmation.value]);

  useEffect(() => {
    if (
      !name.error &&
      !email.error &&
      !password.error &&
      !passwordConfirmation.error
    )
      setInvalidSubmit(false);
  }, [name.error, email.error, password.error, passwordConfirmation.error]);

  return (
    <div className={css["container"]}>
      <h3 className={css.heading}>Sign up</h3>
      <form onSubmit={handleSubmit}>
        <FormInputGroup
          groupName="name"
          inputInfo={name}
          setInput={setName}
          invalidSubmit={invalidSubmit}
        />
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
        <FormInputGroup
          groupName="confirm password"
          inputInfo={passwordConfirmation}
          setInput={setPasswordConfirmation}
          invalidSubmit={invalidSubmit}
        />

        <p className="form__change-type" onClick={() => setFormType("signin")}>
          Already have an account?
        </p>
        <button className="form__btn">Sign up</button>
      </form>
      <span className="form__separate">or</span>
      <button className="sign-in-with">
        <img src={google} alt="google logo" />
        Sign up with Google
      </button>
      <button className="sign-in-with">
        <img src={facebook} alt="facebook logo" />
        Sign up with Facebook
      </button>
    </div>
  );
};

export default Signup;
