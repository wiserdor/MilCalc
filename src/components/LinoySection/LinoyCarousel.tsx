import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from "@/shadcn/ui/carousel";
import React from "react";
import { InstagramEmbed } from "react-social-media-embed";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Autoplay from "embla-carousel-autoplay";

const data: Array<{ url: string; title: string }> = [
  {
    title: "חישוב מענקים מוגדלים",
    url: "https://www.instagram.com/reel/C3kVCOjtERe/"
  },
  {
    title: "חישוב מענקי משפחה",
    url: "https://www.instagram.com/reel/C15BpTxis7b/"
  }
];

const LinoyCarousel = () => {
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
    <div className="w-full">
      <Carousel
        opts={{
          loop: true
        }}
        setApi={setApi}
        plugins={[WheelGesturesPlugin(), Autoplay({ delay: 5000 })]}
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem
              className="flex w-full flex-col items-center justify-center"
              key={item.title + index}
            >
              <div className="mb-4 text-base font-normal text-blue">
                {item.title}
              </div>
              <InstagramEmbed url={item.url} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        {Array.from({ length: count }).map((_, index) => (
          <span
            key={index}
            className={`mx-1 inline-block h-2 w-2 rounded-full ${
              index === current - 1 ? "bg-blue" : "bg-bright-gray"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LinoyCarousel;
