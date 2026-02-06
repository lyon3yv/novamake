Blockly.common.defineBlocksWithJsonArray([
  // ===== 🏗️ NÚCLEO Y CONFIGURACIÓN =====
  {
    "type": "bot_setup",
    "message0": "🌟 Mi Bot %1 Token: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "TOKEN", "check": "String" }
    ],
    "colour": "#6C5CE7",
    "nextStatement": null
  },
  {
    "type": "token_input",
    "message0": "🔑 %1",
    "args0": [{ "type": "field_input", "name": "TEXT", "text": "token_secreto" }],
    "output": "String",
    "colour": "#A29BFE"
  },
  {
    "type": "startup_block",
    "message0": "🔰 Inicio (no eliminar)",
    "message1": "Configuración: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "colour": "#6C5CE7",
    "deletable": false,
    "movable": false,
    "tooltip": "Bloque inicial. No se puede borrar ni mover. Coloca aquí la configuración inicial."
  },
  {
    "type": "dynamic_presence",
    "message0": "🎮 Establecer Presencia %1 Estado: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "STATE", "options": [["Jugando a...", "PLAYING"], ["Transmitiendo...", "STREAMING"], ["Escuchando...", "LISTENING"], ["Viendo...", "WATCHING"]] }
    ],
    "message1": "Texto: %1",
    "args1": [{ "type": "input_value", "name": "TEXT", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#6C5CE7"
  },
  {
    "type": "bot_status",
    "message0": "🟢 Estado del Bot: %1",
    "args0": [{ "type": "field_dropdown", "name": "STATUS", "options": [["Online", "online"], ["Invisible", "invisible"], ["No molestar", "dnd"], ["Ausente", "idle"]] }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#6C5CE7"
  },
  {
    "type": "sharding_config",
    "message0": "⚙️ Configurar Sharding %1 Total de Shards: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "SHARDS", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#6C5CE7"
  },

  // ===== ⚡ EL MOTOR DE EVENTOS =====
  {
    "type": "event_on_ready",
    "message0": "🟢 Al encenderse",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_on_message",
    "message0": "📩 Al recibir mensaje",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_on_message_edit",
    "message0": "✏️ Al editar mensaje",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_on_message_delete",
    "message0": "🗑️ Al borrar mensaje",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_on_bulk_delete",
    "message0": "📭 Al borrar en masa",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_member_join",
    "message0": "👋 Al unirse un miembro",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_member_leave",
    "message0": "👋 Al salir un miembro",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_member_update",
    "message0": "📝 Al actualizar miembro (rol/apodo)",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_reaction_add",
    "message0": "😊 Al añadir reacción",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_reaction_remove",
    "message0": "😢 Al quitar reacción",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_interaction",
    "message0": "🔘 Al usar interacción (comando/botón/menú)",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_guild_join",
    "message0": "🏠 Al entrar a un servidor",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_guild_leave",
    "message0": "🚪 Al salir de un servidor",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_guild_update",
    "message0": "🔄 Al actualizar servidor (nombre/icono)",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_channel_create",
    "message0": "➕ Al crear canal",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_channel_delete",
    "message0": "➖ Al borrar canal",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_channel_update",
    "message0": "✏️ Al editar canal",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_voice_join",
    "message0": "🎤 Al unirse a voz",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_voice_leave",
    "message0": "🔊 Al salir de voz",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },
  {
    "type": "event_voice_mute",
    "message0": "🔇 Al silenciarse en voz",
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00CEC9"
  },

  // ===== 💬 MENSAJERÍA AVANZADA =====
  {
    "type": "send_simple_message",
    "message0": "📝 Enviar texto %1",
    "args0": [{ "type": "input_value", "name": "CONTENT", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "create_embed",
    "message0": "🖼️ Crear Embed %1 Título: %2 Color: %3 Texto: %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "TITLE", "check": "String" },
      { "type": "field_input", "name": "COLOR", "text": "#6C5CE7" },
      { "type": "input_value", "name": "DESC", "check": "String" }
    ],
    "output": null,
    "colour": "#FF7675"
  },
  {
    "type": "embed_author",
    "message0": "👤 Autor: Nombre: %1 Icono: %2 Link: %3",
    "args0": [
      { "type": "input_value", "name": "NAME", "check": "String" },
      { "type": "input_value", "name": "ICON", "check": "String" },
      { "type": "input_value", "name": "URL", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "embed_field",
    "message0": "📋 Campo: %1 Valor: %2 Inline: %3",
    "args0": [
      { "type": "input_value", "name": "NAME", "check": "String" },
      { "type": "input_value", "name": "VALUE", "check": "String" },
      { "type": "field_checkbox", "name": "INLINE", "checked": false }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "embed_thumbnail",
    "message0": "🖼️ Thumbnail: %1",
    "args0": [{ "type": "input_value", "name": "URL", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "embed_image",
    "message0": "🖼️ Imagen Grande: %1",
    "args0": [{ "type": "input_value", "name": "URL", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "embed_footer",
    "message0": "📄 Footer: %1 Icono: %2",
    "args0": [
      { "type": "input_value", "name": "TEXT", "check": "String" },
      { "type": "input_value", "name": "ICON", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "embed_timestamp",
    "message0": "🕐 Timestamp: Ahora",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "send_file",
    "message0": "📁 Enviar archivo %1",
    "args0": [{ "type": "input_value", "name": "PATH", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "reaction_add",
    "message0": "😊 Reaccionar con emoji %1",
    "args0": [{ "type": "input_value", "name": "EMOJI", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "message_reply",
    "message0": "💬 Responder a mensaje %1",
    "args0": [{ "type": "input_value", "name": "CONTENT", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "message_edit",
    "message0": "✏️ Editar mi mensaje %1",
    "args0": [{ "type": "input_value", "name": "CONTENT", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "message_delete",
    "message0": "🗑️ Borrar mensaje",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },

  // ===== 🔘 INTERACCIONES MODERNAS =====
  {
    "type": "slash_command_creator",
    "message0": "⚡ Comando / %1",
    "args0": [{ "type": "field_input", "name": "NAME", "text": "hola" }],
    "message1": "Hacer: %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "interaction_reply",
    "message0": "💬 Responder %1",
    "args0": [{ "type": "input_value", "name": "CONTENT", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },
  {
    "type": "button_create",
    "message0": "🔘 Botón %1 Etiqueta: %2 Estilo: %3",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "LABEL", "check": "String" },
      { "type": "field_dropdown", "name": "STYLE", "options": [["Primario (Azul)", "Primary"], ["Secundario (Gris)", "Secondary"], ["Éxito (Verde)", "Success"], ["Peligro (Rojo)", "Danger"], ["Link", "Link"]] }
    ],
    "output": null,
    "colour": "#FF7675"
  },
  {
    "type": "menu_string_select",
    "message0": "📋 Menú de Selección %1 Placeholder: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "PLACEHOLDER", "check": "String" }
    ],
    "message1": "Opciones: %1",
    "args1": [{ "type": "input_statement", "name": "OPTIONS" }],
    "output": null,
    "colour": "#FF7675"
  },
  {
    "type": "menu_user_select",
    "message0": "👤 Menú de Usuarios %1 Placeholder: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "PLACEHOLDER", "check": "String" }
    ],
    "output": null,
    "colour": "#FF7675"
  },
  {
    "type": "menu_role_select",
    "message0": "🏅 Menú de Roles %1 Placeholder: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "PLACEHOLDER", "check": "String" }
    ],
    "output": null,
    "colour": "#FF7675"
  },
  {
    "type": "menu_channel_select",
    "message0": "📢 Menú de Canales %1 Placeholder: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "PLACEHOLDER", "check": "String" }
    ],
    "output": null,
    "colour": "#FF7675"
  },
  {
    "type": "menu_mentionable_select",
    "message0": "@️ Menú Mencionables %1 Placeholder: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "PLACEHOLDER", "check": "String" }
    ],
    "output": null,
    "colour": "#FF7675"
  },
  {
    "type": "modal_create",
    "message0": "📝 Crear Modal %1 Título: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "TITLE", "check": "String" }
    ],
    "message1": "Campos: %1",
    "args1": [{ "type": "input_statement", "name": "FIELDS" }],
    "output": null,
    "colour": "#FF7675"
  },
  {
    "type": "modal_text_input",
    "message0": "📄 Campo de Texto %1 Label: %2 Placeholder: %3",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "LABEL", "check": "String" },
      { "type": "input_value", "name": "PLACEHOLDER", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF7675"
  },

  // ===== 🛡️ MODERACIÓN Y SEGURIDAD =====
  {
    "type": "kick_member",
    "message0": "👢 Expulsar usuario %1 Razón: %2",
    "args0": [
      { "type": "input_value", "name": "USER", "check": "String" },
      { "type": "input_value", "name": "REASON", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E17055"
  },
  {
    "type": "ban_member",
    "message0": "🚫 Banear usuario %1 Razón: %2 Días a borrar: %3",
    "args0": [
      { "type": "input_value", "name": "USER", "check": "String" },
      { "type": "input_value", "name": "REASON", "check": "String" },
      { "type": "input_value", "name": "DAYS", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E17055"
  },
  {
    "type": "unban_member",
    "message0": "✅ Desbanear usuario %1",
    "args0": [{ "type": "input_value", "name": "USER", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E17055"
  },
  {
    "type": "timeout_member",
    "message0": "🔇 Aislamiento (Timeout) %1 Duración: %2 minutos",
    "args0": [
      { "type": "input_value", "name": "USER", "check": "String" },
      { "type": "input_value", "name": "MINUTES", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E17055"
  },
  {
    "type": "nickname_change",
    "message0": "📝 Cambiar apodo de %1 a %2",
    "args0": [
      { "type": "input_value", "name": "USER", "check": "String" },
      { "type": "input_value", "name": "NICKNAME", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E17055"
  },
  {
    "type": "prune_messages",
    "message0": "🧹 Limpiar %1 mensajes",
    "args0": [{ "type": "input_value", "name": "AMOUNT", "check": "Number" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E17055"
  },

  // ===== 👥 GESTIÓN DE MIEMBROS Y ROLES =====
  {
    "type": "role_create",
    "message0": "🏅 Crear rol %1 Nombre: %2 Color: %3",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "NAME", "check": "String" },
      { "type": "field_input", "name": "COLOR", "text": "#6C5CE7" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00B894"
  },
  {
    "type": "role_delete",
    "message0": "🗑️ Borrar rol %1",
    "args0": [{ "type": "input_value", "name": "ROLE", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00B894"
  },
  {
    "type": "role_edit",
    "message0": "✏️ Editar rol %1 Nueva posición: %2",
    "args0": [
      { "type": "input_value", "name": "ROLE", "check": "String" },
      { "type": "input_value", "name": "POSITION", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00B894"
  },
  {
    "type": "role_assign",
    "message0": "✅ Asignar rol %1 a usuario %2",
    "args0": [
      { "type": "input_value", "name": "ROLE", "check": "String" },
      { "type": "input_value", "name": "USER", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00B894"
  },
  {
    "type": "role_remove",
    "message0": "❌ Quitar rol %1 a usuario %2",
    "args0": [
      { "type": "input_value", "name": "ROLE", "check": "String" },
      { "type": "input_value", "name": "USER", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#00B894"
  },
  {
    "type": "permission_check",
    "message0": "🔐 ¿Usuario %1 tiene permiso %2?",
    "args0": [
      { "type": "input_value", "name": "USER", "check": "String" },
      { "type": "field_dropdown", "name": "PERMISSION", "options": [["Administrador", "ADMINISTRATOR"], ["Moderador", "MANAGE_GUILD"], ["Banear", "BAN_MEMBERS"], ["Expulsar", "KICK_MEMBERS"]] }
    ],
    "output": "Boolean",
    "colour": "#00B894"
  },

  // ===== 📂 GESTIÓN DE CANALES Y SERVIDORES =====
  {
    "type": "channel_create",
    "message0": "➕ Crear canal %1 Nombre: %2 Tipo: %3",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "NAME", "check": "String" },
      { "type": "field_dropdown", "name": "TYPE", "options": [["Texto", "GUILD_TEXT"], ["Voz", "GUILD_VOICE"], ["Categoría", "GUILD_CATEGORY"], ["Forum", "GUILD_FORUM"]] }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F39C12"
  },
  {
    "type": "channel_delete",
    "message0": "🗑️ Borrar canal %1",
    "args0": [{ "type": "input_value", "name": "CHANNEL", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F39C12"
  },
  {
    "type": "channel_edit",
    "message0": "✏️ Editar canal %1 Nuevo nombre: %2",
    "args0": [
      { "type": "input_value", "name": "CHANNEL", "check": "String" },
      { "type": "input_value", "name": "NAME", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F39C12"
  },
  {
    "type": "channel_permission_lock",
    "message0": "🔒 Bloquear canal %1 para rol %2",
    "args0": [
      { "type": "input_value", "name": "CHANNEL", "check": "String" },
      { "type": "input_value", "name": "ROLE", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F39C12"
  },
  {
    "type": "channel_permission_hide",
    "message0": "👁️ Ocultar canal %1 para rol %2",
    "args0": [
      { "type": "input_value", "name": "CHANNEL", "check": "String" },
      { "type": "input_value", "name": "ROLE", "check": "String" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F39C12"
  },
  {
    "type": "thread_create",
    "message0": "🧵 Crear hilo %1 Nombre: %2 Privado: %3",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_value", "name": "NAME", "check": "String" },
      { "type": "field_checkbox", "name": "PRIVATE", "checked": false }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F39C12"
  },
  {
    "type": "thread_join",
    "message0": "➕ Unirse a hilo %1",
    "args0": [{ "type": "input_value", "name": "THREAD", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F39C12"
  },
  {
    "type": "thread_leave",
    "message0": "❌ Salir de hilo %1",
    "args0": [{ "type": "input_value", "name": "THREAD", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F39C12"
  },
  {
    "type": "invite_create",
    "message0": "🔗 Crear invitación para canal %1",
    "args0": [{ "type": "input_value", "name": "CHANNEL", "check": "String" }],
    "output": "String",
    "colour": "#F39C12"
  },
  {
    "type": "invite_delete",
    "message0": "🔗 Borrar invitación %1",
    "args0": [{ "type": "input_value", "name": "INVITE", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#F39C12"
  },

  // ===== 🔊 AUDIO Y VOZ =====
  {
    "type": "voice_connect",
    "message0": "🎤 Conectar a canal de voz %1",
    "args0": [{ "type": "input_value", "name": "CHANNEL", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6"
  },
  {
    "type": "voice_disconnect",
    "message0": "🔊 Desconectar de voz",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6"
  },
  {
    "type": "voice_play",
    "message0": "▶️ Reproducir audio %1",
    "args0": [{ "type": "input_value", "name": "FILE", "check": "String" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6"
  },
  {
    "type": "voice_pause",
    "message0": "⏸️ Pausar audio",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6"
  },
  {
    "type": "voice_resume",
    "message0": "▶️ Reanudar audio",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6"
  },
  {
    "type": "voice_skip",
    "message0": "⏭️ Saltar canción",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6"
  },
  {
    "type": "voice_volume",
    "message0": "🔊 Ajustar volumen a %1%",
    "args0": [{ "type": "input_value", "name": "VOLUME", "check": "Number" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#9B59B6"
  },

  // ===== 📊 ALMACENAMIENTO Y DATOS =====
  {
    "type": "user_var_set",
    "message0": "💾 Guardar usuario %1 Variable %2 = %3",
    "args0": [
      { "type": "input_value", "name": "USER", "check": "String" },
      { "type": "field_input", "name": "VARNAME", "text": "dinero" },
      { "type": "input_value", "name": "VALUE", "check": null }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3498DB"
  },
  {
    "type": "user_var_get",
    "message0": "📖 Obtener usuario %1 Variable %2",
    "args0": [
      { "type": "input_value", "name": "USER", "check": "String" },
      { "type": "field_input", "name": "VARNAME", "text": "dinero" }
    ],
    "output": null,
    "colour": "#3498DB"
  },
  {
    "type": "guild_var_set",
    "message0": "💾 Guardar servidor Variable %1 = %2",
    "args0": [
      { "type": "field_input", "name": "VARNAME", "text": "prefijo" },
      { "type": "input_value", "name": "VALUE", "check": null }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3498DB"
  },
  {
    "type": "guild_var_get",
    "message0": "📖 Obtener servidor Variable %1",
    "args0": [{ "type": "field_input", "name": "VARNAME", "text": "prefijo" }],
    "output": null,
    "colour": "#3498DB"
  },
  {
    "type": "global_var_set",
    "message0": "💾 Guardar global Variable %1 = %2",
    "args0": [
      { "type": "field_input", "name": "VARNAME", "text": "contador" },
      { "type": "input_value", "name": "VALUE", "check": null }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3498DB"
  },
  {
    "type": "global_var_get",
    "message0": "📖 Obtener global Variable %1",
    "args0": [{ "type": "field_input", "name": "VARNAME", "text": "contador" }],
    "output": null,
    "colour": "#3498DB"
  },

  // ===== ⚙️ UTILIDADES Y LÓGICA =====
  {
    "type": "text_input",
    "message0": "\" %1 \"",
    "args0": [{ "type": "field_input", "name": "TEXT", "text": "Hola!" }],
    "output": "String",
    "colour": "#FAB1A0"
  },
  {
    "type": "number_input",
    "message0": "# %1",
    "args0": [{ "type": "field_number", "name": "NUM", "value": 0 }],
    "output": "Number",
    "colour": "#FAB1A0"
  },
  {
    "type": "math_random",
    "message0": "🎲 Número aleatorio entre %1 y %2",
    "args0": [
      { "type": "input_value", "name": "MIN", "check": "Number" },
      { "type": "input_value", "name": "MAX", "check": "Number" }
    ],
    "output": "Number",
    "colour": "#FAB1A0"
  },
  {
    "type": "math_operation",
    "message0": "%1 %2 %3",
    "args0": [
      { "type": "input_value", "name": "A", "check": "Number" },
      { "type": "field_dropdown", "name": "OP", "options": [["+", "ADD"], ["-", "MINUS"], ["*", "MULTIPLY"], ["/", "DIVIDE"], ["^", "POWER"]] },
      { "type": "input_value", "name": "B", "check": "Number" }
    ],
    "output": "Number",
    "colour": "#4D89F7",
    "tooltip": "Operación matemática: suma, resta, multiplicación, división o potencia",
    "inputsInline": true
  },
  {
    "type": "logic_compare",
    "message0": "%1 %2 %3",
    "args0": [
      { "type": "input_value", "name": "A" },
      { "type": "field_dropdown", "name": "OP", "options": [["=", "EQ"], ["!=", "NEQ"], ["<", "LT"], [">", "GT"], ["<=", "LTE"], [">=", "GTE"]] },
      { "type": "input_value", "name": "B" }
    ],
    "output": "Boolean",
    "colour": "#4D89F7",
    "tooltip": "Comparación entre dos valores",
    "inputsInline": true
  },
  {
    "type": "controls_if",
    "message0": "Si %1 Entonces %2",
    "args0": [
      { "type": "input_value", "name": "IF0", "check": "Boolean" },
      { "type": "input_statement", "name": "DO0" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#4D89F7",
    "tooltip": "Estructura condicional: si la condición es verdadera, ejecuta las acciones",
    "inputsInline": true
  },
  {
    "type": "controls_if_elseif",
    "message0": "🔀 Si %1 Si no, si %2",
    "args0": [
      { "type": "input_value", "name": "IF0", "check": "Boolean" },
      { "type": "input_value", "name": "IF1", "check": "Boolean" }
    ],
    "message1": "Hacer %1",
    "args1": [{ "type": "input_statement", "name": "DO0" }],
    "message2": "Si no hacer %1",
    "args2": [{ "type": "input_statement", "name": "DO1" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E67E22"
  },
  {
    "type": "controls_if_else",
    "message0": "🔀 Si %1 Si no",
    "args0": [{ "type": "input_value", "name": "IF0", "check": "Boolean" }],
    "message1": "Hacer %1",
    "args1": [{ "type": "input_statement", "name": "DO0" }],
    "message2": "Si no hacer %1",
    "args2": [{ "type": "input_statement", "name": "DO1" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E67E22"
  },
  {
    "type": "controls_repeat",
    "message0": "🔄 Repetir %1 veces",
    "args0": [{ "type": "input_value", "name": "TIMES", "check": "Number" }],
    "message1": "Hacer %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E67E22"
  },
  {
    "type": "controls_for_each_member",
    "message0": "🔄 Por cada miembro",
    "message1": "Hacer %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E67E22"
  },
  {
    "type": "controls_for_each_guild",
    "message0": "🔄 Por cada servidor",
    "message1": "Hacer %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E67E22"
  },
  {
    "type": "wait_ms",
    "message0": "⏱️ Esperar %1 milisegundos",
    "args0": [{ "type": "input_value", "name": "MS", "check": "Number" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E67E22"
  },
  {
    "type": "interval_execute",
    "message0": "🔄 Ejecutar cada %1 segundos",
    "args0": [{ "type": "input_value", "name": "SECONDS", "check": "Number" }],
    "message1": "Hacer %1",
    "args1": [{ "type": "input_statement", "name": "DO" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#E67E22"
  },
  {
    "type": "api_request",
    "message0": "🌐 Petición HTTP %1 URL: %2",
    "args0": [
      { "type": "field_dropdown", "name": "METHOD", "options": [["GET", "GET"], ["POST", "POST"], ["PUT", "PUT"], ["DELETE", "DELETE"]] },
      { "type": "input_value", "name": "URL", "check": "String" }
    ],
    "message1": "Datos: %1",
    "args1": [{ "type": "input_value", "name": "DATA", "check": "String" }],
    "output": null,
    "colour": "#E67E22"
  },

  // ===== 🔍 OBTENER IDS Y NOMBRES =====
  {
    "type": "get_channel_id",
    "message0": "📢 ID del canal %1",
    "args0": [{ "type": "input_value", "name": "CHANNEL", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_channel_name",
    "message0": "📢 Nombre del canal %1",
    "args0": [{ "type": "input_value", "name": "CHANNEL", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_role_id",
    "message0": "🏅 ID del rol %1",
    "args0": [{ "type": "input_value", "name": "ROLE", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_role_name",
    "message0": "🏅 Nombre del rol %1",
    "args0": [{ "type": "input_value", "name": "ROLE", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_user_id_numeric",
    "message0": "👤 ID numérico del usuario %1",
    "args0": [{ "type": "input_value", "name": "USER", "check": "String" }],
    "output": "Number",
    "colour": "#16A085"
  },
  {
    "type": "get_user_id_string",
    "message0": "👤 ID de usuario %1",
    "args0": [{ "type": "input_value", "name": "USER", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_user_mention",
    "message0": "👤 Mencionar usuario %1",
    "args0": [{ "type": "input_value", "name": "USER", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_user_name",
    "message0": "👤 Nombre del usuario %1",
    "args0": [{ "type": "input_value", "name": "USER", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_user_username",
    "message0": "👤 Username del usuario %1",
    "args0": [{ "type": "input_value", "name": "USER", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_guild_id_numeric",
    "message0": "🏠 ID numérico del servidor %1",
    "args0": [{ "type": "input_value", "name": "GUILD", "check": "String" }],
    "output": "Number",
    "colour": "#16A085"
  },
  {
    "type": "get_guild_id_string",
    "message0": "🏠 ID del servidor %1",
    "args0": [{ "type": "input_value", "name": "GUILD", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_guild_name",
    "message0": "🏠 Nombre del servidor %1",
    "args0": [{ "type": "input_value", "name": "GUILD", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_message_author_id",
    "message0": "📧 ID del autor del mensaje",
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_message_author_name",
    "message0": "📧 Nombre del autor del mensaje",
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_interaction_user_id",
    "message0": "🔘 ID del usuario de interacción",
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_interaction_user_name",
    "message0": "🔘 Nombre del usuario de interacción",
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_member_id",
    "message0": "👥 ID del miembro %1",
    "args0": [{ "type": "input_value", "name": "MEMBER", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  },
  {
    "type": "get_member_name",
    "message0": "👥 Nombre del miembro %1",
    "args0": [{ "type": "input_value", "name": "MEMBER", "check": "String" }],
    "output": "String",
    "colour": "#16A085"
  }
]);