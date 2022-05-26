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
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
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