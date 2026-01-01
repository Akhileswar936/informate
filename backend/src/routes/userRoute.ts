
import { Router } from "express";
import multer from "multer";
const router=Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
import usercontroll from '../controllers/usercontroll';
import validatetoken from '../middlewares/validatetoken';

router.route("/register").post(usercontroll.registeruser);
router.route("/login").post(usercontroll.loginuser);
router.route('/userinfo').get(validatetoken, usercontroll.userinfo);
router.route("/forgot").post(usercontroll.forgetpassword);
router.route('/set').post(usercontroll.setpassword);
router.route('/update').post(validatetoken, upload.single('image'), usercontroll.updateprofile);
router.route('/connectsusers').get(validatetoken,usercontroll.connentsUsers)
router.route('/connects/request/:id').post(validatetoken,usercontroll.requestSent)
router.route('/connects/requestdisplay').get(validatetoken,usercontroll.requestsdisplay)
router.route('/connects/requestaccept/:id').post(validatetoken,usercontroll.requestaccept)
router.route('/connects/requestreject/:id').post(validatetoken,usercontroll.requestreject)
router.route('/connect/connections').get(validatetoken,usercontroll.connectionsDisplay)
router.route('/connection/del/:id').delete(validatetoken,usercontroll.deleteconnection);
export default router;
