import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
const NewMeetup = () => {
  const router = useRouter();
  const addMeetUpHandler = async (enteredData) => {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    router.push("/");
  };
  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="Add your own meetups!" />
      </Head>
      <NewMeetupForm onAddMeetUp={addMeetUpHandler} />
    </Fragment>
  );
};
export default NewMeetup;
