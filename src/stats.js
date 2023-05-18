import fs from "fs";

const db = "./db.json";

class Stats {
  constructor(dbPath = db) {
    this.dbPath = dbPath;
    this.stats = {};

    try {
      this.readStats();
    } catch (error) {
      this.stats = {
        day: {},
        week: {},
        month: {},
        year: {},
        allTime: {},
      };
    }
  }

  readStats() {
    this.stats = JSON.parse(fs.readFileSync(this.dbPath));
  }

  saveStats() {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const dayOfMonth = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // move "day" stats to "week" at midnight on Sunday
    if (dayOfWeek === 0 && Object.keys(this.stats.day).length > 0) {
      this.stats.week = { ...this.stats.week, ...this.stats.day };
      this.stats.day = {};
    }

    // move "week" stats to "month" at midnight on the 1st of the month
    if (dayOfMonth === 1 && Object.keys(this.stats.week).length > 0) {
      this.stats.month = { ...this.stats.month, ...this.stats.week };
      this.stats.week = {};
    }

    // move "month" stats to "year" at midnight on Jan 1
    if (
      dayOfMonth === 1 &&
      month === 0 &&
      Object.keys(this.stats.month).length > 0
    ) {
      this.stats.year = { ...this.stats.year, ...this.stats.month };
      this.stats.month = {};
    }

    // save stats to file
    fs.writeFileSync(this.dbPath, JSON.stringify(this.stats));
    return this.stats;
  }

  updateStats(userId) {
    this.stats.day = {
      ...this.stats.day,
      [userId]: { count: (this.stats.day[userId]?.count || 0) + 1 },
    };

    this.stats.week = {
      ...this.stats.week,
      [userId]: { count: (this.stats.week[userId]?.count || 0) + 1 },
    };

    this.stats.month = {
      ...this.stats.month,
      [userId]: { count: (this.stats.month[userId]?.count || 0) + 1 },
    };

    this.stats.year = {
      ...this.stats.year,
      [userId]: { count: (this.stats.year[userId]?.count || 0) + 1 },
    };

    this.stats.allTime = {
      ...this.stats.allTime,
      [userId]: { count: (this.stats.allTime[userId]?.count || 0) + 1 },
    };
    return this.stats;
  }

  getStats(period = "all") {
    if (period === "all") {
      const { day, week, month, year, allTime } = this.stats;
      return {
        day: Object.values(day).reduce((acc, curr) => acc + curr.count, 0),
        week: Object.values(week).reduce((acc, curr) => acc + curr.count, 0),
        month: Object.values(month).reduce((acc, curr) => acc + curr.count, 0),
        year: Object.values(year).reduce((acc, curr) => acc + curr.count, 0),
        allTime: Object.values(allTime).reduce(
          (acc, curr) => acc + curr.count,
          0
        ),
      };
    }
  }

  setStats = (stats) => {
    this.stats = stats;
  };

  startChecking(duration = 1000 * 60 * 60 * 24) {
    setInterval(() => {
      this.saveStats();
    }, duration);
  }
}

export default Stats;
