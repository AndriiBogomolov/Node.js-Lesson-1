// const { optional } = require("joi");
const db = require("./contacts");
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
// const consoleTable = require("console.table");
const { Command } = require("commander");
// const { options } = require("yargs");
// const db = new Contacts();

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

// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
invokeAction(argv);

// invokeAction({ action: "read" });
// invokeAction({ action: "getById", id: "rsKkOQUi80UsgVPCcLZZW" });
// invokeAction({
//   action: "updateById",
//   id: "YoqAXDrg4I2TXydIz9y6y",
//   email: "Don@scerereerererererererererer.net",
//   phone: "(777) 777-7777",
// });
// invokeAction({ action: "deleteById", id: "rbt_eS5K1Eiua5KSOiWT_" });
