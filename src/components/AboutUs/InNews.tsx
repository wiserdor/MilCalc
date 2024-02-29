import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/shadcn/ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import React from "react";
import { YouTubeEmbed } from "react-social-media-embed";

const links: Array<
  | { type: "youtube"; url: string; title: string }
  | { type: "link"; url: string; title: string; imgSrc: string }
> = [
  {
    type: "youtube",
    url: "https://youtu.be/XmZcVSFertw",
    title: "ראיון בחדשות 12"
  },
  {
    type: "youtube",
    url: "https://youtu.be/PzwGpwkXd6g",
    title: "ראיון בגל״צ"
  },
  {
    type: "youtube",
    url: "https://youtu.be/xzAeaYlrOcA",
    title: "ראיון בכאן ב׳"
  },
  {
    type: "link",
    url: "https://www.maariv.co.il/business/tech/Article-1077701",
    title: "כתבה במעריב",
    imgSrc: "maariv.png"
  },
  {
    type: "link",
    url: "https://www.geektime.co.il/flash/financial-benefits-for-reserves/",
    title: "Geektimeכתבה ב",
    imgSrc: "geektime.png"
  },
  {
    type: "link",
    url: "https://www.mako.co.il/news-money/tech12/Article-dc34c1dc798fc81026.htm?sCh=31750a2610f26110&pId=1714755246_534305",
    title: "Tech12כתבה ב",
    imgSrc: "tech12.png"
  }
];

const InNews = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section>
      <h3 className="mb-4 text-center text-lg font-semibold leading-tight">
        המחשבון בתקשורת
      </h3>
      <Carousel
        opts={{
          loop: true
        }}
        dir="ltr"
        setApi={setApi}
        plugins={[WheelGesturesPlugin()]}
      >
        <CarouselContent className="px-4">
          {links.map((item, index) => (
            <CarouselItem
              className="flex w-full flex-col items-center justify-center"
              key={index}
            >
              {item.type === "link" ? (
                <a
                  className="w-full "
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-full rounded-lg"
                    src={`/media/${item.imgSrc}`}
                    alt={item.imgSrc}
                  />
                </a>
              ) : (
                <YouTubeEmbed
                  className="rounded-full"
                  width={340}
                  height={180}
                  url={item.url}
                />
              )}
              <div className="flex w-full flex-col items-end justify-center">
                <div className="my-2 text-base font-normal">{item.title}</div>
                <a
                  href={item.url}
                  className="mb-2 cursor-pointer text-base font-semibold text-blue underline"
                >
                  {item.type === "youtube" ? "למעבר לראיון" : "למעבר לכתבה"}
                </a>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        {Array.from({ length: count }).map((_, index) => (
          <span
            key={index}
            className={`mx-1 inline-block h-2 w-2 cursor-pointer rounded-full ${
              index === current - 1 ? "bg-blue" : "bg-bright-gray"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-20">
        <button className="text-blue" onClick={() => api?.scrollPrev()}>
          <div>הקודם</div>
          <div>&#8594;</div>
        </button>
        <button className="text-blue" onClick={() => api?.scrollNext()}>
          <div>הבא</div>
          <div>&#8592;</div>
        </button>
      </div>
    </section>
  );
};

export default InNews;
