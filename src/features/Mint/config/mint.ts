
export enum messageType {
    ERROR,
    SUCCESS,
    DEFAULT,
}

export interface Message {
    text:string,
    type:messageType,
}

export type returnMintFunction =  [Message, () => void, number];

export const defaultValue:Message = {
    text:'',
    type:messageType.DEFAULT
};