type NavItem = {
  name: string;
  link: string;
};

type NavData = NavItem[];

export const navData: NavData = [
  {
    name: "Community",
    link: "/",
  },
  {
    name: "Tutorial",
    link: "/builds/create",
  },
  {
    name: "Builds",
    link: "/builds",
  },
  {
    name: "Example",
    link: "/example",
  },
];

export const cornerNavData: NavData = [
  {
    name: "Create Build",
    link: "/builds/create",
  },

  {
    name: "Register",
    link: "/signup",
  },

  {
    name: "Login",
    link: "/login",
  },
];
