import Link from "next/link";
const NotSignedIn = () => {
  return (
    <div className={"mt-10 w-full flex justify-center items-center"}>
      <h1 className={"font-semibold text-4xl"}>
        You're not signed in!{" "}
        <Link href="/sign-in">
          <a className={"text-primary-600 hover:text-primary-500 underline"}>
            Sign in
          </a>
        </Link>{" "}
        to access this page.
      </h1>
    </div>
  );
};

export default NotSignedIn;
