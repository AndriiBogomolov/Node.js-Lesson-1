const db = require("./contacts");

const { Command } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContacts = await db.getAll();
      console.table(listContacts);
      break;
    case "get":
      const oneContact = await db.getContactById(id);
      console.table(oneContact);
      break;
    case "add":
      const newContact = await db.addContact({ name, email, phone });
      console.table(newContact);
      break;
    case "update":
      const updateContact = await db.updateById(id, { email, phone });
      console.table(updateContact);
      break;
    case "remove":
      const removeContact = await db.removeContact(id);
      console.table(removeContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv);

invokeAction(argv);
