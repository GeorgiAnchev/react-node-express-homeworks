
const projects = require('./projects.json');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'projects.json');

const loadAllProjects = () => {
      return projects;
}

const saveAllAccounts = (data) => {
      fs.writeFileSync(dataPath, JSON.stringify(data));
}

const getProject = (id) => {
      const data = loadAllProjects();
      const project = data.find(proj => proj.id == id);
      console.log(project)

      if (project === null) throw '';
      return project;
}

const putProject = (id, project) => {
      const oldData = getProject(id);
      const data = loadAllProjects();
      const index = data.indexOf(oldData);
      data[index] = { ...project, id: oldData.id };
      saveAllAccounts(data);
}

const deleteProject = (id) => {
      const oldData = getProject(id);
      const data = loadAllProjects();
      var index = data.indexOf(oldData);

      if (index === -1) {
            throw '';
      }
      data.splice(index, 1);
      saveAllAccounts(data);
}

const createProject = (project) => {
      const data = loadAllProjects();
      const errors = [];

      var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      if (!regex.test(String(project.url).toLowerCase())) {
            errors.push('Url not valid');
      }

      if (project.dateOfCreation === undefined || project.dateOfCreation === null) errors.push('Date not valid');
      if (project.pseudonims === undefined || project.pseudonims === null) errors.push('Pseudonims not valid');
      if (project.projectName === undefined || project.projectName === null) errors.push('Project name not valid');
      if (project.description === undefined || project.description === null) errors.push('Description not valid');
      if (project.status !== 'proposed' && project.status !== 'approved') errors.push('Status not valid');
      if (errors.length > 0) return errors;

      const newId = Date.now().toString();
      data.push({ ...project, id: newId });
      saveAllAccounts(data);
      return { id: newId };
}


module.exports = {
      getProject,
      putProject,
      deleteProject,
      createProject,
      loadAllProjects
}