const validator = require('validator');
const notes = require('./notes');
const chalk = require('chalk');
const yargs = require('yargs');

// Customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    // Arrow notation ES6 of this type is in "remove" command below
    handler: function(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNote(argv.title)
})

// Create read command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: () => notes.listNotes()
})

yargs.command({
    command: 'read',
    describe: 'Read your notes',
    builder: {
        title: {
            describe: "Note title to be read",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNote(argv.title)
})
// add, remove, read, list 

yargs.parse();
//console.log(yargs.argv);


