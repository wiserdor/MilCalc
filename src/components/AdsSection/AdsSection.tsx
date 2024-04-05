import FamilyBizBanner from "../FamilyBiz/FamilyBizBanner";
import RiseupBanner from "../RiseupBanner/RiseupBanner";

const AdsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-5 text-2xl font-bold">הטבה מיוחדת למשתמשי המחשבון</h2>
      <div className="flex flex-col items-center justify-center gap-6">
        <FamilyBizBanner />
        <RiseupBanner />
      </div>
    </div>
  );
};

export default AdsSection;
