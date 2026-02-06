# Discord Block Builder 🚀

Una herramienta visual para construir bots de Discord sin escribir código. ¡Usa bloques como en Scratch!

## 📋 Características Completas

### 🏗️ **Núcleo y Configuración**
- **Iniciar Cliente**: Configura tu bot con token
- **Presencia Dinámica**: "Jugando a...", "Transmitiendo...", "Escuchando..."
- **Estado del Bot**: Online, Invisible, No molestar, Ausente
- **Gestión de Sharding**: Para bots en miles de servidores

### ⚡ **El Motor de Eventos (Triggers)**
- Al Iniciar (Ready)
- Mensajes: Al recibir, editar, borrar, borrar en masa
- Miembros: Cuando entra, sale, se actualiza
- Reacciones: Al añadir o quitar
- Interacciones: Comandos, botones, menús, formularios
- Servidor: Al entrar/salir, cambios
- Canales: Crear, borrar, editar
- Voz: Unirse, salir, silenciar, ensordecer

### 💬 **Mensajería Avanzada**
- Mensaje Simple
- **Editor de Embeds Completo**:
  - Título y URL
  - Descripción (Markdown)
  - Color (Hex)
  - Autor (Nombre, Icono, Link)
  - Campos (Inline o bloque)
  - Thumbnail e Imagen Grande
  - Footer y Timestamp
- Archivos: Subir imágenes, archivos de texto
- Acciones: Reaccionar, Responder, Editar, Borrar

### 🔘 **Interacciones Modernas (Componentes UI)**
- **Slash Commands**: Comandos con barra diagonal (/)
- **Botones**: Primario, Secundario, Éxito, Peligro, Link
- **Menús de Selección**:
  - De texto (String select)
  - De Usuarios, Roles, Canales, Mencionables
- **Modales (Formularios)**: Ventanas emergentes con campos

### 🛡️ **Moderación y Seguridad**
- Expulsar (Kick) con razón
- Banear/Desbanear permanente o temporal
- Aislamiento (Timeout)
- Gestión de Apodos
- Limpieza (Prune) de mensajes

### 👥 **Gestión de Miembros y Roles**
- Crear, borrar, editar posición de roles
- Cambiar colores y permisos
- Asignar/Quitar roles a usuarios
- Verificar permisos (¿Tiene Administrador?)

### 📂 **Gestión de Canales y Servidores**
- Crear canales de texto, voz, categorías, foros
- Permisos de canal: Bloquear, ocultar
- Hilos (Threads): Públicos, privados, unirse/salirse
- Invitaciones: Crear y borrar

### 🔊 **Audio y Voz (Voice Engine)**
- Conexión a canales de voz
- Reproducción de archivos locales
- Controles: Pausar, reanudar, saltar, volumen

### 📊 **Almacenamiento y Datos (Database Lite)**
- **Variables de Usuario**: dinero, nivel, XP
- **Variables de Servidor**: prefijo, canal de logs
- **Variables Globales**: Datos persistentes
- **Almacenamiento en JSON** para facilitar mantenimiento

### ⚙️ **Utilidades y Lógica (Standard Blocks)**
- Condicionales: Si/Entonces/Si no
- Bucles: Repetir X veces, Por cada miembro, Por cada servidor
- Matemáticas: Sumar, restar, azar (Random), comparaciones
- Tiempo: Esperar, Ejecutar cada X tiempo
- API Externa: Peticiones HTTP (GET/POST)

## 🛠️ Instalación

1. Clone o descargue el proyecto
2. Instale dependencias:
```bash
npm install
```

3. Inicie el servidor:
```bash
node server.js
```

4. Abra en su navegador:
```
http://localhost:3000
```

## 📁 Estructura de Archivos

```
discord-block-builder/
├── index.html          # Interfaz visual
├── blocks.js           # Definición de bloques
├── generator.js        # Generador de código JavaScript
├── server.js           # Servidor Express
├── package.json        # Dependencias
├── README.md          # Este archivo
└── data/              # Almacenamiento JSON
    ├── users.json     # Datos de usuarios
    ├── guilds.json    # Datos de servidores
    └── global.json    # Datos globales
```

## 🎯 Cómo Usar

1. **Arrastra bloques** desde la barra lateral izquierda
2. **Conecta bloques** entre sí para crear tu lógica
3. **Personaliza** parámetros en cada bloque
4. **Haz clic en "Lanzar a la Nube"** para desplegar tu bot

## 📚 Categorías de Bloques

| Emoji | Categoría | Colores |
|-------|-----------|---------|
| 🏗️ | Núcleo y Config | Púrpura |
| ⚡ | Eventos | Turquesa |
| 💬 | Mensajería | Rojo |
| 🔘 | Interacciones | Rojo |
| 🛡️ | Moderación | Naranja |
| 👥 | Miembros y Roles | Verde |
| 📂 | Canales y Servidores | Amarillo |
| 🔊 | Voz y Audio | Púrpura |
| 📊 | Datos | Azul |
| ⚙️ | Lógica y Utilidades | Naranja |

## 💾 Datos Persistentes

Los datos se guardan automáticamente en archivos JSON:

- **users.json**: Almacena variables por usuario
- **guilds.json**: Almacena configuración por servidor
- **global.json**: Almacena variables globales

## 🔐 Seguridad

⚠️ **IMPORTANTE**: Nunca compartas tu token de bot. Mantenlo privado.

## 📞 Soporte

Si encuentras errores o tienes sugerencias, por favor abre un issue.

## 📄 Licencia

MIT

---

**¡Disfruta construyendo tu bot! 🎉**
