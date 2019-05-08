const express = require('express');
const adaptor = require('./projectsAdaptor');

const app = express();
app.use(express.json());


app.post('/api/projects', (req, res) => {
      const responseData = adaptor.createProject(req.body);
      if (Array.isArray(responseData)) {
            return res.status(403).send(responseData);
      }
      res.set('Location', `/api/projects/${responseData.id}`);
      return res.status(201).send();
});

app.get('/api/projects', (req, res) => {
      const allProjects = adaptor.loadAllProjects();
      return res.status(200).send(allProjects);
});

app.get('/api/projects/:id', (req, res) => {
      const id = req.params.id;
      let project;
      try {
            project = adaptor.getProject(id);
            console.log(project)
      }
      catch (e) {
            return res.status(404).send('Project with such id was not found.');
      }

      return res.status(200).send(project);
});

app.delete('/api/projects/:id', (req, res) => {
      const id = req.params.id;
      try {
            adaptor.deleteProject(id);
      }
      catch  {
            return res.status(404).send('Project with such id was not found.');
      }

      return res.status(204).send();
});

app.put('/api/projects/:id', (req, res) => {
      const id = req.params.id;
      const data = req.body;
      try {
            adaptor.putProject(id, data);
      }
      catch  {
            return res.status(404).send('Project with such id was not found.');
      }

      return res.status(204).send();
});

app.listen(3030);