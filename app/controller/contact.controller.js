exports.create = (req, res) => {
    res.send({message: "create Handler"});
}

exports.findAll = (req, res) => {
    res.send({message: "find All Handler"});
}

exports.findOne = (req, res) => {
    res.send({message: "findOne Handler"});
}

exports.update = (req, res) => {
    res.send({message: "update Handler"});
}

exports.delete = (req, res) => {
    res.send({message: "delete Handler"});
}

exports.deleteAll = (req, res) => {
    res.send({message: "deleteAll Handler"});
}

exports.findAllFav = (req, res) => {
    res.send({message: "find All Favorite Handler"});
}