import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import { multerUpload } from "../../../middleware/multer";
import { parseBodyDataInUpdatableRoutes } from "../../../middleware/parse-bodyData";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { userControllers } from "../controller/user.controller";
import { UserSchemaValidation } from "../validation/user.validation";

const router = Router();

//  Retrieve all the user from db
router
  .route("/")
  .get(authGuard("SUPER_ADMIN", "ADMIN"), userControllers.getAllUsers);

// get user by email
router
  .route("/:emailId/email")
  .get(authGuard("SUPER_ADMIN", "ADMIN"), userControllers.getSingleUserByMail);

// Create a user
router
  .route("/create")
  .post(
    sanitizeClientDataViaZod(UserSchemaValidation.createUserValidationSchema),
    userControllers.createUser,
  );

//  Update User
router.route("/update").patch(
  multerUpload("users").single("file"),

  // ? will parse the for data into Json
  parseBodyDataInUpdatableRoutes(),

  // ? data validation via zod
  sanitizeClientDataViaZod(UserSchemaValidation.updateUserValidationSchema),
  userControllers.updateUser,
);

//  Delete User
router
  .route("/:id/delete")
  .delete(authGuard("SUPER_ADMIN", "ADMIN"), userControllers.deleteUser);

//  Delete User
router.route("/change-role").patch(
  authGuard("SUPER_ADMIN", "ADMIN"),
  // ? client data validation or sanitization 👌
  sanitizeClientDataViaZod(UserSchemaValidation.updateRoleValidationSchema),
  userControllers.changeRole,
);

//////////////////////////////////// Dynamic Routes ///////////////////////////////////////

// get user by id
router
  .route("/:id")
  .get(authGuard("SUPER_ADMIN", "ADMIN"), userControllers.getSingleUser);

export const userRoutes = router;
