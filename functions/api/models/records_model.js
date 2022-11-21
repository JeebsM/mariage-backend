const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class RecordModel {
  constructor() {
    if (this.instance) return this.instance;
    RecordModel.instance = this;
  }

  get() {
    return database.getList("records");
  }

  getById(id) {
    return database.get("records", id);
  }

  create(record) {
    return database.create("records", record);
  }

  delete(id) {
    return database.delete("records", id);
  }

  update(id, record) {
    return database.set("records", id, record);
  }
}

module.exports = new RecordModel();
