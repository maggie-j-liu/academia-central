import { db } from "utils/firebase/admin";
import Link from "next/link";

const formatDate = (date) => {
  const dateToString = date.toString();
  const splitted = dateToString.split(" ");
  return `${splitted[1]} ${splitted[2]}, ${splitted[3]}`;
};

const Events = ({ events }) => {
  return (
    <div className={"w-full bg-gray-100 py-8"}>
      <div className={"w-4/5 max-w-7xl mx-auto"}>
        <h1 className={"text-4xl font-semibold text-center mb-6"}>Events</h1>
        <div className={"w-full grid grid-cols-3 gap-8 "}>
          {Object.entries(events).map(([key, value]) => (
            <Link key={key} href={`/${key}`}>
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
                  <h2 className={"text-xl font-medium"}>{value.eventName}</h2>
                  <p>
                    {formatDate(new Date(value.startDate))} -{" "}
                    {formatDate(new Date(value.endDate))}
                  </p>
                  <p className={"text-gray-700"}>{value.description}</p>
                </div>
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
