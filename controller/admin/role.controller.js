const Role = require("../../models/role.model");

module.exports.index = async (req, res) => {
    const roles = await Role.find({ delete: false });
    res.render("admin/pages/role/index", {
        roles: roles,
    });
};

module.exports.create = (req, res) => {
    res.render("admin/pages/role/create", {});
};

module.exports.createRole = async (req, res) => {
    console.log(req.body);

    const role = new Role({
        title: req.body.title,
        description: req.body.description,
    });
    await Role.insertMany([role]);
    res.redirect("back");
};

module.exports.editRole = async (req, res) => {
    const id = req.params.id;
    const role = await Role.findOne({ _id: id });
    res.render("admin/pages/role/edit.pug", {
        role: role,
    });
};

module.exports.edit = async (req, res) => {
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
};

module.exports.deleteRole = async (req, res) => {
    const id = req.params.id;
    await Role.deleteOne({ _id: id });
    res.redirect("back");
};

module.exports.permission = async (req, res) => {
    let find = {
        delete: false,
    };
    const records = await Role.find(find);
    res.render("admin/pages/role/permission.pug", {
        item: records,
    });
};

module.exports.updatePermission = async (req, res) => {
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
};
