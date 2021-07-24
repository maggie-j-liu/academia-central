import FirebaseAuth from "components/auth";
import Link from "next/link";

const Auth = () => {
  return (
    <div>
      <div>
        <FirebaseAuth />
        <p>
          <Link href="/">
            <a>Go Home</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
