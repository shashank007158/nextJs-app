import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="Browse a list of places for meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin-shashank:admin123@cluster0.8sqig.mongodb.net/meetupDB"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 60,
  };
}
export default HomePage;
