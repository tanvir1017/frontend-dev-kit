import { Gender, UserRole } from "@prisma/client";
import env from "../../config/clean-env";
import { hashPwd } from "./encryption";
import prisma from "./prisma.utils";

const superAdminInfo = {
  firstName: "Tanvir",
  lastName: "Hossain",
  email: env.ADMIN_EMAIL,
  password: env.ADMIN_PASSWORD,
  role: UserRole.SUPER_ADMIN, // SUPER_ADMIN
  gender: Gender.MAN,
  isVerified: true,
};

const seedSuperAdmin = async () => {
  // when database is connected, we will check who is super admin
  const admin = await prisma.user.findFirst({
    where: {
      email: env.ADMIN_EMAIL,
      role: UserRole.SUPER_ADMIN, // SUPER_ADMIN
    },
  });
  if (!admin) {
    console.log(
      "🔍 No super admin found, Creating a new super admin by seeding new one..",
    );
    const adminObjReplica = { ...superAdminInfo };

    let { password, ...rest } = adminObjReplica;
    password = await hashPwd(password); // hashing password
    await prisma.user.create({
      data: {
        ...rest,
        password,
      },
    });
  }
};

export default seedSuperAdmin;
