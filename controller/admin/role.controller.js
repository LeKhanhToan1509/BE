const Role = require("../../models/role.model");

module.exports.index = async (req, res) => {
    try {
        const roles = await Role.find({ delete: false });
        res.render("admin/pages/role/index", {
            roles: roles,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

module.exports.create = (req, res) => {
    res.render("admin/pages/role/create", {});
};

module.exports.createRole = async (req, res) => {
    try {
        console.log(req.body);

        const role = new Role({
            title: req.body.title,
            description: req.body.description,
        });
        await Role.insertMany([role]);
        res.redirect("back");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

module.exports.editRole = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findOne({ _id: id });
        res.render("admin/pages/role/edit.pug", {
            role: role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        console.log(req.body);
        await Role.updateMany(
            { _id: id },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    permissions: req.body.permissions,
                },
            }
        );
        res.redirect("back");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

module.exports.deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        await Role.deleteOne({ _id: id });
        res.redirect("back");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

module.exports.permission = async (req, res) => {
    try {
        let find = {
            delete: false,
        };
        const records = await Role.find(find);
        res.render("admin/pages/role/permission.pug", {
            item: records,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

module.exports.updatePermission = async (req, res) => {
    try {
        const information = JSON.parse(req.body.post);
        for (let i = 0; i < information.length; i++) {
            await Role.updateMany(
                { _id: information[i].id },
                {
                    $set: {
                        permissions: information[i].permissions,
                    },
                }
            );
        }
        res.redirect("back");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};
