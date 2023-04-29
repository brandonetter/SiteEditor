from flask import Blueprint, jsonify,request
from flask_login import login_required
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
    db.session.delete(template)
    db.session.commit()
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
    template.name = request.json['name']
    db.session.commit()
    return template.to_dict()

@template_routes.route('/<int:id>', methods=['POST'])
@login_required
def create_template(id):
    """
    Creates a template by id
    """
    template = Template(
        name=request.json['name'],
        userid=current_user.id
    )
    db.session.add(template)
    db.session.commit()
    return template.to_dict()

