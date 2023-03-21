type Props = {
  groupName: string;
  inputInfo: {
    value: string | null;
    showError: boolean;
    error: string | null;
  };
  setInput: React.Dispatch<
    React.SetStateAction<{
      value: string | null;
      showError: boolean;
      error: string | null;
    }>
  >;
  invalidSubmit: boolean;
};

const FormInputGroup = ({
  groupName,
  inputInfo,
  setInput,
  invalidSubmit,
}: Props) => {
  return (
    <>
      <input
        className={`form__input ${
          inputInfo.error && inputInfo.value && "form__input--invalid"
        } ${!inputInfo.error && inputInfo.value && "form__input--valid"}`}
        type={groupName.includes("password") ? "password" : "text"}
        autoComplete="off"
        spellCheck="false"
        id={groupName}
        placeholder={groupName}
        value={inputInfo.value || ""}
        onChange={(e) => {
          setInput((prev) => ({ ...prev, value: e.target.value }));
        }}
      />
      <label className="form__label" htmlFor={groupName}>
        {groupName}
      </label>
      <p className="form__error">
        {((inputInfo.showError && inputInfo.value) || invalidSubmit) &&
          inputInfo.error}
      </p>
    </>
  );
};

export default FormInputGroup;
