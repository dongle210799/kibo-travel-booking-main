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
      name: "Tours",
      url: "/admin/tours",
      icon: "icon-people",
    },
    {
      name: "Location",
      url: "/admin/location",
      icon: "icon-map",
    },
    {
      name: "Cities",
      url: "/admin/city",
      icon: "icon-people",
    },
    {
      name: "Countries",
      url: "/admin/countries",
      icon: "icon-note",
    },
    {
      name: "Hotels",
      url: "/admin/hotels",
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
