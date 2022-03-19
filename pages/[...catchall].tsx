// catch-all route that redirects users to home page when they've visited a route that does not exist

import { GetServerSideProps } from "next";

export default function CatchAllRoute() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {}, redirect: { destination: "/" } };
};
