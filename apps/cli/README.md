# ros2-cli

This program provides a cli to build and run multiple ros2 nodes.

## Setup

- `git clone https://github.com/DooomiT/ros2-cli`
- `cd ros2-cli`
- `npm install`
- `npm i typescript ts-node -g`
- `npm run build`
- `npm i -g`
- setup your ros project in following filestructure:
```
project
│   config.yml    
│
└───components
│   │   
│   └───Node1
│   │   └───  ... sourcecode of Node1 & ros stuff
│   │    
│   └───Node2
│   │   └───  ... sourcecode of Node1 & ros stuff
│   │   
│   └───...
│
└───bin
    │   executeNode1.sh
    │   executeNode2.sh
    │   ...
```
- run `ros2-cli ...`

## Development

## Contribution

- contributions via PR are welcome 