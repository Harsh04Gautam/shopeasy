import { useState } from "react";
import { form as css, Signup, Signin, Notification, Loader } from "./index";

const Form = () => {
  const [formType, setFormType] = useState<"signup" | "signin">("signup");
  const [request, setRequest] = useState({
    loading: false,
    message: "",
    success: false,
    uninitialized: false,
  });

  return (
    <>
      <Loader isLoading={request.loading}>
        {!request.loading && !request.uninitialized && request.message && (
          <Notification
            message={request.message}
            color={request.success ? "green" : "red"}
          />
        )}
        <div className={css.container}>
          {formType === "signup" ? (
            <Signup setFormType={setFormType} setRequest={setRequest} />
          ) : (
            <Signin setFormType={setFormType} setRequest={setRequest} />
          )}
        </div>
      </Loader>
    </>
  );
};

export default Form;
