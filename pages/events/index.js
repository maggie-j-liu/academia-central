import { db } from "utils/firebase/admin";
import Link from "next/link";
import formatDate from "utils/formatDate";
import Tags from "components/Tags";
import { useState } from "react";

const Events = ({ events }) => {
  const [searchTags, setSearchTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const sortedEventsKeys = Object.keys(events).sort((a, b) => {
    const firstStartDate = Date.parse(events[a].startDate);
    const secondStartDate = Date.parse(events[b].startDate);
    if (firstStartDate !== secondStartDate) {
      return secondStartDate - firstStartDate;
    }
    const firstEndDate = Date.parse(events[a].endDate);
    const secondEndDate = Date.parse(events[b].endDate);
    return secondEndDate - firstEndDate;
  });
  const [eventsToShow, setEventsToShow] = useState(sortedEventsKeys);
  const calcEventsToShow = (tags) => {
    console.log(tags);
    if (tags.length === 0) {
      setEventsToShow(sortedEventsKeys);
      return;
    }
    setEventsToShow(
      sortedEventsKeys.filter((key) => {
        const intersection = tags.filter((val) =>
          events[key].tags?.includes(val)
        );
        return intersection.length > 0;
      })
    );
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentTag.length > 0) {
      e.preventDefault();
      const newSearchTags = [...searchTags, currentTag];
      setSearchTags(newSearchTags);
      setCurrentTag("");
      calcEventsToShow(newSearchTags);
    }
  };
  const removeTag = (idx) => {
    const tags = searchTags;
    tags.splice(idx, 1);
    setSearchTags([...tags]);
    calcEventsToShow(tags);
  };

  return (
    <div className={"w-full min-h-screen bg-gray-100 py-8"}>
      <div className={"w-4/5 max-w-7xl mx-auto"}>
        <h1 className={"text-4xl font-semibold text-center mb-6"}>Events</h1>
        <input
          type="text"
          className={"form-input input-box w-full mb-2"}
          placeholder={"Hit enter to search for tags"}
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className={"mb-8"}>
          {" "}
          <Tags tags={searchTags} removeable onRemove={removeTag} />
        </div>

        <div className={"w-full grid grid-cols-3 gap-8"}>
          {eventsToShow.map((key) => (
            <Link key={key} href={`/events/${key}`}>
              <a
                className={
                  "bg-white rounded-md py-6 px-4 hover:shadow-xl transition-shadow block space-y-4"
                }
              >
                <img
                  src={events[key].imageUrl}
                  className={"rounded-md object-contain"}
                  alt={`${events[key].eventName} Image`}
                />
                <div>
                  <h2 className={"text-xl font-semibold"}>
                    {events[key].eventName}
                  </h2>
                  <p>
                    {formatDate(new Date(events[key].startDate))} -{" "}
                    {formatDate(new Date(events[key].endDate))}
                  </p>
                  <p className={"text-gray-700 line-clamp-5"}>
                    {events[key].description}
                  </p>
                </div>
                {events[key].tags && (
                  <div>
                    <p className={"font-medium mb-2"}>Tags</p>
                    <Tags tags={events[key].tags} />
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
