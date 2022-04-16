/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../db/dbconnect";

import Hero from "../../../models/Hero";

dbConnect();

// get unique record, edit, delete with [ID]

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const hero = await Hero.findById(id);
        if (hero === undefined || !hero) {
          res.status(400).json({
            success: false,
            message: "No hero doc founc with given id",
          });
        }
        res.status(200).json({ success: true, hero: hero });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "No hero doc founc with given id" });
      }
      break;
    case "PUT":
      try {
        const hero = await Hero.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (hero === undefined || !hero) {
          res.status(400).json({
            success: false,
            message: "something went wrong while updating hero",
          });
        }
        res.status(200).json({ success: true, hero: hero });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error,
          message: "something went wrong while updating hero",
        });
      }
      break;
    case "DELETE":
      try {
        const hero = await Hero.deleteOne({ _id: id });
        if (!hero) {
          res.status(400).json({
            success: false,
            message: "something went wrong while deleting hero",
          });
        }
        res.status(200).json({
          success: true,
          hero: hero,
          message: "Hero doc successfully removed from db",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error,
          message: "something went wrong while deleting hero",
        });
      }
      break;

    default:
      break;
  }
};
