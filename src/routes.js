import React from "react";

const User = React.lazy(() => import("./views/User/user"));
const Location = React.lazy(() => import("./views/Location/index"));
const Patients = React.lazy(() => import("./views/Tour/tour"));
const Bed = React.lazy(() => import("./views/Countries/countries"));
const Nurse = React.lazy(() => import("./views/City/city"));
const Room = React.lazy(() => import("./views/Hotels/Hotels"));
const Booking = React.lazy(() => import("./views/Booking/booking"));
const user = React.lazy(() => import("./components/User/addUser/user"));
const room = React.lazy(() => import("./components/Hotel/addHotel/hotels"));
const nurse = React.lazy(() => import("./components/city/addCity/index"));
const bed = React.lazy(() =>
  import("./components/Countries/addCountries/Countries")
);
const patient = React.lazy(() => import("./components/tour/addTour/tour"));

const routes = [
  { path: "/admin", exact: true, name: "Home" },
  { path: "/admin/users", exact: true, name: "Users", component: User },
  {
    path: "/admin/users/create-user",
    exact: true,
    name: "Create user",
    component: user,
  },
  {
    path: "/admin/bookings",
    exact: true,
    name: "Bookings",
    component: Booking,
  },

  {
    path: "/admin/users/:id",
    exact: true,
    name: "Detail user",
    component: user,
  },
  {
    path: "/admin/hotels/create-hotel",
    exact: true,
    name: "Create Hotels",
    component: room,
  },
  {
    path: "/admin/rooms/:id",
    exact: true,
    name: "Detail Room",
    component: room,
  },
  {
    path: "/admin/cities/create-city",
    exact: true,
    name: "Create City",
    component: nurse,
  },
  {
    path: "/admin/nurses/:id",
    exact: true,
    name: "Detail Nurse",
    component: nurse,
  },
  {
    path: "/admin/countries/create-country",
    exact: true,
    name: "Create Country",
    component: bed,
  },
  {
    path: "/admin/beds/:id",
    exact: true,
    name: "Detail Bed",
    component: bed,
  },
  {
    path: "/admin/tours/create-tour",
    exact: true,
    name: "Create Tour",
    component: patient,
  },
  {
    path: "/admin/patients/:id",
    exact: true,
    name: "Detail Patient",
    component: patient,
  },
  { path: "/admin/tours", name: "Tours", component: Patients },
  { path: "/admin/Location", name: "location", component: Location },
  { path: "/admin/countries", name: "countries", component: Bed },
  { path: "/admin/city", name: "Cities", component: Nurse },
  { path: "/admin/hotels", name: "Hotels", component: Room },
];

export default routes;
