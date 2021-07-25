import useUser from "utils/firebase/useUser";
import SimpleImageSlider from "react-simple-image-slider";
import Link from "next/link";
import formatDate from "utils/formatDate";
import { db } from "utils/firebase/admin";
import Tags from "components/Tags";

const images = [
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1054&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1598981457915-aea220950616?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1070&q=80",
  },
];

const Home = ({ events }) => {
  return (
    <div>
      <div className="w-3/4 max-w-3xl mx-auto my-8 text-center">
        <h1 className={"text-5xl font-bold mb-2"}>Academia Central</h1>
        <p className={"mb-2"}>The hub for world-changing inspiration.</p>
        <div>
          <SimpleImageSlider
            width={750}
            height={450}
            slideDuration={0.05}
            images={images}
            showNavs={true}
            showBullets={true}
          />
        </div>
      </div>

      <div className={"w-full min-h-screen bg-gray-100 py-8"}>
        <div className={"w-4/5 max-w-7xl mx-auto"}>
          <h1 className={"text-4xl font-semibold text-center mb-6"}>Events</h1>
          <div className={"w-full grid grid-cols-3 gap-8 "}>
            {Object.entries(events)
              .slice(0, 3)
              .map(([key, value]) => (
                <Link key={key} href={`/events/${key}`}>
                  <a
                    className={
                      "bg-white rounded-md py-6 px-4 hover:shadow-xl transition-shadow block"
                    }
                  >
                    <img
                      src={value.imageUrl}
                      className={"rounded-md object-contain"}
                      alt={`${value.eventName} Image`}
                    />
                    <div className={"mt-4"}>
                      <h2 className={"text-xl font-medium"}>
                        {value.eventName}
                      </h2>
                      <p>
                        {formatDate(new Date(value.startDate))} -{" "}
                        {formatDate(new Date(value.endDate))}
                      </p>
                      <p className={"text-gray-700"}>{value.description}</p>
                      {value.tags && (
                        <div>
                          <p className={"font-medium mb-2"}>Tags</p>
                          <Tags tags={value.tags} />
                        </div>
                      )}
                    </div>
                  </a>
                </Link>
              ))}
          </div>
        </div>
        <div className="w-3/4 max-w-3xl mx-auto my-8">
          <div className={"text-xl font-semibold text-center mb-6"}>
            <Link href={"/events"}>
              <a
                className={
                  "bg-white rounded-md py-6 px-4 hover:shadow-xl transition-shadow block"
                }
              >
                Explore more events
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const events =
    (await db
      .ref("events")
      .once("value")
      .then((snapshot) => snapshot.val())) ?? {};
  const filteredEvents = {};
  for (const [key, { userId, ...rest }] of Object.entries(events)) {
    filteredEvents[key] = rest;
  }
  return {
    props: {
      events: filteredEvents,
    },
    revalidate: 10,
  };
}

export default Home;
