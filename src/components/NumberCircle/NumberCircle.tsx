interface NumberCircleProps {
  number: number;
}

const NumberCircle = (props: NumberCircleProps) => {
  const { number } = props;

  return (
    <div
      className={`flex h-6 w-6 items-center justify-center rounded-full bg-idf text-sm text-white`}
    >
      {number}
    </div>
  );
};

export default NumberCircle;
