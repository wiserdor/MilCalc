const Member = ({
  name,
  title,
  img,
  linkedin
}: {
  name: string;
  title: string;
  img: string;
  linkedin?: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <img className="w-2/3 rounded-full" src={`/team/${img}`} alt={name} />
      <h3 className="font-bold">{name}</h3>
      <p className="font-normal text-dark-gray">{title}</p>
      <a
        href={linkedin}
        className="cursor-pointer"
        target="_blank"
        rel="noreferrer"
      >
        <img className="mt-2" src="/svg/linkedin.svg" alt="linkedin" />
      </a>
    </div>
  );
};

const Team = () => {
  return (
    <section className="flex flex-col items-center justify-center bg-ocean px-4 py-10">
      <h3 className="mb-8 text-center text-lg font-semibold leading-tight">
        הצוות
      </h3>
      <div className="grid grid-rows-2 gap-7">
        <div className="grid grid-cols-2 gap-1">
          <Member
            img="slook.png"
            name="יונתן סלוק"
            title="ניהול מוצר"
            linkedin="https://www.linkedin.com/in/yonatan-slook-172b0383/"
          />
          <Member
            img="alon.png"
            name="אלון פנחס"
            title="פיתוח עסקי"
            linkedin="https://www.linkedin.com/in/alon-pinhas-589a97172/"
          />
        </div>
        <div className="grid grid-cols-2 gap-1">
          <Member
            img="dor.png"
            name="דור ויזר"
            title="פיתוח תוכנה"
            linkedin="https://www.linkedin.com/in/dor-wiser/"
          />
          <Member
            img="yarden.png"
            name="ירדן גבעוני"
            title="עיצוב UX/UI"
            linkedin="https://www.linkedin.com/in/yarden-givoni-854046192/"
          />
        </div>
      </div>
    </section>
  );
};

export default Team;
