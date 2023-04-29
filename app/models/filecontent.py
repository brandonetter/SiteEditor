from .db import db, environment, SCHEMA, add_prefix_for_prod


class FileContent(db.Model):
    __tablename__ = 'file_contents'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    fileid = db.Column(db.Integer, db.ForeignKey('files.id'), nullable=False)
    content = db.Column(db.Text, nullable=False, unique=False)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime, server_default=db.func.now(),server_onupdate=db.func.now())

    file = db.relationship('File', back_populates='file_contents')



    def to_dict(self):
        return {
            'id': self.id,
            'fileid': self.fileid,
            'content': self.content,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt

        }
