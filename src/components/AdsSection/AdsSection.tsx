import FamilyBizBanner from "../FamilyBiz/FamilyBizBanner";
import RiseupBanner from "../RiseupBanner/RiseupBanner";
import { chooseRandom } from "../common/helpers";

const AdsSection = () => {
  const stickyAd = chooseRandom(["riseup", "familybiz"]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-5 text-2xl font-bold">הטבה מיוחדת למשתמשי המחשבון</h2>
      <div className="flex flex-col items-center justify-center gap-6">
        {stickyAd === "familybiz" && <FamilyBizBanner />}
        {stickyAd === "riseup" && <RiseupBanner />}
      </div>
    </div>
  );
};

export default AdsSection;
