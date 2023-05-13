from flask import Blueprint, jsonify,request
from flask_login import login_required,current_user
from app.models import User, Project, File, FileContent, Template, PublishedTemplate, db

project_routes = Blueprint('projects', __name__)

# refer to routes.md for info

@project_routes.route('/')
@login_required
def projects():
    """
    Query for all projects and returns them in a list of project dictionaries
    """
    # get projects belonging to current user
    projects = Project.query.filter_by(userid=current_user.id).all()
    return {'projects': [project.to_dict() for project in projects]}

@project_routes.route('/<int:id>', methods=['GET'])
@login_required
def project(id):
    """
    Query for a project by id and returns that project in a dictionary
    """
    project = Project.query.get(id)
    return project.to_dict()

@project_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_project(id):
    """
    Deletes a project by id
    """
    project = Project.query.get(id)
    if project.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    db.session.delete(project)
    db.session.commit()
    return project.to_dict()

@project_routes.route('/new', methods=['POST'])
@login_required
def create_project():
    """
    Creates a project by id
    """
    project = Project(
        name=request.json['name'],
        userid=current_user.id
    )
    # select template by templateID
    template = Template.query.get(request.json['templateID'])

    file = File(
        name='index.html',
        templateid=template.id,
        project=project

    )
    fileContent = FileContent(
        file=file,
        content=''
    )
    try:
        db.session.add(file)
        db.session.add(fileContent)

        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    except:
        return {'errors': ['Project Name Already Exists']}, 401


@project_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_project(id):
    """
    Updates a project by id
    """
    project = Project.query.get(id)
    if project.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    project.name = request.json['name']
    db.session.commit()
    return project.to_dict()

@project_routes.route('/<int:id>/file', methods=['GET'])
@login_required
def project_files(id):
    """
    Query for all files belonging to a project by id and returns them in a list of file dictionaries
    """
    project = Project.query.get(id)
    if project.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    files = project.files
    return {'files': [file.to_dict() for file in files]}

@project_routes.route('/<int:id>/file', methods=['POST'])
@login_required
def create_file(id):
    """
    Creates a new file and adds it to a project by id
    """
    project = Project.query.get(id)
    template = Template.query.get(request.json['templateid'])
    if project.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    file = File(
        name=request.json['name'],
        projectid=id,
        templateid=template.id
    )
    fileContent = FileContent(
        file=file,
        content=''
    )

    db.session.add(file)
    db.session.add(fileContent)
    db.session.commit()
    return file.to_dict()

@project_routes.route('/<int:id>/file/<int:fileid>', methods=['GET'])
@login_required
def file(id, fileid):
    """
    Query for a file by id and returns that file in a dictionary
    """
    project = Project.query.get(id)
    if project.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    file = File.query.get(fileid)
    if file.projectid != id:
        return {'errors': ['Unauthorized']}, 401
    fileDict = file.to_dict()
    fileDict['content'] = file.content
    return fileDict

@project_routes.route('/<int:id>/file/<int:fileid>', methods=['DELETE'])
@login_required
def delete_file(id, fileid):
    """
    Deletes a file by id
    """
    project = Project.query.get(id)
    if project.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    file = File.query.get(fileid)
    if file.projectid != id:
        return {'errors': ['Unauthorized']}, 401
    fileContent = FileContent.query.get(fileid)
    db.session.delete(fileContent)
    db.session.delete(file)
    db.session.commit()
    return {'message': 'File deleted'}

@project_routes.route('/<int:id>/file/<int:fileid>', methods=['PUT'])
@login_required
def update_file(id, fileid):
    """
    Updates a file by id
    """
    project = Project.query.get(id)
    if project.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    file = File.query.get(fileid)
    if file.projectid != id:
        return {'errors': ['Unauthorized']}, 401
    if request.json['name'] == '':
        return {'errors': ['File name cannot be empty']}, 401
    file.name = request.json['name']
    db.session.commit()
    return file.to_dict()

@project_routes.route('/<int:id>/file/<int:fileid>/content', methods=['PUT'])
@login_required
def update_file_content(id, fileid):
    """
    Updates a file content by id
    """
    project = Project.query.get(id)
    if project.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    file = File.query.get(fileid)
    if file.projectid != id:
        return {'errors': ['Unauthorized']}, 401
    fileContent = FileContent.query.get(fileid)
    fileContent.content = request.json['content']
    db.session.commit()
    return file.to_dict()

@project_routes.route('/<int:id>/file/<int:fileid>/content', methods=['GET'])
@login_required
def get_file_content(id, fileid):
    """
    Gets a file content by id
    """
    project = Project.query.get(id)
    if project.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    file = File.query.get(fileid)
    if file.projectid != id:
        return {'errors': ['Unauthorized']}, 401
    fileContent = FileContent.query.get(fileid)
    return fileContent.to_dict()

@project_routes.route('/<int:id>/file/<int:fileid>/content', methods=['DELETE'])
@login_required
def delete_file_content(id, fileid):
    """
    Deletes a file content by id
    """
    project = Project.query.get(id)
    if project.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    file = File.query.get(fileid)
    if file.projectid != id:
        return {'errors': ['Unauthorized']}, 401
    fileContent = FileContent.query.get(fileid)
    fileContent.content = ''
    db.session.commit()
    return {'message': 'File content erased'}


