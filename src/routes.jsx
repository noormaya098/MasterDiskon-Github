import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon,
  UserIcon,
  RocketLaunchIcon,
  HomeModernIcon,
  TicketIcon,
  FolderIcon,
  FlagIcon,
  MapIcon,
  MapPinIcon,
  PresentationChartBarIcon,
  UsersIcon,
  UserPlusIcon,
  WalletIcon,
  BanknotesIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  PresentationChartLineIcon,
  BuildingStorefrontIcon,
  UserMinusIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  BuildingLibraryIcon,
  ReceiptPercentIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Produk from "./pages/produk/produk";
import Airport from "./pages/Airport";
import Station from "./pages/Station";
import Hotel from "./pages/hotel/Hotel";
import Region from "./pages/Region";
import Area from "./pages/Area";
import City from "./pages/City";
import UserAdmin from "./pages/master/UserAdmin";
import Customer from "./pages/customer/Customer";
import UserCorporate from "./pages/user_corporate/UserCorporate";
import Plafon from "./pages/plafon/Plafon";
import Vendor from "./pages/vendor/Vendor";
import Order from "./pages/order/Order";
import DetailOrder from "./pages/order/DetailOrder";
import OrderProduct from "./pages/order/OrderProduct";
import Invoice from "./pages/order/Invoice";
import Sales from "./pages/report/sales";
import Customers from "./pages/report/Customers";
import ReportVendor from "./pages/report/ReportVendor";
import Ledearboard from "./pages/report/Ledearboard";
import Bantuan from "./pages/content/Bantuan";
import Promo from "./pages/promo/Promo";
import Coupon from "./pages/coupon/Coupon";
import Blog from "./pages/blog/Blog";
import KategoriBlog from "./pages/blog/KategoriBlog";
import CreatorBlog from "./pages/blog/CreatorBlog";



const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "Main",
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    title: "Admin",
    layout: "dashboard",
    pages: [
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "order product",
        path: "/orderProduct",
        element: <OrderProduct />,
      },
      {
        icon: <BanknotesIcon {...icon} />,
        name: "invoice",
        path: "/invoice",
        element: <Invoice />,
      },
     
    ],
  },
  {
    title: "Report",
    layout: "dashboard",
    pages: [
      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "per order",
        path: "/report/order",
        element: <Order />,
      },
      {
        icon: <PresentationChartLineIcon {...icon} />,
        name: "per sales",
        path: "/report/sales",
        element: <Sales />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "per customer",
        path: "/report/customers",
        element: <Customers />,
      },
      {
        icon: <BuildingOfficeIcon {...icon} />,
        name: "per vendor",
        path: "/report/vendor",
        element: <ReportVendor />,
      },
      {
        icon: <BuildingOfficeIcon {...icon} />,
        name: "per ledearboard",
        path: "/report/ledearboard",
        element: <Ledearboard />,
      },
      
    ],
  },
  {
    title: "Master",
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "user admin",
        path: "/admin",
        element: <UserAdmin />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "customer",
        path: "/customer",
        element: <Customer />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "user corporate",
        path: "/user/corporate",
        element: <UserCorporate />,
      },
      {
        icon: <RocketLaunchIcon {...icon} />,
        name: "airport",
        path: "/airport",
        element: <Airport />,
      },
      {
        icon: <BuildingLibraryIcon {...icon} />,
        name: "hotel",
        path: "/hotel",
        element: <Hotel />,
      },
      {
        icon: <PresentationChartBarIcon {...icon} />,
        name: "plafon",
        path: "/plafon",
        element: <Plafon />,
      },
      {
        icon: <BuildingOffice2Icon {...icon} />,
        name: "vendor",
        path: "/vendor",
        element: <Vendor />,
      },
      {
        icon: <FolderIcon {...icon} />,
        name: "produk",
        path: "/produk",
        element: <Produk />,
      },
      
      {
        icon: <TicketIcon {...icon} />,
        name: "station",
        path: "/station",
        element: <Station />,
      },
    
    ]
  },
  {
    title: "Content",
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "bantuan",
        path: "/bantuan",
        element: <Bantuan />,
      },
      {
        icon: <NewspaperIcon {...icon} />,
        name: "blog",
        path: "/blog",
        element: <Blog />,
      },
      {
        icon: <NewspaperIcon {...icon} />,
        name: "blog kategori",
        path: "/blog-kategori",
        element: <KategoriBlog />,
      },
      {
        icon: <NewspaperIcon {...icon} />,
        name: "blog creator",
        path: "/blog-creator",
        element: <CreatorBlog />,
      },
      {
        icon: <ReceiptPercentIcon {...icon} />,
        name: "promo",
        path: "/promo",
        element: <Promo />,
      },
      {
        icon: <TicketIcon {...icon} />,
        name: "coupon",
        path: "/coupon",
        element: <Coupon />,
      },
     
    ]
  },
  {
    title: "Data Wilayah",
    layout: "dashboard",
    pages: [
      {
        icon: <FlagIcon {...icon} />,
        name: "region",
        path: "/region",
        element: <Region />,
      },
      {
        icon: <MapIcon {...icon} />,
        name: "area",
        path: "/area",
        element: <Area />,
      },
      {
        icon: <MapPinIcon {...icon} />,
        name: "city",
        path: "/city",
        element: <City />,
      },
    ]
  },
  
  // {
  //   title: "report pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
