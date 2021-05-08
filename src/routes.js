import React from "react";

const User = React.lazy(() => import("./views/User/user"));
const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const Patients = React.lazy(() => import("./views/Patients/patients"));
const Bed = React.lazy(() => import("./views/Bed/bed"));
const Nurse = React.lazy(() => import("./views/Nurse/nurse"));
const Room = React.lazy(() => import("./views/Room/room"));

const user = React.lazy(() => import("./components/User/addUser/user"));
const room = React.lazy(() => import("./components/Room/addRoom/room"));
const nurse = React.lazy(() => import("./components/Nurse/addNurse/nurse"));
const bed = React.lazy(() => import("./components/Bed/addBed/bed"));
const patient = React.lazy(() =>
  import("./components/Patient/addPatient/patient")
);

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

  { path: "/admin/dashboards", name: "Dashboards", component: Dashboard },
  { path: "/admin/patients", name: "Patients", component: Patients },
  { path: "/admin/beds", name: "Beds", component: Bed },
  { path: "/admin/nurses", name: "Nurses", component: Nurse },
  { path: "/admin/rooms", name: "Rooms", component: Room },
];

export default routes;
