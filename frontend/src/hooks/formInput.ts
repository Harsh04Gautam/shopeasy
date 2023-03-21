import { useEffect, useState } from "react";
import z from "zod";

export const useInput = (Schema: z.Schema) => {
  const [inputInfo, setInputInfo] = useState<{
    value: string | null;
    showError: boolean;
    error: string | null;
  }>({
    value: null,
    showError: false,
    error: null,
  });

  const checkIfValidInput = () => {
    const result = Schema.safeParse(inputInfo.value || "");

    if (!result.success) {
      const err = result.error.issues.map((err) => err.message);
      setInputInfo((prev) => ({ ...prev, error: err[0], showError: true }));
      return false;
    }

    setInputInfo((prev) => ({ ...prev, error: null, showError: false }));
    return true;
  };

  useEffect(() => {
    checkIfValidInput();
  }, [inputInfo.value]);

  return [inputInfo, setInputInfo, checkIfValidInput] as const;
};
