import { useLogoutMutation } from "@/redux/features/auth/authAPi";
import { useAppSelector } from "@/redux/hooks";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const isAUthenticated = useAppSelector((state) => state.auth.accessToken);

  const [logout] = useLogoutMutation();

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-6 justify-end">
        <li>
          <Link to="/" className="text-white hover:text-gray-300 font-medium">
            App
          </Link>
        </li>
        <li>
          <Link
            to="/home"
            className="text-white hover:text-gray-300 font-medium"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/notes"
            className="text-white hover:text-gray-300 font-medium"
          >
            Notes
          </Link>
        </li>
        {!isAUthenticated ? (
          <li>
            <Link
              to="/login"
              className="text-white hover:text-gray-300 font-medium"
            >
              Login
            </Link>
          </li>
        ) : (
          <button
            onClick={async () => {
              return await logout(undefined), navigate("/login");
            }}
            className="text-white font-medium cursor-pointer"
          >
            Logout{" "}
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
