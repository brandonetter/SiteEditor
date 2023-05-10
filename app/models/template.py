from .db import db, environment, SCHEMA, add_prefix_for_prod


class Template(db.Model):
    __tablename__ = 'templates'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(40), nullable=False, unique=True)
    content = db.Column(db.Text, nullable=False, unique=False)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime, server_default=db.func.now(),server_onupdate=db.func.now())

    user = db.relationship('User', back_populates='templates')
    files = db.relationship('File', back_populates='template')


    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'name': self.name,
            'content': self.content,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt

        }
