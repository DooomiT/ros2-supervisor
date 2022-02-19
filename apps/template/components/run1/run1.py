import sys
from time import sleep

def run1():
    while(True):
        sys.stdout.write('Hello from run1')
        sys.stdout.flush()
        sleep(1)

if __name__ == '__main__':
    run1()