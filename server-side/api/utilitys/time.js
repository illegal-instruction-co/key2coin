const Time = {}

Time.second = 1
Time.minute = Time.second * 60
Time.hour = Time.minute * 60
Time.day = Time.hour * 24
Time.week = Time.day * 7
Time.year = Time.day * 365

module.exports = Time;
