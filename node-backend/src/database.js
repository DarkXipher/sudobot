
const { Pool } = require('pg');
const Promise = require('bluebird');
const path = require('path');
const dotenv = require('dotenv');
var crypto = require('crypto');

dotenv.config();

const connString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';


var fs = require('fs');


class Database {
    constructor(iterations) {
        this.db = new Pool({
            connectionString: connString
        });

        this.iterations = iterations;

        this.db.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });

        (async () => {
            await this.db.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
        });
    }

    getDB() {
        return this.db;
    }

    loadSettings(table) {
        return new Promise(async (resolve, reject) => {
            // const dbClient = await this.db.connect();
            try {
                //this.db.connect( (err, client, done) => { client.query('SELECT * FROM ' + table + ' WHERE id=1' ,var, callback (err, result) => { done(err)})}
                
                let result = await this.db.query('SELECT * FROM ' + table + ' WHERE id=1');
                resolve(result);
            } catch (err) {
                reject(err);
            // } finally {
                // dbClient.release();
            }
        });
    }
    validateAccountPassword(username, passhash) {
        var result = false;
        try{
            let result = await this.db.query('SELECT passhash, salt FROM user WHERE username like $1', [username]);
            
            } catch (err) {
                reject(err);
            }
        })
    }

    saveAccount(username, password) {
        try {
            let salt = crypto.randomBytes(16).toString('hex');
            let hash = crypto.pbkdf2Sync(password, salt, iterations, '64', 'sha512');
            let result = await this.db.query('INSERT INTO user (username, passhash, salt) VALUES($1, $2, $3)', [username, hash, salt]);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    }

    saveBotConfig(token, ownerid, commandPrefix, deleteCommandMessages, unknownCommandResponse) {
        try {
            // remove current settings
            this.db.query('DELETE FROM botconfig');
            // apply new settings
            let result = await this.db.query('INSERT INTO botconfig (token, ownerid, commandprefix, deletecommandmessages, unknowncommandresponse) VALUES($1, $2, $3, $4, $5)', [token, ownerid, commandPrefix, (deleteCommandMessages) ? 'true' : 'false', (unknownCommandResponse) ? 'true' : 'false']);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    }
    
    saveServiceConfig(service, host, port, apiKey) {
        if (service == '' || host == '' || port == '' || apiKey == '') {return;}

        if (service == 'ombi' && request.rTV != '' && request.rMovie != '') {
            this.db.query('DELETE FROM ombi');
            this.db.query('INSERT INTO ombi (host, port, apiKey, requesttv, requestmovie) VALUES(?, ?, ?, ?, ?)', [host, port, apiKey, request.rTV, request.rMovie]);
        } else if (service == 'tautulli' || service == 'sonarr' || service == 'radarr') {
            this.db.query('DELETE FROM ' + service);
            this.db.query('INSERT INTO placeholder (host, port, apiKey) VALUES(?, ?, ?)'.replace('placeholder', service), [host, port, apiKey]);
        } else {
            return;
        }
    }

    init() {
    //     return new Promise(async (resolve, reject) => {
    //         this.db.connect().then(db => {
    //             this.db = db;
    //             this.db.run('CREATE TABLE IF NOT EXISTS user (id integer primary key asc, username text, password text)');
    //             this.db.run('CREATE TABLE IF NOT EXISTS bot (id integer primary key asc, token text, ownerid text, commandprefix text, deletecommandmessages text, unknowncommandresponse text)');
    //             this.db.run('CREATE TABLE IF NOT EXISTS ombi (id integer primary key asc, host text, port text, apikey text, requesttv text, requestmovie text)');
    //             this.db.run('CREATE TABLE IF NOT EXISTS tautulli (id integer primary key asc, host text, port text, apikey text)');
    //             this.db.run('CREATE TABLE IF NOT EXISTS sonarr (id integer primary key asc, host text, port text, apikey text)');
    //             this.db.run('CREATE TABLE IF NOT EXISTS radarr (id integer primary key asc, host text, port text, apikey text)');
    //             resolve(this.db);
    //         }).catch((err) => reject(err));
    //     });
        return;
        // do nothing for now, the DB should already contain tables.
    }
}

module.exports = Database;