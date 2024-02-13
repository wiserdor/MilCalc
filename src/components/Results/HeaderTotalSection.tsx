import ArrowDown from "../../svg/ArrowDown";
import Money from "../../svg/Money";
import Voucher from "../../svg/Voucher";

const HeaderTotalSection = (props: {
  totalCompensation: number;
  totalVoucher: number;
}) => {
  const { totalCompensation, totalVoucher } = props;
  return (
    <div className="mb-6 flex items-center justify-center gap-4 text-white">
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[#528322] py-4 ">
        <Money strokeColor="white" />
        <div className="flex flex-col justify-center text-center">
          <div>תגמולים ומענקים</div>
          <div className="font-bold">{`₪${totalCompensation.toLocaleString("he-IL")}`}</div>
        </div>
        <ArrowDown strokeColor="white" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[#0066FF] py-4 ">
        <Voucher strokeColor="white" />
        <div className="flex flex-col items-center justify-center">
          <div>שוברים וסיוע</div>
          <div className="font-bold">{`₪${totalVoucher.toLocaleString(
            "he-IL",
          )}`}</div>
        </div>
        <ArrowDown strokeColor="white" />
      </div>
    </div>
  );
};

export default HeaderTotalSection;
