import express, { Router } from "express";
import filesRoute from "./routes/filesRoute.js";
import fireStoreDbRoute from "./routes/fireStoreDbRoute.js";


const router: Router = express();

router.use("/files", filesRoute);
router.use("/firestore", fireStoreDbRoute);

export default router;
