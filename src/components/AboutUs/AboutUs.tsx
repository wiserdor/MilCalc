import Team from "./Team";
import InNews from "./InNews";

const AboutUs = () => {
  return (
    <section className="bg-ocean py-4">
      <h2 className="mb-8 text-center text-[22px] font-bold">קצת עלינו</h2>
      <InNews />
      <Team />
    </section>
  );
};

export default AboutUs;
