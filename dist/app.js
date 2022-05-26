"use strict";
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNote = document.importNode(this.templateElement.content, true);
        this.element = importedNote.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDesc = this.descInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        if (enteredTitle.trim().length === 0 ||
            enteredDesc.trim().length === 0 ||
            enteredPeople.trim().length === 0) {
            alert('Invalid input, try again');
            return;
        }
        else {
            return [enteredTitle, enteredDesc, +enteredPeople];
        }
    }
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearForm();
        }
    }
    clearForm() {
        this.titleInputElement.value = '';
        this.descInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const projectInput = new ProjectInput();
//# sourceMappingURL=app.js.map