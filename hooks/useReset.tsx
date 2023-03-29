import { useEffect } from "react";

export default function useReset(reset: any, isSubmitSuccessful: boolean) {
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);
}
