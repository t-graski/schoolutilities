import * as fs from 'fs';

export function logMailSend(time, receiver) {
  let path = '../logs/mailLogs.txt';
  let date = new Date(time).toISOString();

  try {
    fs.appendFile(path, `${date} - Sent mail to ${receiver}\n`, (err) => {});
  } catch (e) {}
}
