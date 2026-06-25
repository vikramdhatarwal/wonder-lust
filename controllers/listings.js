const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    
}


module.exports.renderNewForm=async(req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.createListing=async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","Successfully created a new listing!");
    res.redirect("/listings");

}


module.exports.showListing=async(req,res)=>{
    const {id}=req.params;
    
    const listing=await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if(!listing){
        req.flash("error","Listing not found");
        return res.redirect("/listings");
        // throw new ExpressError(404,"Listing not found");
    }
    res.render("listings/show.ejs",{listing});
    
}


module.exports.renderEditForm=async(req,res)=>{
    const {id}=req.params;
    
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing not found");
        return res.redirect("/listings");
        // throw new ExpressError(404,"Listing not found");
    }
    res.render("listings/edit.ejs",{listing});
    
}

module.exports.updateListing=async(req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        { new: true, runValidators: true }
    );

    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${updatedListing._id}`);
}


module.exports.renderDeleteForm=async(req,res)=>{
    const {id}=req.params;

    const listing=await Listing.findById(id);
    if(!listing){
        throw new ExpressError(404,"Listing not found");
    }
    res.render("listings/confirmDelete.ejs",{listing});

}

module.exports.deleteListing=async(req,res)=>{
    const {id}=req.params;
    
    const deletedListing=await Listing.findByIdAndDelete(id);
    if(!deletedListing){
        throw new ExpressError(404,"Listing not found");
    }
    req.flash("success","Successfully deleted the listing!");
    res.redirect("/listings");
  
}
