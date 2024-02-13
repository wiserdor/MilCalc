import { useEffect, useRef } from "react";
import useStore from "../../store/store";

const ValidationSection = () => {
  const validationErrors = useStore((state) => state.validationErrors);

  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to results on submit
    if (validationErrors?.length > 0 && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [validationErrors]);

  if (validationErrors.length === 0) return null;

  return (
    <>
      <div
        ref={errorRef}
        className={`flex flex-col items-center justify-center gap-2 px-4`}
      >
        <div
          className={`mb-4 flex flex-row items-baseline gap-3 text-base font-semibold`}
        >
          לא ניתן לחשב:
        </div>
        {validationErrors.map((error) => (
          <div key={error} className="mb-4 font-semibold text-red-600">
            {error}
          </div>
        ))}
      </div>
    </>
  );
};

export default ValidationSection;
