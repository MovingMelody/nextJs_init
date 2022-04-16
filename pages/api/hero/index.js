/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../db/dbconnect";

import Hero from "../../../models/Hero";

dbConnect();

// this api can be used to get all records, post data
// since we are not dealing with any particular document, we don't need Id
// We need doc id only when we want to perform CRUD operations on single doc
// check [id].js file for more info
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        var heros = await Hero.find({});
        res.status(200).json({ success: true, hero: heros });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        var hero = await Hero.create(req.body);
        res.status(200).json({
          success: true,
          hero: hero,
          status: "data created successfully on db",
        });
      } catch (error) {
        res
          .status(400)
          .json({
            success: false,
            message:
              "Failed to create superhero doc on db, check body and try again",
          });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
