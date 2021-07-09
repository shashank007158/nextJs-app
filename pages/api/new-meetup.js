// /api/new-meetup
import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://admin-shashank:admin123@cluster0.8sqig.mongodb.net/meetupDB",
      { useUnifiedTopology: true }
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    client.close();

    res.status(201).json({ message: "MeetUp inserted!" });
  }
}
export default handler;
