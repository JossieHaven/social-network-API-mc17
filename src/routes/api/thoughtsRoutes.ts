import { Router } from "express";
const router = Router();

import {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} from "../../controllers/thoughtsController.js";


 // Route: /api/thoughts
 // - GET: Retrieve all thoughts
 // - POST: Create a new thought (also adds the thought to the associated user's thoughts array)
 
router.route("/").get(getAllThoughts).post(createThought);


 // Route: /api/thoughts/:thoughtId
 // - GET: Retrieve a single thought by its ID
 // - PUT: Update a thought by its ID
 // - DELETE: Remove a thought by its ID

router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);


 // Route: /api/thoughts/:thoughtId/reactions
 // - POST: Add a reaction to a thought's reactions array
 
router.route("/:thoughtId/reactions").post(addReaction);


 // Route: /api/thoughts/:thoughtId/reactions/:reactionId
 // - DELETE: Remove a reaction by its reaction ID

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

export default router;
