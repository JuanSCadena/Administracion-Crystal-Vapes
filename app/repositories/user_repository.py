from app.repositories.base_repository import BaseRepository
from app.models.user import User

class UserRepository(BaseRepository):
    def __init__(self):
        super().__init__(User)

    def get_by_username(self, username):
        return self.model.query.filter_by(username=username).first()

    def get_by_email(self, email):
        return self.model.query.filter_by(email=email).first()
        
    def check_username_exists(self, username, exclude_id=None):
        query = self.model.query.filter(self.model.username == username)
        if exclude_id:
            query = query.filter(self.model.id != exclude_id)
        return query.first()

    def check_email_exists(self, email, exclude_id=None):
        query = self.model.query.filter(self.model.email == email)
        if exclude_id:
            query = query.filter(self.model.id != exclude_id)
        return query.first()
