import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from "@/shadcn/ui/carousel";
import clsx from "clsx";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import React from "react";
import { InstagramEmbed } from "react-social-media-embed";

const data: Array<{ url: string; title: string }> = [
  {
    title: "חישוב מענקים מוגדלים",
    url: "https://www.instagram.com/reel/C3kVCOjtERe/"
  },
  {
    title: "עצמאים",
    url: "https://www.instagram.com/reel/C16a9QCin8R/"
  },
  {
    title: "העדכון האחרון לבעלי משפחות",
    url: "https://www.instagram.com/reel/C15BpTxis7b/"
  },
  {
    title: "מענקי חרבות הברזל העדכון האחרון-אוכלוסיה כללית",
    url: "https://www.instagram.com/reel/C14siK1Co8u/"
  },
  {
    title: "מענק התמדה ומענק תעסוקה (המענקים של אחרי צו 8)",
    url: "https://www.instagram.com/reel/C12cEPTNTvC/"
  },
  {
    title: "הגשות לקרן הסיוע",
    url: "https://www.instagram.com/reel/CzrDmAbN8ae/"
  }
];

const LinoyCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [pointerEventsNone, setPointerEventsNone] = React.useState(false);

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
    <div className="w-full">
      <Carousel
        opts={{
          loop: true
        }}
        dir="ltr"
        setApi={setApi}
        plugins={[
          WheelGesturesPlugin()
          // Autoplay({ delay: 5000, stopOnMouseEnter: true })
        ]}
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem
              className="flex- flex flex-col items-center justify-center"
              key={item.title + index}
            >
              <div className="mb-4 w-2/3 text-base font-normal text-blue">
                {item.title}
              </div>
              <InstagramEmbed
                className={clsx(pointerEventsNone && "pointer-events-none")}
                url={item.url}
                onTouchMove={() => setPointerEventsNone(true)}
                onTouchEnd={() => setPointerEventsNone(false)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
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
    </div>
  );
};

export default LinoyCarousel;
