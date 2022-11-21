const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class UserModel {
  constructor() {
    if (this.instance) return this.instance;
    UserModel.instance = this;
  }

  get() {
    return database.getList("users");
  }

  getById(id) {
    return database.get("users", id);
  }

  getByKey(key, id) {
    return database.filter("users", key, id);
  }

  create(record) {
    return database.create("users", record);
  }

  delete(id) {
    return database.delete("users", id);
  }

  update(id, record) {
    return database.set("users", id, record);
  }
}

module.exports = new UserModel();
