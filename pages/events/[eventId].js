import { db } from "utils/firebase/admin";
import { useRouter } from "next/router";
import formatDate from "utils/formatDate";
import Tags from "components/Tags";
const EventPage = ({ eventId, info }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div className={"w-3/4 max-w-4xl mx-auto my-12"}>
      <h1 className={"text-4xl font-semibold text-center"}>{info.eventName}</h1>
      <p className={"text-center text-gray-700 mb-6 text-lg"}>
        {formatDate(new Date(info.startDate))} -{" "}
        {formatDate(new Date(info.endDate))}
      </p>
      <img
        src={info.imageUrl}
        className={"w-full"}
        alt={`${info.eventName} Image`}
      />
      <div className={"text-lg font-medium underline"}>Tags</div>
      {info.tags?.length > 0 && <Tags tags={info.tags} />}

      <div className={"text-xl text-gray-800 mt-6"}>
        <p>{info.description}</p>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const events =
    (await db
      .ref(`events/${params.eventId}`)
      .once("value")
      .then((snapshot) => snapshot.val())) ?? {};
  const { userId, ...info } = events;
  return {
    props: {
      eventId: params.eventId,
      info: info,
    },
    revalidate: 10,
  };
};

export default EventPage;
