import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import clsx from "clsx";
import { differenceInCalendarDays, format } from "date-fns";
import { he } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { FormValues } from "../../store/types";
import NumberCircle from "../NumberCircle/NumberCircle";

interface FormDateSectionProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
}

const FormDateSection = (props: FormDateSectionProps) => {
  const { control } = props;
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);

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
                className={`${
                  fields.length > 1
                    ? `border-b-[1.5px] border-dotted border-b-[#ccc]`
                    : ""
                } ${
                  fields.length > 1 ? "pb-6" : ""
                } grid grid-cols-2 gap-x-2 pb-6`}
              >
                <div className="flex flex-col">
                  <label className="mb-1 mt-2 block font-normal">
                    תאריך גיוס:
                  </label>
                  <Popover
                    open={isStartCalendarOpen}
                    onOpenChange={setIsStartCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={clsx(
                          " justify-start text-left font-normal",
                          !field.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {field.startDate ? (
                          format(field.startDate, "dd/MM/yyyy")
                        ) : (
                          <span>בחר תאריך התחלה</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(field.startDate)}
                        onSelect={(day) => {
                          update(index, {
                            ...field,
                            startDate:
                              day?.toDateString() ?? new Date().toString()
                          });
                          setIsStartCalendarOpen(false);
                        }}
                        fromDate={new Date("2023-10-07")}
                        required
                        locale={he}
                        dir="rtl"
                        initialFocus
                        showOutsideDays={false}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 mt-2 block font-normal">
                    תאריך שחרור:
                  </label>
                  <Popover
                    open={isEndCalendarOpen}
                    onOpenChange={setIsEndCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={clsx(
                          " justify-start text-left font-normal",
                          !field.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {field.endDate ? (
                          format(field.endDate, "dd/MM/yyyy")
                        ) : (
                          <span>בחר תאריך שחרור</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(field.endDate)}
                        onSelect={(day) => {
                          update(index, {
                            ...field,
                            endDate:
                              day?.toDateString() ?? new Date().toString()
                          });
                          setIsEndCalendarOpen(false);
                        }}
                        fromDate={new Date("2023-10-07")}
                        locale={he}
                        required
                        initialFocus
                        dir="rtl"
                        showOutsideDays={false}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
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
