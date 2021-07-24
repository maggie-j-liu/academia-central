import FirebaseAuth from "components/auth";

const Auth = () => {
  return (
    <div>
      <div>
        <FirebaseAuth />
        <p>
          <a href="/">Go Home</a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
