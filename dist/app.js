"use strict";
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, desc, people, status) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.people = people;
        this.status = status;
    }
}
class ProjectManager {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectManager();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, desc, peopleNum) {
        const newProject = new Project(Math.random().toString(), title, desc, peopleNum, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectManager = ProjectManager.getInstance();
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.req) {
        isValid == isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.min === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.max === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNote = document.importNode(this.templateElement.content, true);
        this.element = importedNote.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBegging) {
        this.hostElement.insertAdjacentElement(insertAtBegging ? 'afterbegin' : 'beforeend', this.element);
    }
}
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}=projects`);
        this.type = type;
        this.assignedProject = [];
        this.configure();
        this.renderContent();
    }
    configure() {
        projectManager.addListener((projects) => {
            const newProjects = projects.filter((project) => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            this.assignedProject = newProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const projectItem of this.assignedProject) {
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            listEl === null || listEl === void 0 ? void 0 : listEl.appendChild(listItem);
        }
    }
}
class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDesc = this.descInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            req: true,
        };
        const descValidatable = {
            value: enteredDesc,
            req: true,
            minLength: 1,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            req: true,
            min: 1,
            max: 5,
        };
        if (!validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)) {
            alert('Invalid input, pleasy try again');
            return;
        }
        else {
            return [enteredTitle, enteredDesc, +enteredPeople];
        }
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectManager.addProject(title, desc, people);
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
    renderContent() { }
}
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
//# sourceMappingURL=app.js.map