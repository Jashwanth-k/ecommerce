const db = require("../models/loadIndex");

class RoleService {
  constructor() {
    this.schema = db.role;
  }

  findRolesByName(roleNames) {
    return this.schema.findAll({
      where: {
        name: {
          [db.Op.or]: roleNames,
        },
      },
    });
  }
}

const roleService = new RoleService();
module.exports = {
  roleService,
};
