const fs = require('fs');
const chalk = require('chalk');

// without ES6 arrow notation is in "addNote" function below - just to compare

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)

    saveNotes(notesToKeep);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.inverse.green("Note removed, Note: " +title));
    }
    else {
        console.log(chalk.red.inverse("No note found"));
    }
}

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("New Note added"));
    }
    else {
        console.log(chalk.red.inverse("Note title taken"));
    }
}

const listNotes = () => {
    console.log(chalk.underline.cyan.inverse("YOUR NOTES:"));
    const notes = loadNotes();

    // Alternative
    // notes.filter((list) => console.log(list.title))
    notes.forEach((list) => console.log(list.title))  // forEach goes thru every note one by one similar to filter
}

const readNote = (title) => {
    const notes = loadNotes();
    const searchedNote = notes.find((note) => note.title === title)

    if (searchedNote) {
        console.log(chalk.inverse.yellow("Title: " + searchedNote.title))
        console.log(searchedNote.body);
        }
        else {
            console.log(chalk.red.inverse("NO NOTE FOUND"));
        }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);

    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}