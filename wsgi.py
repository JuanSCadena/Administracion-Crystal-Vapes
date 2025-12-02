from app import create_app

# Cambiamos el nombre de la variable para evitar conflictos con la carpeta 'app'
application = create_app()

if __name__ == "__main__":
    application.run()


   