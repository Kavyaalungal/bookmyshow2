import { Router } from "express";
// import multer from "multer";
import * as rh from "./requesthandlers.js"
import auth from "./middleware/auth.js";

// import path from "path";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     },
// });



// const upload = multer({ storage: storage });
 

const router = Router()

router.route("/register1").post(rh.register1);
router.route("/login").post(rh.login);
router.route("/upload").post(rh.uploadFile);
router.route("/get-file").get(rh.getfile);

// router.route("/upload").post(upload.single("file"),rh.uploadFilm)


// router.route("/movies").get(rh.getMovies)











export default router;