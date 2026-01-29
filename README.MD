#  Sistema de Administración Crystal Vapes

Sistema completo de gestión de inventario y proveedores para Crystal Vapes, desarrollado con Flask siguiendo arquitectura MVC y principios de Clean Code.



### Dashboard Principal
Sistema intuitivo con acceso rápido a todas las funcionalidades según el rol del usuario.

### Panel de Administración
Gestión completa de productos, proveedores y estadísticas del sistema en tiempo real.

---

##  Características Principales

###  Sistema de Autenticación
- Registro e inicio de sesión seguro
- Roles diferenciados: **Admin**, **Subadmin** y **User**
- Protección de rutas según permisos

###  Gestión de Productos
- Crear, editar, eliminar y listar productos
- Asignación de proveedores
- Control de stock en tiempo real
- Indicadores visuales de inventario

###  Gestión de Proveedores
- CRUD completo de proveedores
- Información de contacto completa
- Relación con productos

###  Gestión de Usuarios
- Administración de roles
- Edición de perfiles
- Control de acceso granular

###  Dashboard Estadístico
- Resumen de productos en inventario
- Total de proveedores
- Simulación de ventas
- Métricas en tiempo real

###  Diseño Responsive
- Optimizado para desktop, tablet y móvil
- Interfaz moderna y profesional
- Experiencia de usuario fluida

---

##  Roles y Permisos

| Rol | Ver Productos | Crear Productos | Editar Productos | Eliminar Productos | Gestionar Proveedores | Info Sistema |
|-----|--------------|----------------|-----------------|-------------------|---------------------|--------------|
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Subadmin** | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **User** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

##  Rutas de la Aplicación

### Autenticación
- `GET/POST /login` - Iniciar sesión
- `GET/POST /register` - Registrar nuevo usuario
- `GET /logout` - Cerrar sesión

### Dashboard
- `GET /` - Redirige al dashboard
- `GET /dashboard` - Dashboard principal

### Usuarios
- `GET /users` - Lista de usuarios (Admin)
- `GET/POST /users/edit/<id>` - Editar usuario
- `POST /users/delete/<id>` - Eliminar usuario (Admin)

### Panel de Administración
- `GET /admin` - Dashboard de administración
- `GET /admin/system_info` - Información del sistema (Admin)

### Productos
- `GET /admin/products` - Lista de productos
- `GET/POST /admin/products/create` - Crear producto (Admin)
- `GET/POST /admin/products/edit/<id>` - Editar producto
- `POST /admin/products/delete/<id>` - Eliminar producto (Admin)

### Proveedores
- `GET /admin/suppliers` - Lista de proveedores (Admin)
- `GET/POST /admin/suppliers/create` - Crear proveedor (Admin)
- `GET/POST /admin/suppliers/edit/<id>` - Editar proveedor (Admin)
- `POST /admin/suppliers/delete/<id>` - Eliminar proveedor (Admin)

---

##  Tecnologías Utilizadas

### Backend
- **Flask 3.0** - Framework web minimalista
- **Flask-SQLAlchemy 3.1** - ORM para base de datos
- **Werkzeug** - Utilidades WSGI y seguridad (Nos apoyamos con IA por motivo de presentación de proyecto)

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos y diseño responsive
- **JavaScript vanilla** - Interactividad

### Base de Datos
- **SQLite** - Base de datos embebida

### Arquitectura
- **MVC** (Model-View-Controller)
- **Repo & Factory Patterns** (Design Patterns)
- **SOLID Principles** (SRP, OCP, DIP)
- **Clean Code** principles
- **RESTful** routing patterns



## 🔒 Seguridad (Apoyo de documentación + IA)

- ✅ Contraseñas hasheadas con Werkzeug
- ✅ Protección de rutas con decoradores
- ✅ Validación de roles en cada acción
- ✅ Sesiones seguras de Flask
- ✅ Prevención de SQL Injection (SQLAlchemy ORM)





##  Autor

**Sebastian Cadena **

Sebastian Cadena

- GitHub: [@JuanSCadena](https://github.com/JuanSCadena)
- Email: js.cadenawork@outlook.com

---

##  Agradecimientos

- Flask Documentation
- SQLAlchemy Documentation
- Comunidad de Python

---

