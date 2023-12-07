const express = require('express');
const router = express.Router();
const doctor = require('../../models/Doctor');
// Fetch recommended Doctors

router.post('/recommend_doctors', async (req, res) => {
  const idList = req.body.ids;
  try {
    const doctors = await doctor.find({ _id: { $in: idList } });
    res.json(doctors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})

router.put('/rateDoctor', async (req, res) => {
  const { rating, docId } = req.body;
  try {
    const doc = await doctor.findById(docId);
    const ratt = doc.reviews;
    let intRating = parseInt(rating);
    intRating = intRating + 0.4;
    ratt.push(intRating);
    console.log(ratt);
    const ratedDoc = await doctor.findByIdAndUpdate(docId, { $set: { reviews: ratt } }, { new: true });
    res.json(ratedDoc);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
})

module.exports = router