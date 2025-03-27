const express = require("express");

const rental = require("../models/rental");
const router = express.Router();

//  Book a Rental
router.post("/book", async (req, res) => {
    try {
        const { name, email, carModel, startDate, endDate } = req.body;

        if (!name || !email || !carModel || !startDate || !endDate) {
            return res.status(400).json({ error: "All fields are required!" });
          }
        
      
        const newRental = new rental({ name, email, carModel, startDate, endDate ,status:"active"});
        
        await newRental.save();

        res.status(201).json({ message: "Car booked successfully!", newRental });
    } catch (error) {
        res.status(500).json({ message: "Error booking car", error });
    }
});


// View Rental Details by Email
router.get("/rental/:email", async (req, res) => {
    try {
      const renter = await rental.findOne({ email: req.params.email });
      if (!renter) {
        return res.status(404).json({ message: "No rental found" });
      }
      res.json(renter);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  //  View All Active Rentals
router.get("/rentals", async (req, res) => {
    try {
      const rentals = await rental.find({ status: "active" });
      res.json(rentals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Cancel Car Rental
router.delete("/rental/cancel/:email", async (req, res) => {
    try {
      const rentaling = await rental.findOneAndUpdate(
        { email: req.params.email },
        { status: "cancelled" },
        { new: true }
      );
  
      if (!rentaling) {
        return res.status(404).json({ message: "No rental found" });
      }
  
      res.json({ message: "Rental cancelled successfully", rentaling });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


  //  Modify Rental Duration
router.put("/rental/update/:email", async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
  
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Both start and end dates are required" });
      }
  
      const rentalChange = await rental.findOneAndUpdate(
        { email: req.params.email },
        { startDate, endDate },
        { new: true }
      );
  
      if (!rentalChange) {
        return res.status(404).json({ message: "No rental found" });
      }
  
      res.json({ message: "Rental duration updated successfully", rentalChange });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



module.exports = router;


