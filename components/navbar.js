import useUser from "utils/firebase/useUser";
import Link from "next/link";
const Navbar = () => {
  const { user, logout } = useUser();
  return (
    <nav
      className={
        "h-14 shadow-sm sticky w-full flex items-center justify-between"
      }
    >
      <div>Name of Project</div>
      <div className={"flex gap-8"}>
        <div>{user !== null && user.displayName}</div>
        <div>
          {user !== null ? (
            <button onClick={() => logout()}>Sign Out</button>
          ) : (
            <Link href="/sign-in">
              <a>Sign In</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
