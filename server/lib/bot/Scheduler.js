const uuid = require('uuid/v4');
const nodeSchedule = require('node-schedule');

class Scheduler {
  constructor () {
    this.schedules = [];
  }

  schedule (...args) {
    const name = uuid();
    nodeSchedule.scheduleJob(name, ...args);
    this.schedules.push(name);
  }

  cancelAll () {
    this.schedules.forEach(name => {
      const schedule = nodeSchedule.scheduledJobs[name];
      if (schedule) {
        schedule.cancel();
      }
    });
    this.schedules = [];
  }
}

module.exports = new Scheduler();
