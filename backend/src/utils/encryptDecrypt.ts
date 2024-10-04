import bcryptjs from "bcryptjs";
const encryptPassword = (password: string) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};
const comparePassword = (password: string, hash: string) => {
  return bcryptjs.compareSync(password, hash);
};
export { encryptPassword, comparePassword };
