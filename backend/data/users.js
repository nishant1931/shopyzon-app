import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin",
    email: "admin@123.com",
    password: bcrypt.hashSync("admin99", 10),
    isAdmin: true,
  },
  {
    name: "Ram",
    email: "ram@123.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Nishant",
    email: "nishant@123.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
