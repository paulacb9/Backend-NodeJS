'use strict'

// importar mi modelo
var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {

    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el metodo test del controlador de project'
        });
    },

    // Guardar el proyecto en base de datos
    saveProject: async function (req, res) {
        var project = new Project();

        // Recoger los parametros que me llegan por el body de la petición
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        // Guardar este objeto en la db
        try {
            var projectStored = await project.save();
            return res.status(200).send({ project: projectStored });
        } catch (error) {
            if (!projectStored) {
                return res.status(404).send({ message: 'No se ha podido guardar el proyecto.' });
            }
            return res.status(500).send({ error: 'Error al guardar' });
        }
    },

    // Conseguir datos de forma asincrona con try/catch
    getProject: async function (req, res) {
        try {
            var projectId = req.params.id;
            if (projectId == null) return res.status(404).send({ message: 'El proyecto no existe.' });
            
            const project = await Project.findById(projectId).exec();
            if (!project) throw new Error( 'El proyecto cno existe.' );
            
            return res.status(200).send({ project });
        } catch (error) {
            if (error.message = 'El proyecto no existe.') return res.status(404).send({ message: 'El proyecto no existe.' });

            return res.status(500).send({ message: 'Error al devolver los datos.' });
        }
    },

    getProjects: async function(req, res){
        try{
            const project = await Project.find({}).sort('-year').exec();
            if(!project) throw new Error('No hay proyectos');
            return res.status(200).send({project});
        }catch (error){
            if (error.message = 'No hay proyectos') return res.status(404).send({message: 'No hay proyectos que mostrar.'})
            return res.status(500).send({message: 'Error al devolver los datos.'});
        }
    },

    updateProject: async function(req, res){
        try {
            var projectId = req.params.id;
            var update = req.body;
            const projectUpdate = await Project.findByIdAndUpdate(projectId, update, {new:true});

            if(!projectUpdate) throw new Error('No existe el proyecto para actualizarlo.');
            return res.status(200).send({project: projectUpdate});
        }catch(error){
            return res.status(500).send({message: 'Error al actualizar.'});
        }
    },

    deleteProject: async function(req, res){
        try{
            var projectId = req.params.id;
            const projectRemoved = await Project.findByIdAndRemove(projectId);

            if(!projectRemoved) return res.status(404).send({message: 'No se ha podido borrar el proyecto.'});
            return res.status(200).send({project: projectRemoved});
        }catch(error){
            return res.status(500).send({message:'No se ha podido borrar el proyecto'});
        }
    },

    updoadImage: async function(req, res){
        try{
            var projectId = req.params.id;
            var fileName = 'Imagen no subida...';

            if(req.files){
                var filePath = req.files.image.path;
                var fileSplit = filePath.split('\\');
                var fileName = fileSplit[1];
                var extSplit = fileName.split('\.');
                var fileExt = extSplit[1];

                if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                    const projectUpdated = await Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true});

                    if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});
                    return res.status(200).send({ project: projectUpdated });
                }else{
                    fs.unlink(filePath, (err) => {
                        return res.status(200).send({message: 'La extensión no es valida'});
                    });
                }
            }else{
                return res.status(200).send({ message: fileName });
            }
        }catch(error){
            return res.status(500).send({message: 'No se ha podido subir la imagen'});
        }
    },

    getImageFile: async function(req, res){
        return new Promise((resolve, reject) =>{
            var file = req.params.image;
            var path_file = './uploads/'+file;
            fs.exists(path_file, (exists) => {
                if(exists){
                    return res.sendFile(path.resolve(path_file));
                }else{
                    return res.status(200).send({message: 'No existe la imagen...'});
                }
            });
        });
    }

    // De forma sincrona 
    /*
    getProject: function (req, res) {
        var projectId = req.params.id;
        if (projectId == null) return res.status(404).send({ message: 'El proyecto no existe.' });
        Project.findById(projectId)
          .exec()
          .then(function (project) {
            if (!project) return res.status(404).send({ message: 'El proyecto no existe.' });
            return res.status(200).send({ project });
          })
          .catch(function (error) { return res.status(500).send({ message: 'Error al devolver los datos.' });
        });
    },
    
    getProjects: function(req, res){
        Project.find({})
            .exec()
            .then(function (project){
                if (!project) return res.status(404).send({ message: 'No hay proyectos que mostrar' });
                return res.status(200).send({ project });
            })
            .catch(function(err){
                return res.status(500).send({message:'Error al devolver los datos.'});
            });
    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true})
            .then(function (projectUpdate){
                if(!projectUpdate) return res.status(404).send({message: 'No existe el proyecto para actualizarlo.'});
                return res.status(200).send({project: projectUpdate});
            })
            .catch(function(error){ return res.status(500).send({message: 'Error al actualizar.'});
        });
    },

    deleteProject: function(req, res){
        var projectId = req.params.id;
        Project.findByIdAndRemove(projectId)
            .then(function(projectRemoved){
                if(!projectRemoved) return res.status(404).send({message: 'No se puede elimar ese proyecto'});
                return res.status(200).send({project: projectRemoved});
            })
            .catch(function(error){
                return res.status(500).send({message:'No se ha podido borrar el proyecto'});
            });
    }
    */

}

module.exports = controller;