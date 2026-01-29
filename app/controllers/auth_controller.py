from app.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

class AuthController:

    @staticmethod
    def register_user(username, email, password):
        """
        Registra un nuevo usuario en el sistema.
        Si es el primer usuario, se le asigna el rol 'admin'.
        
        Args:
            username (str): Nombre de usuario.
            email (str): Correo electrónico.
            password (str): Contraseña plana.
            
        Returns:
            dict: Resultado de la operación con claves 'success' y 'message'.
        """
        # Verificar si el usuario ya existe
        if User.query.filter_by(username=username).first():
            return {'success': False, 'message': 'El nombre de usuario ya existe'}
        if User.query.filter_by(email=email).first():
            return {'success': False, 'message': 'El email ya está registrado'}
        
        # Hash de la contraseña
        hashed_password = generate_password_hash(password)
        
        # Determinar rol: si es el primer usuario, es admin
        role = 'user'
        if User.query.count() == 0:
            role = 'admin'

        # Crear nuevo usuario
        new_user = User(
            username=username,
            email=email,
            password=hashed_password,
            role=role
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        msg = 'Usuario registrado exitosamente'
        if role == 'admin':
            msg += ' como ADMIN (primer usuario).'

        return {'success': True, 'message': msg}

    @staticmethod
    def login_user(username, password):
        """
        Valida las credenciales de un usuario para iniciar sesión.
        
        Args:
            username (str): Nombre de usuario.
            password (str): Contraseña plana.
            
        Returns:
            dict: Resultado con 'success', 'message' y 'user' (si es exitoso).
        """
        user = User.query.filter_by(username=username).first()
        
        if not user or not check_password_hash(user.password, password):
            return {'success': False, 'message': 'Usuario o contraseña incorrectos'}
        
        return {
            'success': True,
            'message': 'Inicio de sesión exitoso',
            'user': user.to_dict()
        }

    @staticmethod
    def get_all_users():
        """
        Obtiene todos los usuarios registrados.
        
        Returns:
            dict: Lista de usuarios.
        """
        users = User.query.all()
        return {'success': True, 'users': [user.to_dict() for user in users]}

    @staticmethod
    def get_user_count():
        """
        Obtiene la cantidad total de usuarios registrados.
        
        Returns:
            int: Número de usuarios.
        """
        return User.query.count()

    @staticmethod
    def get_user_by_id(user_id):
        """
        Busca un usuario por su ID.
        
        Args:
            user_id (int): ID del usuario.
            
        Returns:
            dict: Datos del usuario o mensaje de error.
        """
        user = User.query.get(user_id)
        if not user:
            return {'success': False, 'message': 'Usuario no encontrado'}
        return {'success': True, 'user': user.to_dict()}

    @staticmethod
    def update_user(user_id, username=None, email=None, password=None, role=None):
        """
        Actualiza la información de un usuario existente.
        
        Args:
            user_id (int): ID del usuario a modificar.
            username (str, optional): Nuevo nombre de usuario.
            email (str, optional): Nuevo correo electrónico.
            password (str, optional): Nueva contraseña.
            role (str, optional): Nuevo rol.
            
        Returns:
            dict: Resultado de la operación.
        """
        user = User.query.get(user_id)
        if not user:
            return {'success': False, 'message': 'Usuario no encontrado'}
        
        # Actualizar campos si se proporcionan
        if username:
            # Verificar que el username no esté en uso por otro usuario
            existing = User.query.filter(User.username == username, User.id != user_id).first()
            if existing:
                return {'success': False, 'message': 'El nombre de usuario ya existe'}
            user.username = username
            
        if email:
            # Verificar que el email no esté en uso por otro usuario
            existing = User.query.filter(User.email == email, User.id != user_id).first()
            if existing:
                return {'success': False, 'message': 'El email ya está registrado'}
            user.email = email
            
        if password:
            user.password = generate_password_hash(password)
            
        if role:
            # Validar que el rol sea válido
            if role not in ['admin', 'subadmin', 'user']:
                return {'success': False, 'message': 'Rol inválido'}
            user.role = role
        
        db.session.commit()
        return {'success': True, 'message': 'Usuario actualizado exitosamente'}

    @staticmethod
    def delete_user(user_id):
        """
        Elimina un usuario por su ID.
        
        Args:
            user_id (int): ID del usuario a eliminar.
            
        Returns:
            dict: Resultado de la operación.
        """
        user = User.query.get(user_id)
        if not user:
            return {'success': False, 'message': 'Usuario no encontrado'}
        
        db.session.delete(user)
        db.session.commit()
        return {'success': True, 'message': 'Usuario eliminado exitosamente'}
