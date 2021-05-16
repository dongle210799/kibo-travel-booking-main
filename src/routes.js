import React from "react";

const User = React.lazy(() => import("./views/User/user"));
const Location = React.lazy(() => import("./views/Location/index"));
const Patients = React.lazy(() => import("./views/Tour/tour"));
const Bed = React.lazy(() => import("./views/Countries/countries"));
const Nurse = React.lazy(() => import("./views/City/city"));
const Room = React.lazy(() => import("./views/Hotels/Hotels"));

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
    path: "/admin/users/:id",
    exact: true,
    name: "Detail user",
    component: user,
  },
  {
    path: "/admin/rooms/create-room",
    exact: true,
    name: "Create Room",
    component: room,
  },
  {
    path: "/admin/rooms/:id",
    exact: true,
    name: "Detail Room",
    component: room,
  },
  {
    path: "/admin/nurses/create-nurse",
    exact: true,
    name: "Create Nurse",
    component: nurse,
  },
  {
    path: "/admin/nurses/:id",
    exact: true,
    name: "Detail Nurse",
    component: nurse,
  },
  {
    path: "/admin/beds/create-bed",
    exact: true,
    name: "Create Bed",
    component: bed,
  },
  {
    path: "/admin/beds/:id",
    exact: true,
    name: "Detail Bed",
    component: bed,
  },
  {
    path: "/admin/patients/create-patient",
    exact: true,
    name: "Create Patient",
    component: patient,
  },
  {
    path: "/admin/patients/:id",
    exact: true,
    name: "Detail Patient",
    component: patient,
  },
  { path: "/admin/tours", name: "Patients", component: Patients },
  { path: "/admin/Location", name: "Patients", component: Location },
  { path: "/admin/countries", name: "Beds", component: Bed },
  { path: "/admin/city", name: "Nurses", component: Nurse },
  { path: "/admin/hotels", name: "Rooms", component: Room },
];

export default routes;
