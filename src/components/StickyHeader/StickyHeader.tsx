import { Button } from "@/shadcn/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/shadcn/ui/dialog";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { useToast } from "@/shadcn/ui/use-toast";
import { CopyIcon } from "lucide-react";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon
} from "react-share";

import ReactGA from "react-ga4";

const trackLinkClick = () => {
  ReactGA.event({
    category: "click_riseup_sticky",
    action: "click_riseup-sticky_click"
  });
};

const SHARE_WHATSAPP_MESSAGE = `נכנסתי למחשבון הזה עכשיו, עשו שינויים ואפשר לראות מתי כל סכום נכנס ויש לנו מלא הטבות בתור מילואמינקים!
כנסו לבדוק מה מגיע לכם גם:`;
const SHARE_MESSAGE =
  "המענקים למילואימניקים אושרו בממשלה! כנסו למחשבון לבדוק לכמה אתם זכאים:";
const SHARE_URL = "https://miluimnik.info";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const StickyHeader = () => {
  const { toast } = useToast();

  return (
    <div
      className={`fixed top-0 z-30 w-full rounded border-b-[1.5px] border-solid border-b-stone bg-ocean`}
    >
      <div className={`flex justify-between p-4 text-sm font-normal`}>
        <a
          href="https://landing.riseup.co.il/wnd_slider_v3/?promoCode=FacebookGroup&utm_source=facebookgroup_model&utm_medium=social&utm_campaign=ru_facebookgroup&utm_content=miluimnik"
          target="_blank"
          rel="noreferrer"
          onClick={trackLinkClick}
        >
          <Button
            variant="none"
            className="flex cursor-pointer gap-[2px] rounded-full bg-[#FBC637] px-4 py-2 text-sm font-medium leading-4"
          >
            <div>להטבה מיוחדת ב</div>
            <div>-</div>
            <img src="/svg/riseup-horizontal.svg" alt="riseup horizontal" />
          </Button>
        </a>
        <Dialog>
          <DialogTrigger asChild>
            <button
              className={`flex cursor-pointer items-center justify-center gap-1 rounded-full bg-idf px-4 py-2 text-white`}
            >
              <img src="/svg/share.svg" alt="שיתוף" />
              <span>לשיתוף</span>
            </button>
          </DialogTrigger>
          <DialogContent className="w-11/12 rounded-3xl sm:max-w-md">
            <div
              className={`flex items-center justify-center gap-2 rounded-3xl bg-white py-5 `}
            >
              <div>שתפו:</div>
              <WhatsappShareButton
                url={SHARE_URL}
                title={SHARE_WHATSAPP_MESSAGE}
              >
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
              <TelegramShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
                <TelegramIcon size={32} round={true} />
              </TelegramShareButton>
              <FacebookShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
                <XIcon size={32} round={true} />
              </TwitterShareButton>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                type="submit"
                size="sm"
                className=""
                onClick={() => {
                  copyToClipboard("https://miluimnik.info");
                  toast({ description: "הקישור הועתק בהצלחה", duration: 2000 });
                }}
              >
                <CopyIcon className="h-4 w-4" />
                <span className="sr-only">העתק</span>
              </Button>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  העתק:
                </Label>
                <Input
                  id="link"
                  defaultValue="https://miluimnik.info"
                  readOnly
                  className="text-left focus-visible:ring-0"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StickyHeader;
