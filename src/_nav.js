export default {
  items: [
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
      // badge: {
      //   variant: "info",
      //   text: "NEW",
      // },
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
      name: "Countries",
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
