import { differenceInCalendarDays } from "date-fns";
import { Fragment, useMemo } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { FormValues } from "../../store/types";
import NumberCircle from "../NumberCircle/NumberCircle";
import DateInput from "./DateInput";
import clsx from "clsx";

interface FormDateSectionProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
}

const FormDateSection = (props: FormDateSectionProps) => {
  const { control } = props;
  const { fields, append, remove, update } = useFieldArray({
    name: "dateRanges",
    control
  });

  // Modify onAddDateRange and onRemoveDateRange to use append and remove
  const onAddDateRange = () => {
    append({
      startDate: "2023-10-07",
      endDate: new Date().toISOString().split("T")[0]
    });
  };

  const onRemoveDateRange = (index: number) => {
    remove(index);
  };

  const getTotalDays = useMemo(() => {
    return fields.reduce(
      (acc, { startDate, endDate }) =>
        acc +
        differenceInCalendarDays(new Date(endDate), new Date(startDate)) +
        1,
      0
    );
  }, [fields]);

  return (
    <div className="flex flex-col rounded-2xl border-[1.5px] border-solid border-idf bg-white ">
      <div className="px-4 pb-6  pt-4">
        <div className="mb-4 flex flex-row items-baseline gap-3 text-base font-semibold">
          <NumberCircle number={1} />
          <div style={{ flex: 1 }}>בחרו את תאריכי שירות המילואים</div>
        </div>
        <div className="flex w-full flex-col gap-2">
          {fields.map((field, index) => (
            <Fragment key={index}>
              <div
                className={clsx(
                  fields.length > 1 &&
                    "border-b-[1.5px] border-dotted border-b-[#ccc]",
                  "grid grid-cols-2 gap-x-2 pb-6"
                )}
              >
                <DateInput
                  date={field.startDate}
                  onChange={(date) =>
                    update(index, { ...field, startDate: date })
                  }
                  label="תאריך גיוס:"
                  placeholder="בחר תאריך התחלה"
                />
                <DateInput
                  date={field.endDate}
                  onChange={(date) =>
                    update(index, { ...field, endDate: date })
                  }
                  label="תאריך שחרור:"
                  placeholder="בחר תאריך שחרור"
                />
              </div>
              {fields.length > 1 && (
                <div
                  className={`relative bottom-[9px] flex w-full items-center justify-center`}
                  onClick={() => onRemoveDateRange(index)}
                >
                  <div className="absolute flex h-6 w-8 cursor-pointer items-center justify-center rounded-2xl bg-stone text-center text-lg font-bold text-blue">
                    <div>-</div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
        <div
          className=" mt-7 flex w-full cursor-pointer flex-col items-center justify-center"
          onClick={onAddDateRange}
        >
          <img className="fill-blue" src="/svg/plus.svg" alt="הוסף תאריך" />
          <div className={`text-sm font-bold  text-blue`}>
            להוספת טווח תאריכים נוסף
          </div>
        </div>
      </div>
      <div className="rounded-b-2xl  bg-ocean py-4 text-center text-base font-normal text-idf">
        <span className="font-bold">{getTotalDays > 0 ? getTotalDays : 0}</span>{" "}
        ימי מילואים
      </div>
    </div>
  );
};

export default FormDateSection;
