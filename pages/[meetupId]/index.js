import { MongoClient, ObjectId } from "mongodb";
import React, { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        alt={props.meetupData.title}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

//this function is necessary if we use dynamic url with getStaticProps function
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin-shashank:admin123@cluster0.8sqig.mongodb.net/meetupDB",
    {
      useUnifiedTopology: true,
    }
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://admin-shashank:admin123@cluster0.8sqig.mongodb.net/meetupDB",
    { useUnifiedTopology: true }
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetupData = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  return {
    props: {
      meetupData: {
        id: meetupData._id.toString(),
        title: meetupData.title,
        image: meetupData.image,
        address: meetupData.address,
        description: meetupData.description,
      },
    },
  };
}
export default MeetupDetails;
