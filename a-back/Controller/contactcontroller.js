const Contact = require("../model/Contact"); // make sure the path is correct

const contactus = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All details are required" });
  }

  try {
    const createContact = await Contact.create({ name, email, message });

    res.status(201).json({
      status: true,
      message: "Contact created successfully",
      data: createContact
    });
  } catch (err) {
    console.error("There is some error", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getContact = async (req, res) => {
  try {
    const allContact = await Contact.find();

    res.status(200).json({
      status: true,
      message: "Contacts fetched successfully",
      data: allContact
    });
  } catch (err) {
    console.error("There is some error", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getContactById = async (req, res) => {
  try {
    const { id } = req.params

    const contactById = await Contact.findById(id);

    res.status(200).json({
      status: true,
      message: "Contacts fetched successfully",
      data: contactById
    });
  } catch (err) {
    console.error("There is some error", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

const deleteContact = async (req, res) => {

  try {
    const { id } = req.params
    const deleteContact = await Contact.findByIdAndDelete(id)
    res.status(200).json({
      status: true,
      message: "Contacts fetched successfully",
      data: deleteContact
    });
  } catch (error) {

    console.error("There is some error", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, {
      new: true,        
      runValidators: true 
    });

    if (!updatedContact) {
      return res.status(404).json({
        status: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Contact updated successfully",
      data: updatedContact
    });
  } catch (err) {
    console.error("There was an error updating the contact:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};


module.exports = { contactus, getContact, getContactById, deleteContact ,updateContact };
