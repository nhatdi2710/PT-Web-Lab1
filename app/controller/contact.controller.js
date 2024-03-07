// const { ApiError } = require("mongodb");
const ContactService = require("../services/contact.services");
const MongoDB = require("../utils/mongodb.utils");
const APIError = require("../app-error");

// Handler
// Create and Save new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new APIError(400, "Name can't not empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);

        return res.send(document);
    } catch (error) {
        return next(new APIError(500, "An error occurred while creating the contact"));
    };
}

// FindAll
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        
        const contactService = new ContactService(MongoDB.client);
        const {name} = req.query;
       

        if (name) {
            documents = await contactService.findByName(name);
        } 
        else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(new APIError(500, "An error occurred while retrieving contacts"));
    }

    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);

        if (!document) {
            return next(new APIError(404, "Contact not found"));
        }
        
        return res.send(document);
    } catch (error) {
        return next(new APIError(500, `Error retrieving contact with id = ${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new APIError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);

        if (!document) {
            return next(new APIError(404, "Contact not found"));
        }
        return res.send({message: "Contact was updated successfully!"});
    } catch (error) {
        return next(new APIError(500, `Error updating with id = ${req.params.id}`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);

        if (!document) {
            return next(new APIError(404, "Contact not found"));
        }

        return res.send({message: "Contact was deleted successfully!"});
    } catch (error) {
        return next(new APIError(500, `Error delete with id = ${req.params.id}`));
    }
}

exports.findAllFav = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(new APIError(500, "Error while find Favorite"));
    }
}

exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(new APIError(500, "Error while Delete all"));
    }
}