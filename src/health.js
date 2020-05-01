const MAX_NUM_MESSAGES = 1000;

let messages = [];

/**
 * Report that a problem occured at a certain spot in execution
 * @param {string} message Message of the problem occured
 */
const reportHealthProblem = (message) => {
    console.error("[Health check] Health problem detected: " + message);
    if (messages.length >= MAX_NUM_MESSAGES) {
        messages.shift(); //remove first element from messages buffer
    }

    messages.push(message);
};

/**
 * Get the current health status of the application
 * @returns null if ok, array of strings with message(s) of the problems that occured
 */
const getHealthStatus = () => {
    if (messages.length) {
        return messages;
    } else {
        return null;
    }
};

module.exports = {
    reportHealthProblem,
    getHealthStatus,
};
