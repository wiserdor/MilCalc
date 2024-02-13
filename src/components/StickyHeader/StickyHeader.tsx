import { Button } from "@/shadcn/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/shadcn/ui/dialog";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { CopyIcon } from "lucide-react";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { toast } from "sonner";

const SHARE_MESSAGE =
  "המענקים למילואימניקים אושרו בממשלה! כנסו למחשבון לבדוק לכמה אתם זכאים:";
const SHARE_URL = "https://miluimnik.info";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const StickyHeader = () => {
  return (
    <div
      className={`fixed top-0 z-30 w-full rounded border-b-[1.5px] border-solid border-b-stone bg-ocean`}
    >
      <div className={`flex justify-between p-4 text-sm font-normal`}>
        <button className="cursor-pointer rounded-full bg-one-zero-black px-4 py-2 text-white">
          לפתיחת חשבון ב-ONE ZERO
        </button>
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
              <WhatsappShareButton url={SHARE_URL} title={SHARE_MESSAGE}>
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
                  toast("הקישור הועתק בהצלחה");
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
