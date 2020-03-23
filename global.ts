
declare global {
    namespace NodeJS {
        interface Global {
            io: any,
            socketConn: any
        }
    }
}

export const initGlobals = () => {
    global.io = 10;
    global.socketConn = 20;
}