import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import Baseurl from "@/API/BaseUrl";
import { useEffect, useState } from "react";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to determine if the user is logged in
  const [userName, setUserName] = useState(""); // State to store the user's name

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise

    if (token) {
      // Fetch user profile data
      fetch(`${Baseurl}backend/auth/get-profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.status.code === 200) {
            setUserName(data.data.nama); // Set the user's name
            console.log(data.data.nama, "Nama nih"); // Set the user's name
          }
        })
        .catch(error => {
          console.error("Error fetching user profile data:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage on logout
    window.location.reload();
  };


  return (
    <Navbar color={fixedNavbar ? "white" : "transparent"} className={`rounded-xl transition-all ${fixedNavbar ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5" : "px-0 py-1"}`} fullWidth blurred={fixedNavbar} >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Typography variant="h6" color="blue-gray">
            {isLoggedIn ? `Halo Admin ${userName} 🙎‍♂️!` : "Dashboard"}
          </Typography>
        </div>
        <div className="flex items-center">
          <IconButton variant="text" color="blue-gray" className="grid xl:hidden" onClick={() => setOpenSidenav(dispatch, !openSidenav)} >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          {/* Show "Sign In" button if not logged in */}
          {!isLoggedIn && (
            <Link to="/auth/sign-in" className="hidden xl:flex">
              <Button variant="text" color="blue-gray" className="items-center gap-1 px-4 normal-case">
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" /> Sign In
              </Button>
            </Link>
          )}
          {/* Show "Logout" button if logged in */}
          {isLoggedIn && (
            <Button
              as={Link} // Use Link from react-router-dom
              to="/auth/sign-in"
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex normal-case"
              onClick={handleLogout}
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" /> Logout
            </Button>
          )}
          {/* <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar src="https://example.com/avatar.jpg" alt="avatar" size="sm" variant="circular" />
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-normal">New message from Laur</Typography>
                  <Typography variant="small" color="blue-gray" className="flex items-center gap-1 text-xs font-normal opacity-60">Just now</Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu> */}
          {/* <IconButton variant="text" color="blue-gray" onClick={() => setOpenConfigurator(dispatch, true)} >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton> */}
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
