import useUser from "utils/firebase/useUser";
import SimpleImageSlider from "react-simple-image-slider";
import Link from "next/link";
import formatDate from "utils/formatDate";
import { db } from "utils/firebase/admin";
import Tags from "components/Tags";

const images = [
  {
    url: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__340.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-163518__480.jpg",
  },
  {
    url: "https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg",
  },
  { url: "https://i.ytimg.com/vi/p7TDpx0hsn4/maxresdefault.jpg" },
  {
    url: "https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-taj-mahal.jpg",
  },
  {
    url: "http://www.lovethispic.com/uploaded_images/136562-Beautiful-Butterfly.jpg",
  },
  {
    url: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Free-Best-nd-Beautiful-Images.jpg",
  },
];

const Home = ({ events }) => {
  return (
    <nav>
      <div className="w-3/4 max-w-3xl mx-auto my-8 text-center">
        <div>Our hacktable project :)</div>
        <div>
          <SimpleImageSlider
            width={896}
            height={504}
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
    </nav>
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
