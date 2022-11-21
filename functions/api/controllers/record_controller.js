const recordsModel = require("../models/records_model");
const express = require("express");
const router = express.Router();

// Get all records
router.get("/", async (req, res, next) => { 
  try {
    //console.log(req.headers.authentication);
    const result = await recordsModel.get();
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

// Get one record
router.get("/:id", async (req, res, next) => {
  try {
    const result = await recordsModel.getById(req.params.id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

// Create a new record
router.post("/", async (req, res, next) => {
  try {
    const result = await recordsModel.create(req.body);
    if (!result) return res.sendStatus(409);
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
});

// Delete a record
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await recordsModel.delete(req.params.id);
    if (!result) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (e) {
    return next(e);
  }
});

// Update a record
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const doc = await recordsModel.getById(id);
    if (!doc) return res.sendStatus(404);

    // Merge existing fields with the ones to be updated
    Object.keys(data).forEach((key) => (doc[key] = data[key]));

    const updateResult = await recordsModel.update(id, doc);
    if (!updateResult) return res.sendStatus(404);

    return res.json(doc);
  } catch (e) {
    return next(e);
  }
});

// Replace a record
router.put("/:id", async (req, res, next) => {
  try {
    const updateResult = await recordsModel.update(req.params.id, req.body);
    if (!updateResult) return res.sendStatus(404);

    const result = await recordsModel.getById(req.params.id);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
