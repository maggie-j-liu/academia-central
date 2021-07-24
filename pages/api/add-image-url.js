import { db } from "utils/firebase/admin";
export default handler = async (req, res) => {
  if (req.method !== "POST") {
    res.redirect(303, "/404");
    return;
  }
  const { userId, eventId, imageUrl } = JSON.parse(req.body);
  if (!userId || !eventId || !imageUrl) {
    res.status(400).send("Missing userId, eventId or imageUrl");
    return;
  }
  const eventRef = db.ref(`events/${eventId}`);
  const currentData = await eventRef
    .once("value")
    .then((snapshot) => snapshot.val());
  if (currentData.userId !== userId) {
    console.log(currentData.userId);
    console.log(userId);
    res.status(400).send("wrong user");
    return;
  }
  await eventRef.update({
    imageUrl,
  });
  res.status(200).send("success");
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
