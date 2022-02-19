export interface ServerToClientEvents {
    message: (data: string) => void;
    process_data: (data: any) => void;
}

export interface ClientToServerEvents {
    run: (command: string) => void;
}

export interface InterServerEvents {
}

export interface SocketData {
    name: string; age: number;
}
