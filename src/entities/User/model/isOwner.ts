
import {createEvent, createStore} from 'effector'

export const setOwner = createEvent<boolean>();


export const $isOwner = createStore<boolean>(false)
    .on(setOwner, (_,_isOwner) => _isOwner);