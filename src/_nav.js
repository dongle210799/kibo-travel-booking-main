export default {
  items: [
    {
      name: "Dashboard",
      url: "/admin/dashboards",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW",
      },
    },
    // {
    //   title: true,
    //   name: "admin",
    //   wrapper: {
    //     // optional wrapper object
    //     element: "", // required valid HTML5 element tag
    //     attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //   },
    //   class: "", // optional class names space delimited list for title item ex: "text-center"
    // },
    {
      name: "Users",
      url: "/admin/users",
      icon: "icon-user",
    },
    {
      name: "Patients",
      url: "/admin/patients",
      icon: "icon-people",
    },
    {
      name: "Nurses",
      url: "/admin/nurses",
      icon: "icon-people",
    },
    {
      name: "Beds",
      url: "/admin/beds",
      icon: "icon-note",
    },
    {
      name: "Rooms",
      url: "/admin/rooms",
      icon: "icon-list",
    },
    // {
    //   name: "Logout",
    //   url: "/login",
    //   icon: "icon-logout",
    //   variant: "danger",
    //   class: "mt-auto",
    // },
  ],
};
