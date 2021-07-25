import useUser from "utils/firebase/useUser";
import Link from "next/link";
const Navbar = () => {
  const { user, logout } = useUser();
  return (
    <nav
      className={
        "h-14 shadow-sm sticky w-full flex items-center justify-between px-16"
      }
    >
      <Link href="/">
        <a className={"text-primary-800 font-bold"}>Academia Central</a>
      </Link>

      <Link href="/events">
        <a>Events</a>
      </Link>
      <Link href="/add-event">
        <a>Add an event</a>
      </Link>
      {user !== null && (
        <div className={"flex gap-8 items-center"}>
          <Link href="/profile">
            <a>{user.displayName}</a>
          </Link>
        </div>
      )}
      <div className={"flex gap-8 items-center"}>
        <div>
          {user !== null ? (
            <button
              onClick={() => logout()}
              className={"rounded-md px-1 py-0.5"}
            >
              Sign Out
            </button>
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
