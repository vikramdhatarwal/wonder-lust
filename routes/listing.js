const express=require('express');
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing");
const ExpressError=require("../utils/ExpressError.js");
const { isLoggedIn, isowner ,validateListing} = require("../middleware.js");
const listingController=require("../controllers/listings.js");



//Index route to display all listings
router.get("/",wrapAsync(listingController.index));


//new route to display a form for creating a new listing
router.get("/new",isLoggedIn,wrapAsync(listingController.renderNewForm));

//Create route to handle form submission and create a new listing
router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));


//Show route to display a single listing by ID
router.get("/:id",wrapAsync(listingController.showListing));

//Edit route to display a form for editing an existing listing
router.get("/:id/edit",isLoggedIn,isowner,wrapAsync(listingController.renderEditForm));

//Update route to handle form submission and update an existing listing
router.put("/:id", isLoggedIn,isowner, validateListing, wrapAsync(listingController.updateListing));

//confirm delete route to display a confirmation page before deleting a listing
router.get("/:id/delete",isLoggedIn,isowner,wrapAsync(listingController.renderDeleteForm));

//Delete route to delete an existing listing
router.delete("/:id",isLoggedIn,isowner,wrapAsync(listingController.deleteListing));


module.exports=router;
