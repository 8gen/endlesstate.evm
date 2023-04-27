import {BALANCE, TOO_MUCH, UNKNOW, USER_REJECTED} from "shared/config/blockchain";

export const formaterErrors = (message:string) => {
    console.log(message)
    switch (true) {
        case message.includes('ACTION_REJECTED'):
            return USER_REJECTED;

        case message.includes("insufficient funds"):
            return BALANCE;

        case message.includes('TOO_MUCH'):
            return TOO_MUCH;

        default:
            return UNKNOW;

    }
}