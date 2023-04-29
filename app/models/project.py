from .db import db, environment, SCHEMA, add_prefix_for_prod


class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(40), nullable=False, unique=False)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime, server_default=db.func.now(),server_onupdate=db.func.now())

    user = db.relationship('User', back_populates='projects')
    files = db.relationship('File', back_populates='project')

    @property
    def list_files(self):
        filelist = File.query.filter_by(projectid=self.id).all()
        return [file.to_dict() for file in filelist]

    @property
    def content(self):
        return FileContent.query.filter_by(id=self.id).first().content

    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'name': self.name,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt

        }
