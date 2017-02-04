import * as fs from 'fs';
let settingsText = fs.readFileSync('settings.json', 'utf-8');

export namespace App {
  export declare interface Settings {
    // The port number the web server will listen to. ex: 3000
    listen_port: number;
    // CouchDB-compliant database url. ex: "http://127.0.0.1:5984/rest_trans"
    couchdb_url: string;
  }
}

export const settings: App.Settings = JSON.parse(settingsText);