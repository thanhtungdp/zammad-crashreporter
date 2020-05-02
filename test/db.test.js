const db = require("../src/db");
const health = require("../src/health");

const DB_FILE_PATH = "_dbForTest.sqlite3";

const removeDummyDbFile = () => {
    const fs = require("fs");
    if (fs.existsSync(DB_FILE_PATH)) {
        fs.unlinkSync(DB_FILE_PATH);
    }
};

it("create empty db with schema", (done) => {
    removeDummyDbFile();

    const sqlite = require("sqlite3");
    const sql = new sqlite.Database(DB_FILE_PATH);
    sql.run(
        "CREATE TABLE crashes (id INTEGER PRIMARY KEY AUTOINCREMENT, receivedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, reportedDate TIMESTAMP NOT NULL, fingerprint TEXT NOT NULL, deviceinfo TEXT DEFAULT NULL, version TEXT DEFAULT NULL, build TEXT DEFAULT NULL, license TEXT DEFAULT NULL, errorMsg TEXT DEFAULT NULL, errorFile TEXT DEFAULT NULL, errorLine INTEGER DEFAULT NULL, stacktrace TEXT DEFAULT NULL)",
        [],
        done
    );
    sql.close();
});

it("test db init", () => {
    db.init(DB_FILE_PATH);
});

it("test db add report", () => {
    db.addReport({
        date: "2020-04-20 13:00:00",
        fingerprint: "fingrprnt_abc",
        deviceinfo: "devinfo",
        version: "0.0.1",
        build: "12345",
        license: null,
        errorMsg: "msg",
        errorFile: "index.js",
        errorLine: 123,
        stacktrace: "abc",
    });
});

it("expect no health error to be created", () => {
    expect(health.getHealthStatus()).toBeNull();
});

it("close database after test", (done) => {
    db.close(done);
});

afterAll(() => {
    removeDummyDbFile();
});
