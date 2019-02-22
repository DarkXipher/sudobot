CREATE TABLE IF NOT EXISTS users (id serial  primary key, username VARCHAR(50) UNIQUE NOT NULL, passhash VARCHAR(100) NOT NULL, salt VARCHAR(100) NOT NULL);
CREATE TABLE IF NOT EXISTS botconfig (id serial primary key, token VARCHAR(100) NOT NULL, ownerid VARCHAR(50), commandprefix VARCHAR (50), deletecommandmessages VARCHAR(10), unknowncommandresponse VARCHAR(10));

CREATE TABLE IF NOT EXISTS guild_settings (guild_id INT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL, primary key (guild_id, key));

-- CREATE TABLE IF NOT EXISTS ombi (id serial primary key, host text, port INT, apikey text, requesttv text, requestmovie text);
-- CREATE TABLE IF NOT EXISTS tautulli (id serial primary key, host text, port INT, apikey text);
-- CREATE TABLE IF NOT EXISTS sonarr (id serial primary key, host text, port INT, apikey text);
-- CREATE TABLE IF NOT EXISTS radarr (id serial primary key, host text, port INT, apikey text);

CREATE TABLE IF NOT EXISTS service_config (id serial, servicename text NOT NULL, host text NOT NULL, port INT NOT NULL, apikey text, requesttv text, requestmovie text, primary key (id, servicename));
