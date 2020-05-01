const health = require("../src/health");

const DEMO_PROBLEM_MSG = "demo problem by test";
const DEMO_PROBLEM_MSG_ALT = "demo problem 2 by test";

it("test initial state ok", () => {
    expect(health.getHealthStatus()).toBe(null);
});

it("add test health problem and check", () => {
    //temporary disable error output
    const origError = global.console.error;
    global.console.error = () => undefined;
    health.reportHealthProblem(DEMO_PROBLEM_MSG);
    global.console.error = origError;

    const msg = health.getHealthStatus();

    expect(msg).not.toBe(null);
    expect(typeof msg).toBe("object");
    expect(msg.length).toBe(1);
    expect(msg[0]).toBe(DEMO_PROBLEM_MSG);
});

it("check message overflow", () => {
    //temporary disable error output
    const origError = global.console.error;
    global.console.error = () => undefined;

    for (i = 0; i < 10000; i++) {
        health.reportHealthProblem(DEMO_PROBLEM_MSG_ALT);
    }

    global.console.error = origError;

    const msg = health.getHealthStatus();
    expect(msg).not.toBe(null);
    expect(typeof msg).toBe("object");
    expect(msg.length).toBeGreaterThanOrEqual(1000);
    expect(msg[0]).not.toBe(DEMO_PROBLEM_MSG);
});
