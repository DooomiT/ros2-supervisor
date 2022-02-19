import sys
from time import sleep


def run2():
    while(True):
        sys.stdout.write('Hello from run2')
        sys.stdout.flush()
        sleep(1)

if __name__ == '__main__':
    run2()