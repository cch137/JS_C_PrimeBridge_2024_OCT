// child process
import { execSync, spawn } from "child_process";

function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true; // 2 is prime
  if (n % 2 === 0) return false; // skip even numbers greater than 2

  for (let d = 3; d * d <= n; d += 2) {
    if (n % d === 0) {
      return false;
    }
  }
  return true;
}

// const TARGET = 2147483647;
const TARGET = 3000000;

function printPrimes() {
  console.log(2);
  for (let n = 3; n <= TARGET; n += 2) {
    if (isPrime(n)) {
      console.log(n);
    }
  }
}

(async () => {
  execSync("c");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const t0 = Date.now();

  const prime = spawn("prime.exe");

  prime.stdout.on("data", (chunk) => {
    const length = chunk.length;
    for (let i = 0; i < length; i += 4) {
      const dv = new DataView(chunk.buffer, i, 4);
      console.log(dv.getInt32(0, true));
    }
  });

  prime.stdout.on("end", () => {
    console.log("Prime process ended");
  });

  prime.on("close", (err) => {
    console.log("Prime process exited with code", err);

    const t1 = Date.now();

    printPrimes();

    const t2 = Date.now();

    console.log("test1:", t1 - t0);
    console.log("test2:", t2 - t1);
  });
})();
