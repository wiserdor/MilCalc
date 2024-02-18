import { Slider } from "@/shadcn/ui/slider";

const calculatePosition = (value: number, min: number, max: number) => {
  const percentage = ((value - min) / (max - min)) * 100;
  // Adjust position to align bubble's center with thumb, assume bubble's width is 50px
  return `calc(${percentage}% - 43px)`;
};

const OneZeroSlider = (props: {
  value: number;
  handleValueChange: (value: number) => void;
}) => {
  const { value = 0, handleValueChange } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-end">
        <div
          id="valueBubble"
          className="relative w-fit rounded-md bg-white px-3 py-1 text-center text-sm text-blue"
          style={{
            left: calculatePosition(value, 0, 50000)
          }}
        >
          {value.toLocaleString("he-il", {
            currency: "ILS",
            style: "currency",
            maximumFractionDigits: 0
          })}
        </div>
      </div>
      <Slider
        defaultValue={[value]}
        value={[value]}
        onValueChange={(value) => handleValueChange(value[0])}
        max={50000}
        min={0}
        step={1}
        color="#0066FF"
      />
      <div className="flex justify-between text-sm font-normal text-dark-gray">
        <div>₪50,000</div>
        <div>₪0</div>
      </div>
    </div>
  );
};

export default OneZeroSlider;
