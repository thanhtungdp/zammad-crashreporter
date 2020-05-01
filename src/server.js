const express = require("express");
const config = require("../config");
const authtoken = require("./authtoken");
const health = require("./health");
const db = require("./db");

const app = express();
const checkAuth = (req, res, next) => {
    let authHeader = req.headers.authorization || "";
    authHeader = authHeader.replace("Bearer ", "");

    if (authHeader !== authtoken.bearerToken) {
        return res.status(403).json({
            status: 403,
            message: "FORBIDDEN",
        });
    } else {
        return next();
    }
};

app.use(express.json());
app.use(checkAuth);

app.listen(config.httpPort, () => {
    console.log(`HTTP server running on port ${config.httpPort}`);
});

app.get("/health", (req, res) => {
    const status = health.getHealthStatus();
    if (!status) {
        return res.send({
            health: "ok",
        });
    } else {
        return res.send({
            health: "unhealthy",
            messages: status,
        });
    }
});

app.post("/report", (req, res) => {
    let {
        date,
        fingerprint,
        version,
        build,
        license,
        errorMsg,
        errorFile,
        errorLine,
        stacktrace,
    } = req.body;

    date = Date.parse(date);
    fingerprint = String(fingerprint);
    version = version ? String(version):null;
    build = build ? String(build):null;
    license = license ? String(license):null;
    errorMsg = errorMsg ? String(errorMsg):null;
    errorFile = errorFile ? String(errorFile):null;
    errorLine = errorLine ? parseInt(errorLine):null;
    if(isNaN(errorLine)) errorLine = null;
    stacktrace = stacktrace ? String(stacktrace):null;

    if (!date || !fingerprint) {
        return res.send({
            ok: false,
            message: "Date and fingerprint fields are required",
        });
    }

    db.addReport({
        date,
        fingerprint,
        version,
        build,
        license,
        errorMsg,
        errorFile,
        errorLine,
        stacktrace,
    });

    return res.send({ ok: true });
});
