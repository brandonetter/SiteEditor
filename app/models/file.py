from .db import db, environment, SCHEMA, add_prefix_for_prod

class File(db.Model):
    __tablename__ = 'files'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    projectid = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    templateid = db.Column(db.Integer, db.ForeignKey('templates.id'), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime, server_default=db.func.now(),server_onupdate=db.func.now())

    project = db.relationship('Project', back_populates='files')

    file_contents = db.relationship('FileContent', back_populates='file')
    template = db.relationship('Template', back_populates='files')

    @property
    def content(self):
        return FileContent.query.filter_by(id=self.id).first().content



    def to_dict(self):
        return {
            'id': self.id,
            'projectid': self.projectid,
            'name': self.name,
            'templateid': self.templateid,
            'template': self.template.to_dict(),
            'content': self.file_contents[0].content,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
