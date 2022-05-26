"use strict";
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNote = document.importNode(this.templateElement.content, true);
        this.element = importedNote.firstElementChild;
        this.element.id = 'user-input';
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const projectInput = new ProjectInput();
//# sourceMappingURL=app.js.map