import { db, auth } from "utils/firebase/admin";
const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.redirect(303, "/404");
    return;
  }
  const body = JSON.parse(req.body);
  if (!body.idToken) {
    res.status(400).send("Missing idToken");
    return;
  }
  const decodedToken = await auth.verifyIdToken(body.idToken).catch((error) => {
    console.log(error);
    res.status(400).send("error verifying token");
  });
  const userId = decodedToken.uid;
  if (
    !["eventName", "description", "startDate", "endDate", "location"].every(
      (val) => Object.keys(body).includes(val) && body[val] !== ""
    )
  ) {
    res.status(400).send("Missing an argument");
    return;
  }
  const newRef = await db.ref("events").push({
    eventName: body.eventName,
    description: body.description,
    tags: body.tags,
    startDate: body.startDate,
    endDate: body.endDate,
    location: body.location,
    websiteUrl: body.websiteurl ?? null,
    userId,
  });
  res.status(200).send(newRef.key);
};

export default handler;
