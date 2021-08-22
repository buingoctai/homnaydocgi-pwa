class LogSytem {
  log(text: string) {
    console.log(text);
  }

  logError(text: string) {
    console.error(text);
  }

  logWarning(text: string) {
    console.warn(text);
  }

  logTrace(text: string) {
    console.trace(text);
  }

  logTable(data: object) {
    console.table(data);
  }

  logTimeStart() {
    console.time();
  }

  logTimeEnd() {
    console.timeEnd();
  }
}

const logSystem = new LogSytem();

export default logSystem;
