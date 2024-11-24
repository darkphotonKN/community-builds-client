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
    name: "Create",
    link: "/builds/create",
  },
  {
    name: "Builds",
    link: "/builds",
  },
  {
    name: "Login",
    link: "/login",
  },
  {
    name: "Signup",
    link: "/signup",
  },
];
