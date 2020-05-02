const sqlite3 = require("sqlite3");
const health = require("./health");

let db;

/**
 * Initialize the database module
 * @param {string} dbPath Path to SQLite file
 * @param {function} callback Callback, when init is done (or failed)
 * @returns {boolean} true if succeeded, false if not
 */
const init = (dbPath, callback = () => undefined) => {
    db = new sqlite3.Database(dbPath);

    db.run("SELECT * from crashes LIMIT 1", (error) => {
        if (error) {
            db.close();
            console.log(
                "DB initialization failed. Did you create an empty DB with the required schema?\nHint: use util/createEmptyDbFile.sh"
            );
            console.error(error);
        }
        callback(error);
    });
};

/**
 * Add an error report
 * @param {*} param0
 */
const addReport = ({
    date,
    fingerprint,
    deviceinfo,
    version,
    build,
    license,
    errorMsg,
    errorFile,
    errorLine,
    stacktrace,
}) => {
    db.run(
        "INSERT INTO crashes (reportedDate, fingerprint, deviceinfo, version, build, license, errorMsg, errorFile, errorLine, stacktrace) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            date,
            fingerprint,
            deviceinfo,
            version,
            build,
            license,
            errorMsg,
            errorFile,
            errorLine,
            stacktrace,
        ],
        (error) => {
            if (error) health.reportHealthProblem(error.message);
        }
    );
};

const close = (done) => {
    db.close(done);
};

module.exports = {
    init,
    addReport,
    close,
};
