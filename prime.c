#ifdef _WIN32
#include <fcntl.h>
#endif

#include <stdio.h>
#include <stdbool.h>

bool is_prime(int n) {
  if (n < 2) return false;
  if (n == 2) return true;
  if (n % 2 == 0) return false;

  for (int d = 3; d * d <= n; d += 2) {
    if (n % d == 0) {
      return false;
    }
  }
  return true;
}

// #define TARGET 2147483647
#define TARGET 3000000

void printPrimes() {
  int n = 2;
  fwrite(&n, sizeof(n), 1, stdout);
  for (n = 3; n <= TARGET; n += 2) {
    if (is_prime(n)) {
      fwrite(&n, sizeof(n), 1, stdout);
    }
  }
}

int main() {

  #ifdef _WIN32
    _setmode(_fileno(stdout), _O_BINARY);
  #endif

  printPrimes();
  return 0;
}
