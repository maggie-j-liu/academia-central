import { db } from "utils/firebase/admin";
import Link from "next/link";
import formatDate from "utils/formatDate";
import Tags from "components/Tags";

const Events = ({ events }) => {
  return (
    <div className={"w-full min-h-screen bg-gray-100 py-8"}>
      <div className={"w-4/5 max-w-7xl mx-auto"}>
        <h1 className={"text-4xl font-semibold text-center mb-6"}>Events</h1>
        <div className={"w-full grid grid-cols-3 gap-8 "}>
          {Object.entries(events).map(([key, value]) => (
            <Link key={key} href={`/events/${key}`}>
              <a
                className={
                  "bg-white rounded-md py-6 px-4 hover:shadow-xl transition-shadow block space-y-4"
                }
              >
                <img
                  src={value.imageUrl}
                  className={"rounded-md object-contain"}
                  alt={`${value.eventName} Image`}
                />
                <div>
                  <h2 className={"text-xl font-semibold"}>{value.eventName}</h2>
                  <p>
                    {formatDate(new Date(value.startDate))} -{" "}
                    {formatDate(new Date(value.endDate))}
                  </p>
                  <p className={"text-gray-700 line-clamp-5"}>
                    {value.description}
                  </p>
                </div>
                {value.tags && (
                  <div>
                    <p className={"font-medium mb-2"}>Tags</p>
                    <Tags tags={value.tags} />
                  </div>
                )}
              </a>
            </Link>
          ))}
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

export default Events;
