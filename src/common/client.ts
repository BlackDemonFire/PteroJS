export interface Backup {
    uuid:           string;
    name:           string;
    ignoredFiles:   string[];
    hash:           string | undefined;
    bytes:          number;
    checksum:       string | undefined;
    successful:     boolean;
    locked:         boolean;
    createdAt:      Date;
    completedAt:    Date | undefined;
}

export interface ClientMeta {
    isServerOwner?:     boolean;
    userPermissions?:   Record<string, string>;
}

export interface ClientResources {
    currentState:       string;
    isSuspended:        boolean;
    resources:{
        memoryBytes:    number;
        cpuAbsolute:    number;
        diskBytes:      number;
        networkRxBytes: number;
        networkTxBytes: number;
        uptime:         number;
    }
}

export interface CreateBackupOptions {
    name?:      string;
    isLocked?:  boolean;
    ignored?:   string;
}

export interface CreateScheduleOptions extends Omit<Cron, 'month'> {
    name:           string;
    active:         boolean;
}

export interface Cron {
    dayOfWeek:  string;
    dayOfMonth: string;
    month:      string;
    hour:       string;
    minute:     string;
}

export interface Database {
    id:                 number;
    name:               string;
    username:           string;
    host:{
        address:        string;
        port:           number;
    }
    connectionsFrom:    string;
    maxConnections:     string;
    password?:          string;
}

export interface File {
    name:       string;
    mode:       string;
    modeBits:   bigint;
    size:       number;
    isFile:     boolean;
    isSymlink:  boolean;
    mimetype:   string;
    createdAt:  Date;
    modifiedAt: Date | undefined;
}

export interface FileChmodData {
    file: string;
    mode: number;
}

export interface NetworkAllocation {
    id:         number;
    ip:         string;
    ipAlias:    string;
    port:       number;
    notes:      string | null;
    isDefault:  boolean;
}

export interface ScheduleTask {
    id:         number;
    sequenceId: number;
    action:     string;
    payload:    string;
    offset:     number;
    queued:     boolean;
    createdAt:  Date;
    updatedAt:  Date | undefined;
}

export type ScheduleTaskAction = 'backup' | 'command' | 'power';

export enum ShardStatus {
    CLOSED,
    CONNECTING,
    CONNECTED
}

export interface WebSocketAuth {
    data:{
        socket: string;
        token:  string;
    }
}

export interface WebSocketEvents {
    debug:              [message: string];
    error:              [message: string];
    rawPayload:         [data: any];

    authSuccess:        [];
    serverConnect:      [id: string];
    serverOutput:       [output: string];
    daemonMessage:      [output: string];
    serverDisconnect:   [];

    statsUpdate:        [stats: ClientResources];
    statusUpdate:       [status: string];
    transferUpdate:     [data: any];

    installStart:       [];
    installOutput:      [output: string];
    installComplete:    [];

    backupComplete:     [backup: Partial<Backup>];
}

export interface WebSocketPayload {
    event: string;
    args?: string[];
}
