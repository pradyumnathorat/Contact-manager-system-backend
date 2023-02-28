const express = require('express');
const dbconnect = require('./connection');
const contactModel = require('./contactModel')
dbconnect();
const port = 4000;
const app = express();
app.use(express.json());



app.post('/v1/contacts', async (req, res) => {
    try {
        const { firstName, lastName , email , phone } = req.body;
        if ( !firstName) {
            return res.status(404).json({ 
                error : "Missing required field(s): firstName"
            })
        }
        if ( !lastName) {
            return res.status(404).json({ 
                error : "Missing required field(s): lastName"
            })
        }
        if ( !email) {
            return res.status(404).json({ 
                error : "Missing required field(s): email"
            })
        }
        if ( !phone) {
            return res.status(404).json({ 
                error : "Missing required field(s): phone"
            })
        }

        const userEmail = await contactModel.findOne({ email });
        const userPhone = await contactModel.findOne({ phone });
        if (userEmail || userPhone) {
            return res.status(403).json({ error: "User already exists" })
        }
        const data = await contactModel.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            phone : req.body.phone
        })
        return res.status(201).json(data);
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
})

app.get("/v1/contacts" , async (req, res) => {
    try {
        const contacts = await contactModel.find();
        return res.status(200).json(contacts)
    }catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
})

app.get("/v1/contacts/:id" , async (req, res) => {
    try {
        const contact = await contactModel.findById(req.params.id);
        return res.status(200).json(contact)
    }catch (err) {
        return res.status(404).json({
            error : "There is no contact with that id"
        })
    }
})

app.delete("/v1/contacts/:id" , async (req, res) => {
    try {
        const contact = await contactModel.findByIdAndDelete(req.params.id);
        return res.status(204).send("None")
    }catch (err) {
        return res.status(204).send("None")
    }
})

app.put('/v1/contacts/:id', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await contactModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ "error": "There is no contact with that id" })
        }
        const data = await contactModel.findByIdAndUpdate(req.params.id , {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            phone : req.body.phone
        } ,{ new:true})
        await data.save();
        return res.status(204).json(data);
    } catch (err) {
        return res.status(400).json({
            "error": "There is no contact with that id"
        })
    }
})

app.patch('/v1/contacts/:id', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await contactModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ "error": "There is no contact with that id" })
        }
        const data = await contactModel.findByIdAndUpdate(req.params.id , {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            phone : req.body.phone
        } ,{ new:true})
        await data.save();
        return res.status(204).json(data);
    } catch (err) {
        return res.status(400).json({
            "error": "There is no contact with that id"
        })
    }
})



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});