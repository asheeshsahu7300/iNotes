const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
//Route 1 :get all the Note
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
      
        const notes = await Note.find({user: req.user.id});
        console.log(notes);
        res.send(notes);
    } catch (error){
        res.status(400).send("Internal server error occuerd ");
    }
    
});

//Route 2 :add a new Note
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", " description must be 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    console.log(req.body);
    const error = validationResult(req);
    try { 
      const { title, description, status } = req.body;
      if (!error.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
      }
      
    const note = new Note({
      title, description, status, user: req.user.id
    });
    console.log(req.user.id);
    const saveNote=await note.save();
    res.json(saveNote);
    } catch (error) {
        res.status(500).send("Internal server error occuerd ");
    }
    
  }
);


//Route 3:delete a note

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    console.log(req.user);
    const deletenote=await Note.deleteOne({_id:req.params.id , user:req.user.id});
    res.send(deletenote);
})


//Route 4:update an existing note

router.put('/updatenote/:id',fetchuser ,async(req,res)=>{
  console.log(req.body);
  const {title,description,status,date}=req.body;
  const newnote={};
  if(title){newnote.title=title};
  if(description){newnote.description=description};
  if(status){newnote.status=status};
  if(date){newnote.date=date};
  //find the node need to be update
  const note=await Note.findById(req.params.id);
  if(!note){
    return res.status(400).send('NOT FOUND');
  }
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("NOT ALLOWED");
  }
  const updatednote=await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new :true});
 console.log(newnote);
  res.json(updatednote);
})

module.exports = router;
