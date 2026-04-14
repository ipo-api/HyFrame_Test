export class Timer {
    timeData = {};
    flistTime;
    setInterval(fn, time, id) {
        clearTimeout(this.timeData[id]);
        const interval = () => {
            clearTimeout(this.timeData[id]);
            this.timeData[id] = setTimeout(interval, time);
            fn();
        }
        clearTimeout(this.flistTime);
        this.flistTime = setTimeout(interval, time);
    }

    clearInterval(timeId) {
        clearTimeout(this.timeData[timeId]);
        this.timeData[timeId] = null;
    }
}