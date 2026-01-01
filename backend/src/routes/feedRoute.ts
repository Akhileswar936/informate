
import express from "express";
import validateToken from "../middlewares/validatetoken";
import expressAsyncHandler from "express-async-handler";
import feedcontroll from "../controllers/feedcontroll";

const feedrouter=express.Router();

/*feedrouter.route('/info').get(expressAsyncHandler(async(req,res)=>{
      const id=req.user.id;
      res.json(id)   ;   
}))*/
feedrouter.use(validateToken);
feedrouter.route('/create').post(feedcontroll.createpost);
feedrouter.route('/feeds').get(feedcontroll.getposts);
feedrouter.route('/feeds/connections').get(feedcontroll.connectionfeeds)
feedrouter.route('/feeds/nonconnections').get(feedcontroll.nonconnectionfeeds)
feedrouter.route('/delete/:id').delete(feedcontroll.deleteposts);
feedrouter.route('/feedback').post(feedcontroll.feeback);
feedrouter.route('/bookmark/add/:id').post(feedcontroll.bookmark);
feedrouter.route('/bookmark').get(feedcontroll.getbookmarks);
feedrouter.route('/bookmark/delete/:id').delete(feedcontroll.deletebookmark);
feedrouter.route('/userfeeds/:id').get(feedcontroll.userfeeds)
export default feedrouter
