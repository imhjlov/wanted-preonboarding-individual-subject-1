import bcrypt from "bcryptjs";

export const hashSync = (pw) => bcrypt.hashSync(pw, 8);
export const compareSync = (pw, hash) => bcrypt.compareSync(pw, hash);
