import cors from 'cors';
import { createServer } from "http";
import express from 'express';
import bodyParser from 'body-parser';
import { readYAML } from './utils/readYAML';
import { writeYAML } from './utils/writeYAML';
import * as childProcess from 'child_process';
import { Server } from 'socket.io'
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './common/types';


const app = express();
app.use(bodyParser.json());
const appPort = 3000;
const httpServer = createServer(app);

const options = {
  cors: {
    origin: `http://localhost:${appPort}`, methods: ["GET", "POST"]
  }
};

const configPath = '../config.yml';
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, options);

app.use(cors())
app.use('/', express.static(__dirname + '/public'));

app.get('/config', async function (req: any, res: any) {
  const data = await readYAML(configPath, true);
  res.json(data);
});

app.post('/config', async function (req: any, res: any) {
  const data = await readYAML(configPath, true);
  const receivedData = req.body;
  const mergedData = Object.assign(data, receivedData);
  await writeYAML(mergedData, configPath);
});

io.sockets.on('connection', function (socket) {
  console.log('Connected')
  socket.on('run', async function (command: string) {
    const commandOptions = { cwd: '../' }
    try {
      const splitCommand = command.split(' ');
      const program = splitCommand[0];
      const args = splitCommand.slice(1)
      const child = childProcess.spawn(program, args, commandOptions);
      child.stdout.setEncoding('utf-8');
      child.stdout.on('data', function (data) {
        socket.emit('process_data', data);
      });
      child.stderr.setEncoding('utf-8');
      child.stderr.on('data', function (data) {
        data = data.toString();
        io.emit('process_data', data);
      });
      child.on('exit', function (code) {
        io.emit('message', `${program} terminatedwith ${code}`);
      });
      child.on('error', function (error) {
        io.emit('message', error.message);
      })
    }
    catch (error) {
      if (error instanceof Error) {
        socket.emit('message', error.message);
      }
    };
  });
});

app.get('/logs', function (req: any, res: any) {

});

httpServer.listen(appPort);