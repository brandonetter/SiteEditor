from .db import db, environment, SCHEMA, add_prefix_for_prod


class File(db.Model):
    __tablename__ = 'files'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    projectid = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    name = db.Column(db.String(40), nullable=False, unique=True)
    templateid = db.Column(db.Integer, db.ForeignKey('templates.id'), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime, server_default=db.func.now(),server_onupdate=db.func.now())

    project = db.relationship('Project', back_populates='files')

    file_contents = db.relationship('FileContent', back_populates='file')

    @property
    def content(self):
        return FileContent.query.filter_by(id=self.id).first().content



    def to_dict(self):
        return {
            'id': self.id,
            'projectid': self.projectid,
            'name': self.name,
            'templateid': self.templateid,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
