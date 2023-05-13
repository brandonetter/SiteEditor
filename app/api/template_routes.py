from flask import Blueprint, jsonify,request
from flask_login import login_required,current_user
from app.models import User, Project, File, FileContent, Template, PublishedTemplate, db

template_routes = Blueprint('templates', __name__)

# refer to routes.md for info

@template_routes.route('/')
@login_required
def templates():
    """
    Query for all templates and returns them in a list of template dictionaries
    """
    # get templates belonging to current user
    templates = Template.query.filter_by(userid=current_user.id).all()
    return {'templates': [template.to_dict() for template in templates]}

@template_routes.route('/<int:id>', methods=['GET'])
@login_required
def template(id):
    """
    Query for a template by id and returns that template in a dictionary
    """
    template = Template.query.get(id)
    return template.to_dict()

@template_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_template(id):
    """
    Deletes a template by id
    """
    template = Template.query.get(id)
    if template.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    try:
        db.session.delete(template)
        db.session.commit()
        return template.to_dict()
    except:
        return {'errors': ['Cannot Delete, Template used in a Project']}, 401
    return template.to_dict()

@template_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_template(id):
    """
    Updates a template by id
    """
    template = Template.query.get(id)
    if template.userid != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    if request.json['name'] == '':
        return {'errors': ['Template name cannot be blank']}, 401
    try:
        template.name = request.json['name']
        db.session.commit()
        return template.to_dict()
    except:
        return {'errors': ['Template name already exists']}, 401


@template_routes.route('/new', methods=['POST'])
@login_required
def create_template():
    """
    Creates a template by id
    """
    print(request.json)

    content = {'template':request.json['gridTemplate'], 'divs':request.json['divs']}
    # escape single quotes
    content = str(content).replace("'", "''")

    # try to create a new template
    # and catch any errors
    try:
        template = Template(
            name=request.json['name'],
            content = content,
            userid=current_user.id
        )
        db.session.add(template)
        db.session.commit()
        return template.to_dict()
    except:
        return {'errors': ['Template name already exists']}, 401




