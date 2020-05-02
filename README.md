# Zammad App Crashreporter

Dockerized crash report server for the Zammad mobile app.

## Configuration & Setup
* Copy `config.sample.js` to `config.js`
* You may now set the configuration options manually in `config.js` or by setting environment variables that match the configuration option

* **httpPort**: HTTP port for the server
* **sqliteDb**: Path to database to store records in. Use util/createEmptyDbFile.sh to create an empty db with the required schema

## Dockerized usage
A docker compose script is ready to run this package in a docker environment.
Create the empty database first, using `util/createEmptyDbFile.sh`. Docker expects it to be in `./db.sqlite3` by default.
The following environments variable are ready to be set: 
* **HTTP_PORT:** HTTP Port to be exposed to the system for the service, default `3001`
* **DB_FILE:** Path to the sqlite database file. Create it before running `docker-compose up`. Default `./db.sqlite3`

## Endpoints

This service provides the following endpoints.

### Authorization
All requests shall contain an authorization header with the project-wide authorization token:
```
Authorization: Bearer {auth-token}
```

### Health check
Use this endpoint to check the services health.

```
GET /health
```

**Request parameters:** None



**Response parameters:**
* **health:** "ok" or "unhealthy"

```
{
    "health": "ok"
}
```

### Create crash report
Report the crash of the application

```
POST /report
```

**Request parameters:**
* **date:** Timestamp, when the app of the user has reported a crash
* **fingerprint:** The fingerprint of the user's enddevice/ session, according to the internal specification
* **deviceinfo:** Informaiton string about the used device (OS, OS version, ...)
* **version:** Version string of the app used
* **build:** Build code of the app used
* **license:** License token the user is currently using - or null/ undefined if not
* **errorMsg:** Message of the error that occured
* **errorFile:** File the error occured in
* **errorLine:** Line the error occured in (integer)
* **stacktrace:** Full stacktrace, if available - or null



**Respone parameters:**
```
{
    "ok": true
}
```