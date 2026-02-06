const gen = javascript.javascriptGenerator;

// ===== 🏗️ NÚCLEO Y CONFIGURACIÓN =====
gen.forBlock['bot_setup'] = function(block) {
  const token = gen.valueToCode(block, 'TOKEN', gen.ORDER_ATOMIC) || "''";
  return `const { Client, GatewayIntentBits, EmbedBuilder, Collection } = require('discord.js');\nconst fs = require('fs');\n// voice utilities (requires @discordjs/voice installed)\nconst { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');\n\n// Ensure data folder and JSON files exist to avoid crashes in VPS\nif(!fs.existsSync('./data')) fs.mkdirSync('./data', { recursive: true });\nif(!fs.existsSync('./data/users.json')) fs.writeFileSync('./data/users.json', JSON.stringify({}));\nif(!fs.existsSync('./data/guilds.json')) fs.writeFileSync('./data/guilds.json', JSON.stringify({}));\nif(!fs.existsSync('./data/global.json')) fs.writeFileSync('./data/global.json', JSON.stringify({}));\n\n// Fetch compatibility: Node 18+ has fetch; otherwise try dynamic import of node-fetch\nif (typeof fetch === 'undefined') {\n  try {\n    global.fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));\n  } catch (e) {\n    console.warn('Fetch is not available. Please run Node 18+ or install node-fetch');\n  }\n}\n\nconst client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates] });\n\nclient.login(${token});\n\n`;
};

gen.forBlock['token_input'] = function(block) {
  return ["'" + block.getFieldValue('TEXT') + "'", gen.ORDER_ATOMIC];
};

gen.forBlock['startup_block'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `// --- Bloque Inicial (no eliminar) ---\n${branch}`;
};

gen.forBlock['dynamic_presence'] = function(block) {
  const state = block.getFieldValue('STATE');
  const text = gen.valueToCode(block, 'TEXT', gen.ORDER_ATOMIC) || "''";
  return `client.user.setPresence({ activities: [{ name: ${text}, type: '${state}' }], status: 'online' });\n`;
};

gen.forBlock['bot_status'] = function(block) {
  const status = block.getFieldValue('STATUS');
  return `client.user.setStatus('${status}');\n`;
};

gen.forBlock['sharding_config'] = function(block) {
  const shards = gen.valueToCode(block, 'SHARDS', gen.ORDER_ATOMIC) || "0";
  return `// Sharding configurado con ${shards} shards\n`;
};

// ===== ⚡ EL MOTOR DE EVENTOS =====
gen.forBlock['event_on_ready'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.once('ready', () => {\n  console.log('Bot Online!');\n${branch}});\n`;
};

gen.forBlock['event_on_message'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('messageCreate', async (message) => {\n  if(message.author.bot) return;\n${branch}});\n`;
};

gen.forBlock['event_on_message_edit'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('messageUpdate', async (oldMessage, newMessage) => {\n${branch}});\n`;
};

gen.forBlock['event_on_message_delete'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('messageDelete', async (message) => {\n${branch}});\n`;
};

gen.forBlock['event_on_bulk_delete'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('bulkMessageDelete', async (messages) => {\n${branch}});\n`;
};

gen.forBlock['event_member_join'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('guildMemberAdd', async (member) => {\n${branch}});\n`;
};

gen.forBlock['event_member_leave'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('guildMemberRemove', async (member) => {\n${branch}});\n`;
};

gen.forBlock['event_member_update'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('guildMemberUpdate', async (oldMember, newMember) => {\n${branch}});\n`;
};

gen.forBlock['event_reaction_add'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('messageReactionAdd', async (reaction, user) => {\n${branch}});\n`;
};

gen.forBlock['event_reaction_remove'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('messageReactionRemove', async (reaction, user) => {\n${branch}});\n`;
};

gen.forBlock['event_interaction'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('interactionCreate', async (interaction) => {\n${branch}});\n`;
};

gen.forBlock['event_guild_join'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('guildCreate', async (guild) => {\n${branch}});\n`;
};

gen.forBlock['event_guild_leave'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('guildDelete', async (guild) => {\n${branch}});\n`;
};

gen.forBlock['event_guild_update'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('guildUpdate', async (oldGuild, newGuild) => {\n${branch}});\n`;
};

gen.forBlock['event_channel_create'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('channelCreate', async (channel) => {\n${branch}});\n`;
};

gen.forBlock['event_channel_delete'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('channelDelete', async (channel) => {\n${branch}});\n`;
};

gen.forBlock['event_channel_update'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('channelUpdate', async (oldChannel, newChannel) => {\n${branch}});\n`;
};

gen.forBlock['event_voice_join'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('voiceStateUpdate', async (oldState, newState) => {\n  if(!oldState.channel && newState.channel) {\n${branch}  }\n});\n`;
};

gen.forBlock['event_voice_leave'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('voiceStateUpdate', async (oldState, newState) => {\n  if(oldState.channel && !newState.channel) {\n${branch}  }\n});\n`;
};

gen.forBlock['event_voice_mute'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('voiceStateUpdate', async (oldState, newState) => {\n  if(oldState.mute !== newState.mute) {\n${branch}  }\n});\n`;
};

// ===== 💬 MENSAJERÍA AVANZADA =====
gen.forBlock['send_simple_message'] = function(block) {
  const content = gen.valueToCode(block, 'CONTENT', gen.ORDER_ATOMIC) || "''";
  return `    await message.channel.send(${content});\n`;
};

gen.forBlock['create_embed'] = function(block) {
  const title = gen.valueToCode(block, 'TITLE', gen.ORDER_ATOMIC) || "''";
  const color = block.getFieldValue('COLOR');
  const desc = gen.valueToCode(block, 'DESC', gen.ORDER_ATOMIC) || "''";
  const code = `new EmbedBuilder().setTitle(${title}).setColor('${color}').setDescription(${desc})`;
  return [code, gen.ORDER_ATOMIC];
};

gen.forBlock['embed_author'] = function(block) {
  const name = gen.valueToCode(block, 'NAME', gen.ORDER_ATOMIC) || "''";
  const icon = gen.valueToCode(block, 'ICON', gen.ORDER_ATOMIC) || "''";
  const url = gen.valueToCode(block, 'URL', gen.ORDER_ATOMIC) || "''";
  return `  embed.setAuthor({ name: ${name}, iconURL: ${icon}, url: ${url} });\n`;
};

gen.forBlock['embed_field'] = function(block) {
  const name = gen.valueToCode(block, 'NAME', gen.ORDER_ATOMIC) || "''";
  const value = gen.valueToCode(block, 'VALUE', gen.ORDER_ATOMIC) || "''";
  const inline = block.getFieldValue('INLINE') === 'TRUE';
  return `  embed.addFields({ name: ${name}, value: ${value}, inline: ${inline} });\n`;
};

gen.forBlock['embed_thumbnail'] = function(block) {
  const url = gen.valueToCode(block, 'URL', gen.ORDER_ATOMIC) || "''";
  return `  embed.setThumbnail(${url});\n`;
};

gen.forBlock['embed_image'] = function(block) {
  const url = gen.valueToCode(block, 'URL', gen.ORDER_ATOMIC) || "''";
  return `  embed.setImage(${url});\n`;
};

gen.forBlock['embed_footer'] = function(block) {
  const text = gen.valueToCode(block, 'TEXT', gen.ORDER_ATOMIC) || "''";
  const icon = gen.valueToCode(block, 'ICON', gen.ORDER_ATOMIC) || "''";
  return `  embed.setFooter({ text: ${text}, iconURL: ${icon} });\n`;
};

gen.forBlock['embed_timestamp'] = function(block) {
  return `  embed.setTimestamp();\n`;
};

gen.forBlock['send_file'] = function(block) {
  const path = gen.valueToCode(block, 'PATH', gen.ORDER_ATOMIC) || "''";
  return `    await message.channel.send({ files: [${path}] });\n`;
};

gen.forBlock['reaction_add'] = function(block) {
  const emoji = gen.valueToCode(block, 'EMOJI', gen.ORDER_ATOMIC) || "''";
  return `    await message.react(${emoji});\n`;
};

gen.forBlock['message_reply'] = function(block) {
  const content = gen.valueToCode(block, 'CONTENT', gen.ORDER_ATOMIC) || "''";
  return `    await message.reply(${content});\n`;
};

gen.forBlock['message_edit'] = function(block) {
  const content = gen.valueToCode(block, 'CONTENT', gen.ORDER_ATOMIC) || "''";
  return `    await message.edit(${content});\n`;
};

gen.forBlock['message_delete'] = function(block) {
  return `    await message.delete();\n`;
};

// ===== 🔘 INTERACCIONES MODERNAS =====
gen.forBlock['slash_command_creator'] = function(block) {
  const name = block.getFieldValue('NAME');
  const branch = gen.statementToCode(block, 'DO');
  return `client.on('interactionCreate', async (interaction) => {\n  if (!interaction.isChatInputCommand()) return;\n  if (interaction.commandName === '${name}') {\n${branch}  }\n});\n`;
};

gen.forBlock['interaction_reply'] = function(block) {
  const content = gen.valueToCode(block, 'CONTENT', gen.ORDER_ATOMIC) || "''";
  return `    await interaction.reply(${content});\n`;
};

gen.forBlock['button_create'] = function(block) {
  const label = gen.valueToCode(block, 'LABEL', gen.ORDER_ATOMIC) || "''";
  const style = block.getFieldValue('STYLE');
  const code = `new ButtonBuilder().setLabel(${label}).setStyle('${style}').setCustomId('btn_' + Date.now())`;
  return [code, gen.ORDER_ATOMIC];
};

gen.forBlock['menu_string_select'] = function(block) {
  const placeholder = gen.valueToCode(block, 'PLACEHOLDER', gen.ORDER_ATOMIC) || "''";
  const options = gen.statementToCode(block, 'OPTIONS');
  const code = `new StringSelectMenuBuilder().setPlaceholder(${placeholder}).addOptions([${options}])`;
  return [code, gen.ORDER_ATOMIC];
};

gen.forBlock['menu_user_select'] = function(block) {
  const placeholder = gen.valueToCode(block, 'PLACEHOLDER', gen.ORDER_ATOMIC) || "''";
  const code = `new UserSelectMenuBuilder().setPlaceholder(${placeholder})`;
  return [code, gen.ORDER_ATOMIC];
};

gen.forBlock['menu_role_select'] = function(block) {
  const placeholder = gen.valueToCode(block, 'PLACEHOLDER', gen.ORDER_ATOMIC) || "''";
  const code = `new RoleSelectMenuBuilder().setPlaceholder(${placeholder})`;
  return [code, gen.ORDER_ATOMIC];
};

gen.forBlock['menu_channel_select'] = function(block) {
  const placeholder = gen.valueToCode(block, 'PLACEHOLDER', gen.ORDER_ATOMIC) || "''";
  const code = `new ChannelSelectMenuBuilder().setPlaceholder(${placeholder})`;
  return [code, gen.ORDER_ATOMIC];
};

gen.forBlock['menu_mentionable_select'] = function(block) {
  const placeholder = gen.valueToCode(block, 'PLACEHOLDER', gen.ORDER_ATOMIC) || "''";
  const code = `new MentionableSelectMenuBuilder().setPlaceholder(${placeholder})`;
  return [code, gen.ORDER_ATOMIC];
};

gen.forBlock['modal_create'] = function(block) {
  const title = gen.valueToCode(block, 'TITLE', gen.ORDER_ATOMIC) || "''";
  const fields = gen.statementToCode(block, 'FIELDS');
  const code = `new ModalBuilder().setTitle(${title}).setCustomId('modal_' + Date.now()).addComponents([${fields}])`;
  return [code, gen.ORDER_ATOMIC];
};

gen.forBlock['modal_text_input'] = function(block) {
  const label = gen.valueToCode(block, 'LABEL', gen.ORDER_ATOMIC) || "''";
  const placeholder = gen.valueToCode(block, 'PLACEHOLDER', gen.ORDER_ATOMIC) || "''";
  return `new TextInputBuilder().setLabel(${label}).setPlaceholder(${placeholder}).setStyle('Short'),`;
};

// ===== 🛡️ MODERACIÓN Y SEGURIDAD =====
gen.forBlock['kick_member'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  const reason = gen.valueToCode(block, 'REASON', gen.ORDER_ATOMIC) || "''";
  return `    await ${user}.kick(${reason});\n`;
};

gen.forBlock['ban_member'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  const reason = gen.valueToCode(block, 'REASON', gen.ORDER_ATOMIC) || "''";
  const days = gen.valueToCode(block, 'DAYS', gen.ORDER_ATOMIC) || "0";
  return `    await ${user}.ban({ reason: ${reason}, deleteMessageSeconds: ${days} * 86400 });\n`;
};

gen.forBlock['unban_member'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  return `    await interaction.guild.members.unban(${user});\n`;
};

gen.forBlock['timeout_member'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  const minutes = gen.valueToCode(block, 'MINUTES', gen.ORDER_ATOMIC) || "0";
  return `    await ${user}.timeout(${minutes} * 60000);\n`;
};

gen.forBlock['nickname_change'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  const nickname = gen.valueToCode(block, 'NICKNAME', gen.ORDER_ATOMIC) || "''";
  return `    await ${user}.setNickname(${nickname});\n`;
};

gen.forBlock['prune_messages'] = function(block) {
  const amount = gen.valueToCode(block, 'AMOUNT', gen.ORDER_ATOMIC) || "1";
  return `    await interaction.channel.bulkDelete(${amount});\n`;
};

// ===== 👥 GESTIÓN DE MIEMBROS Y ROLES =====
gen.forBlock['role_create'] = function(block) {
  const name = gen.valueToCode(block, 'NAME', gen.ORDER_ATOMIC) || "''";
  const color = block.getFieldValue('COLOR');
  return `    await interaction.guild.roles.create({ name: ${name}, color: '${color}' });\n`;
};

gen.forBlock['role_delete'] = function(block) {
  const role = gen.valueToCode(block, 'ROLE', gen.ORDER_ATOMIC) || "''";
  return `    await ${role}.delete();\n`;
};

gen.forBlock['role_edit'] = function(block) {
  const role = gen.valueToCode(block, 'ROLE', gen.ORDER_ATOMIC) || "''";
  const position = gen.valueToCode(block, 'POSITION', gen.ORDER_ATOMIC) || "0";
  return `    await ${role}.setPosition(${position});\n`;
};

gen.forBlock['role_assign'] = function(block) {
  const role = gen.valueToCode(block, 'ROLE', gen.ORDER_ATOMIC) || "''";
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  return `    await ${user}.roles.add(${role});\n`;
};

gen.forBlock['role_remove'] = function(block) {
  const role = gen.valueToCode(block, 'ROLE', gen.ORDER_ATOMIC) || "''";
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  return `    await ${user}.roles.remove(${role});\n`;
};

gen.forBlock['permission_check'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  const permission = block.getFieldValue('PERMISSION');
  return [`${user}.permissions.has('${permission}')`, gen.ORDER_ATOMIC];
};

// ===== 📂 GESTIÓN DE CANALES Y SERVIDORES =====
gen.forBlock['channel_create'] = function(block) {
  const name = gen.valueToCode(block, 'NAME', gen.ORDER_ATOMIC) || "''";
  const type = block.getFieldValue('TYPE');
  return `    await interaction.guild.channels.create({ name: ${name}, type: '${type}' });\n`;
};

gen.forBlock['channel_delete'] = function(block) {
  const channel = gen.valueToCode(block, 'CHANNEL', gen.ORDER_ATOMIC) || "''";
  return `    await ${channel}.delete();\n`;
};

gen.forBlock['channel_edit'] = function(block) {
  const channel = gen.valueToCode(block, 'CHANNEL', gen.ORDER_ATOMIC) || "''";
  const name = gen.valueToCode(block, 'NAME', gen.ORDER_ATOMIC) || "''";
  return `    await ${channel}.setName(${name});\n`;
};

gen.forBlock['channel_permission_lock'] = function(block) {
  const channel = gen.valueToCode(block, 'CHANNEL', gen.ORDER_ATOMIC) || "''";
  const role = gen.valueToCode(block, 'ROLE', gen.ORDER_ATOMIC) || "''";
  return `    await ${channel}.permissionOverwrites.create(${role}, { SendMessages: false });\n`;
};

gen.forBlock['channel_permission_hide'] = function(block) {
  const channel = gen.valueToCode(block, 'CHANNEL', gen.ORDER_ATOMIC) || "''";
  const role = gen.valueToCode(block, 'ROLE', gen.ORDER_ATOMIC) || "''";
  return `    await ${channel}.permissionOverwrites.create(${role}, { ViewChannel: false });\n`;
};

gen.forBlock['thread_create'] = function(block) {
  const name = gen.valueToCode(block, 'NAME', gen.ORDER_ATOMIC) || "''";
  const isPrivate = block.getFieldValue('PRIVATE') === 'TRUE';
  return `    await interaction.channel.threads.create({ name: ${name}, autoArchiveDuration: 60, type: '${isPrivate ? 'PRIVATE_THREAD' : 'PUBLIC_THREAD'}' });\n`;
};

gen.forBlock['thread_join'] = function(block) {
  const thread = gen.valueToCode(block, 'THREAD', gen.ORDER_ATOMIC) || "''";
  return `    await ${thread}.members.add(interaction.user.id);\n`;
};

gen.forBlock['thread_leave'] = function(block) {
  const thread = gen.valueToCode(block, 'THREAD', gen.ORDER_ATOMIC) || "''";
  return `    await ${thread}.members.remove(interaction.user.id);\n`;
};

gen.forBlock['invite_create'] = function(block) {
  const channel = gen.valueToCode(block, 'CHANNEL', gen.ORDER_ATOMIC) || "''";
  return [`await ${channel}.createInvite()`, gen.ORDER_ATOMIC];
};

gen.forBlock['invite_delete'] = function(block) {
  const invite = gen.valueToCode(block, 'INVITE', gen.ORDER_ATOMIC) || "''";
  return `    await ${invite}.delete();\n`;
};

// ===== 🔊 AUDIO Y VOZ =====
gen.forBlock['voice_connect'] = function(block) {
  const channel = gen.valueToCode(block, 'CHANNEL', gen.ORDER_ATOMIC) || "''";
  return `    await joinVoiceChannel({ channelId: ${channel}.id, guildId: interaction.guildId, adapterCreator: interaction.guild.voiceAdapterCreator });\n`;
};

gen.forBlock['voice_disconnect'] = function(block) {
  return `    const connection = getVoiceConnection(interaction.guildId);\n    if(connection) connection.destroy();\n`;
};

gen.forBlock['voice_play'] = function(block) {
  const file = gen.valueToCode(block, 'FILE', gen.ORDER_ATOMIC) || "''";
  return `    const player = createAudioPlayer(); const resource = createAudioResource(${file}); player.play(resource); connection.subscribe(player);\n`;
};

gen.forBlock['voice_pause'] = function(block) {
  return `    player.pause();\n`;
};

gen.forBlock['voice_resume'] = function(block) {
  return `    player.unpause();\n`;
};

gen.forBlock['voice_skip'] = function(block) {
  return `    player.stop();\n`;
};

gen.forBlock['voice_volume'] = function(block) {
  const volume = gen.valueToCode(block, 'VOLUME', gen.ORDER_ATOMIC) || "50";
  return `    resource.volume.setVolume(${volume} / 100);\n`;
};

// ===== 📊 ALMACENAMIENTO Y DATOS =====
gen.forBlock['user_var_set'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  const varname = block.getFieldValue('VARNAME');
  const value = gen.valueToCode(block, 'VALUE', gen.ORDER_ATOMIC) || "''";
  return `  const userData = JSON.parse(fs.readFileSync('./data/users.json', 'utf8') || '{}'); if(!userData[${user}]) userData[${user}] = {}; userData[${user}]['${varname}'] = ${value}; fs.writeFileSync('./data/users.json', JSON.stringify(userData, null, 2));\n`;
};

gen.forBlock['user_var_get'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  const varname = block.getFieldValue('VARNAME');
  return [`(JSON.parse(fs.readFileSync('./data/users.json', 'utf8') || '{}')[${user}] || {})[('${varname}')]`, gen.ORDER_ATOMIC];
};

gen.forBlock['guild_var_set'] = function(block) {
  const varname = block.getFieldValue('VARNAME');
  const value = gen.valueToCode(block, 'VALUE', gen.ORDER_ATOMIC) || "''";
  return `  const guildData = JSON.parse(fs.readFileSync('./data/guilds.json', 'utf8') || '{}'); if(!guildData[interaction.guildId]) guildData[interaction.guildId] = {}; guildData[interaction.guildId]['${varname}'] = ${value}; fs.writeFileSync('./data/guilds.json', JSON.stringify(guildData, null, 2));\n`;
};

gen.forBlock['guild_var_get'] = function(block) {
  const varname = block.getFieldValue('VARNAME');
  return [`(JSON.parse(fs.readFileSync('./data/guilds.json', 'utf8') || '{}')[interaction.guildId] || {})[('${varname}')]`, gen.ORDER_ATOMIC];
};

gen.forBlock['global_var_set'] = function(block) {
  const varname = block.getFieldValue('VARNAME');
  const value = gen.valueToCode(block, 'VALUE', gen.ORDER_ATOMIC) || "''";
  return `  const globalData = JSON.parse(fs.readFileSync('./data/global.json', 'utf8') || '{}'); globalData['${varname}'] = ${value}; fs.writeFileSync('./data/global.json', JSON.stringify(globalData, null, 2));\n`;
};

gen.forBlock['global_var_get'] = function(block) {
  const varname = block.getFieldValue('VARNAME');
  return [`(JSON.parse(fs.readFileSync('./data/global.json', 'utf8') || '{}'))['${varname}']`, gen.ORDER_ATOMIC];
};

// ===== ⚙️ UTILIDADES Y LÓGICA =====
gen.forBlock['text_input'] = function(block) {
  return ["'" + block.getFieldValue('TEXT') + "'", gen.ORDER_ATOMIC];
};

gen.forBlock['number_input'] = function(block) {
  return [block.getFieldValue('NUM'), gen.ORDER_ATOMIC];
};

gen.forBlock['math_random'] = function(block) {
  const min = gen.valueToCode(block, 'MIN', gen.ORDER_ATOMIC) || "0";
  const max = gen.valueToCode(block, 'MAX', gen.ORDER_ATOMIC) || "100";
  return [`Math.floor(Math.random() * (${max} - ${min} + 1)) + ${min}`, gen.ORDER_ATOMIC];
};

gen.forBlock['math_operation'] = function(block) {
  const a = gen.valueToCode(block, 'A', gen.ORDER_ATOMIC) || "0";
  const b = gen.valueToCode(block, 'B', gen.ORDER_ATOMIC) || "0";
  const op = block.getFieldValue('OP');
  let operator = '+';
  if(op === 'MINUS') operator = '-';
  else if(op === 'MULTIPLY') operator = '*';
  else if(op === 'DIVIDE') operator = '/';
  else if(op === 'POWER') operator = '**';
  return [`(${a} ${operator} ${b})`, gen.ORDER_ATOMIC];
};

gen.forBlock['logic_compare'] = function(block) {
  const a = gen.valueToCode(block, 'A', gen.ORDER_ATOMIC) || "0";
  const b = gen.valueToCode(block, 'B', gen.ORDER_ATOMIC) || "0";
  const op = block.getFieldValue('OP');
  let operator = '===';
  if(op === 'NEQ') operator = '!==';
  else if(op === 'LT') operator = '<';
  else if(op === 'GT') operator = '>';
  else if(op === 'LTE') operator = '<=';
  else if(op === 'GTE') operator = '>=';
  return [`(${a} ${operator} ${b})`, gen.ORDER_ATOMIC];
};

gen.forBlock['controls_if'] = function(block) {
  const condition = gen.valueToCode(block, 'IF0', gen.ORDER_ATOMIC) || "false";
  const branch = gen.statementToCode(block, 'DO0');
  return `if (${condition}) {\n${branch}}\n`;
};

gen.forBlock['controls_if_elseif'] = function(block) {
  const condition1 = gen.valueToCode(block, 'IF0', gen.ORDER_ATOMIC) || "false";
  const condition2 = gen.valueToCode(block, 'IF1', gen.ORDER_ATOMIC) || "false";
  const branch1 = gen.statementToCode(block, 'DO0');
  const branch2 = gen.statementToCode(block, 'DO1');
  return `if (${condition1}) {\n${branch1}} else if (${condition2}) {\n${branch2}}\n`;
};

gen.forBlock['controls_if_else'] = function(block) {
  const condition = gen.valueToCode(block, 'IF0', gen.ORDER_ATOMIC) || "false";
  const branch1 = gen.statementToCode(block, 'DO0');
  const branch2 = gen.statementToCode(block, 'DO1');
  return `if (${condition}) {\n${branch1}} else {\n${branch2}}\n`;
};

gen.forBlock['controls_repeat'] = function(block) {
  const times = gen.valueToCode(block, 'TIMES', gen.ORDER_ATOMIC) || "1";
  const branch = gen.statementToCode(block, 'DO');
  return `for (let i = 0; i < ${times}; i++) {\n${branch}}\n`;
};

gen.forBlock['controls_for_each_member'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `interaction.guild.members.fetch().then(members => { members.forEach(member => {\n${branch}})});\n`;
};

gen.forBlock['controls_for_each_guild'] = function(block) {
  const branch = gen.statementToCode(block, 'DO');
  return `client.guilds.cache.forEach(guild => {\n${branch}});\n`;
};

gen.forBlock['wait_ms'] = function(block) {
  const ms = gen.valueToCode(block, 'MS', gen.ORDER_ATOMIC) || "1000";
  return `await new Promise(resolve => setTimeout(resolve, ${ms}));\n`;
};

gen.forBlock['interval_execute'] = function(block) {
  const seconds = gen.valueToCode(block, 'SECONDS', gen.ORDER_ATOMIC) || "60";
  const branch = gen.statementToCode(block, 'DO');
  return `setInterval(async () => {\n${branch}}, ${seconds} * 1000);\n`;
};

gen.forBlock['api_request'] = function(block) {
  const method = block.getFieldValue('METHOD');
  const url = gen.valueToCode(block, 'URL', gen.ORDER_ATOMIC) || "''";
  const data = gen.valueToCode(block, 'DATA', gen.ORDER_ATOMIC) || "{}";
  return [`await fetch(${url}, { method: '${method}', body: ${data} }).then(r => r.json())`, gen.ORDER_ATOMIC];
};

// ===== 🔍 OBTENER IDS Y NOMBRES =====
gen.forBlock['get_channel_id'] = function(block) {
  const channel = gen.valueToCode(block, 'CHANNEL', gen.ORDER_ATOMIC) || "''";
  return [`${channel}.id`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_channel_name'] = function(block) {
  const channel = gen.valueToCode(block, 'CHANNEL', gen.ORDER_ATOMIC) || "''";
  return [`${channel}.name`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_role_id'] = function(block) {
  const role = gen.valueToCode(block, 'ROLE', gen.ORDER_ATOMIC) || "''";
  return [`${role}.id`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_role_name'] = function(block) {
  const role = gen.valueToCode(block, 'ROLE', gen.ORDER_ATOMIC) || "''";
  return [`${role}.name`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_user_id_numeric'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  return [`parseInt(${user}.id)`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_user_id_string'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  return [`${user}.id`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_user_mention'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  return [`<@${user}.id>`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_user_name'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  return [`${user}.globalName || ${user}.username`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_user_username'] = function(block) {
  const user = gen.valueToCode(block, 'USER', gen.ORDER_ATOMIC) || "''";
  return [`${user}.username`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_guild_id_numeric'] = function(block) {
  const guild = gen.valueToCode(block, 'GUILD', gen.ORDER_ATOMIC) || "''";
  return [`parseInt(${guild}.id)`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_guild_id_string'] = function(block) {
  const guild = gen.valueToCode(block, 'GUILD', gen.ORDER_ATOMIC) || "''";
  return [`${guild}.id`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_guild_name'] = function(block) {
  const guild = gen.valueToCode(block, 'GUILD', gen.ORDER_ATOMIC) || "''";
  return [`${guild}.name`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_message_author_id'] = function(block) {
  return [`message.author.id`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_message_author_name'] = function(block) {
  return [`message.author.globalName || message.author.username`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_interaction_user_id'] = function(block) {
  return [`interaction.user.id`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_interaction_user_name'] = function(block) {
  return [`interaction.user.globalName || interaction.user.username`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_member_id'] = function(block) {
  const member = gen.valueToCode(block, 'MEMBER', gen.ORDER_ATOMIC) || "''";
  return [`${member}.id`, gen.ORDER_ATOMIC];
};

gen.forBlock['get_member_name'] = function(block) {
  const member = gen.valueToCode(block, 'MEMBER', gen.ORDER_ATOMIC) || "''";
  return [`${member}.user.globalName || ${member}.user.username`, gen.ORDER_ATOMIC];
};