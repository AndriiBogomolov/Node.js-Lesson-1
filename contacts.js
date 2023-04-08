const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const dbId = String(id);
  const contacts = await getAll();
  const result = contacts.find((item) => item.id === dbId);
  return result || null;
};

const addContact = async (data) => {
  const db = await getAll();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  db.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
  return newContact;
};

const updateById = async (id, data) => {
  const dbId = String(id);
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => item.id === dbId);
  if (idx === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const removeContact = async (id) => {
  const dbId = String(id);
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => item.id === dbId);
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  getAll,
  getContactById,
  addContact,
  updateById,
  removeContact,
};
