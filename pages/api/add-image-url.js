import { db, auth } from "utils/firebase/admin";
const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.redirect(303, "/404");
    return;
  }
  const { idToken, eventId, imageUrl } = JSON.parse(req.body);
  if (!idToken || !eventId || !imageUrl) {
    res.status(400).send("Missing idToken, eventId or imageUrl");
    return;
  }
  const decodedToken = await auth.verifyIdToken(idToken).catch((error) => {
    res.status(400).send("error verifying token");
  });
  const userId = decodedToken.uid;
  const eventRef = db.ref(`events/${eventId}`);
  const currentData = await eventRef
    .once("value")
    .then((snapshot) => snapshot.val());
  if (currentData.userId !== userId) {
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

export default handler;
