import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useStore from "../../store/store";
import { FormValues } from "../../store/types";
import NumberCircle from "../NumberCircle/NumberCircle";
import Toggle from "../Toggle/Toggle";
import FormDateSection from "./FormDateSection";
import FormInput from "./FormInput";
import ValidationSection from "./ValidationSection";
import { validateForm } from "./validation";
import ArrowLeft from "../../svg/ArrowLeft";

const toggles = {
  isCombat: "במערך הלוחם",
  hasChildren: "ילדים עד גיל 14",
  hasChildrenSpecial: "ילדים עם צרכים מיוחדים",
  isOld: "מוחרג/ת גיל",
  isIndependent: "עצמאי/ת",
  isStudent: "סטודנט/ית",
  didVacationCancelled: "ביטלתי חופשה/טיסה",
};

const CalculatorForm = () => {
  const setFormState = useStore((state) => state.setFormState);
  const loadStateFromUrl = useStore((state) => state.loadStateFromUrl);
  const updateCalculatorResults = useStore(
    (state) => state.updateCalculatorResults,
  );
  const serviceBefore = useStore((state) => state.serviceBefore);
  const isCombat = useStore((state) => state.isCombat);
  const isStudent = useStore((state) => state.isStudent);
  const isOld = useStore((state) => state.isOld);
  const isIndependent = useStore((state) => state.isIndependent);
  const hasChildren = useStore((state) => state.hasChildren);
  const hasChildrenSpecial = useStore((state) => state.hasChildrenSpecial);
  const didVacationCancelled = useStore((state) => state.didVacationCancelled);
  const dateRanges = useStore((state) => state.dateRanges);

  const setValidationErrors = useStore((state) => state.setValidationErrors);

  const { handleSubmit, control, register } = useForm<FormValues>({
    defaultValues: {
      dateRanges,
      serviceBefore,
      isCombat,
      isStudent,
      isOld,
      isIndependent,
      didVacationCancelled,
      hasChildren,
      hasChildrenSpecial,
    },
  });

  useEffect(() => {
    loadStateFromUrl();
  }, []);

  const onSubmit = (data: FormValues) => {
    const errors = validateForm(
      data.dateRanges,
      data.serviceBefore,
      data.operation24Days,
    );
    setValidationErrors(errors);
    if (errors.length > 0) {
      return;
    }
    setFormState({ ...data });
    updateCalculatorResults(); // Calculate and update results in store
  };

  return (
    <div className="pb-12">
      <div className="relative mb-5 flex items-center justify-center">
        <img src="/svg/square-arrow.svg" alt="arrow" />
      </div>
      <div className="pb-5">
        <div className="px-4 py-2 text-center text-[1.4rem] font-semibold leading-tight">
          רוצים לדעת כמה מגיע לכם/ן? בדקו עכשיו
        </div>
        <div className="text-center font-normal text-dark-gray">
          אנא מלאו את הפרטים הבאים:
        </div>
      </div>

      <form className={`flex flex-col gap-6`} onSubmit={handleSubmit(onSubmit)}>
        <FormDateSection control={control} register={register} />
        <div
          className={`flex flex-col rounded-2xl border-[1.5px] border-solid border-idf bg-white px-4 pb-6 pt-4`}
        >
          <div
            className={`mb-4 flex flex-row items-baseline gap-3 text-base font-semibold`}
          >
            <NumberCircle number={2} />
            <div style={{ flex: 1 }}>
              מספר ימי המילואים שביצעת בשנת 2023 (לפני ה- 7/10):
            </div>
          </div>
          <FormInput
            type="number"
            min={0}
            step={0.5}
            register={register}
            registerOptions={{ required: true, min: 0, max: 365 }}
            name="serviceBefore"
          />
        </div>

        <div className="flex flex-col rounded-2xl border-[1.5px] border-solid border-idf bg-white px-4 pb-6 pt-4">
          <div>
            <div className="mb-2 flex flex-row items-baseline gap-3 text-base font-semibold">
              <NumberCircle number={3} />
              <div style={{ flex: 1 }}>בחרו בקטגוריות הרלוונטיות לגביכם/ן:</div>
            </div>
            <div className="mb-6 flex w-fit items-center justify-start gap-2 rounded-[3px] bg-[#F2F6FD] px-2 py-[6px] text-xs font-semibold text-[#A15FF7]">
              <ArrowLeft strokeColor="#A15FF7" />
              <div>הוספנו קטגוריות חדשות!</div>
            </div>
          </div>
          <div className="flex w-full flex-wrap gap-x-3 gap-y-4">
            {Object.entries(toggles).map(([name, label]) => (
              <Controller
                control={control}
                name={name as keyof typeof toggles}
                render={({ field: { onChange, value, name, ref } }) => {
                  return (
                    <Toggle
                      label={label}
                      name={name}
                      active={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  );
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="cursor-pointer whitespace-nowrap rounded-full bg-blue px-6 py-3 text-center text-base font-semibold text-white"
            type="submit"
          >
            לחישוב המענקים
          </button>
        </div>
        <ValidationSection />
      </form>
    </div>
  );
};

export default CalculatorForm;
