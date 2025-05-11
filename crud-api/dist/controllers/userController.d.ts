import { IncomingMessage, ServerResponse } from 'http';
export declare const getAllUsers: (res: ServerResponse) => void;
export declare const getUserById: (id: string, res: ServerResponse) => ServerResponse<IncomingMessage> | undefined;
export declare const createUser: (req: IncomingMessage, res: ServerResponse) => void;
export declare const updateUser: (req: IncomingMessage, res: ServerResponse, userId: string) => void;
export declare const deleteUser: (res: ServerResponse, userId: string) => void;
