const { useState, useEffect } = require("react");

let gloabalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
    const setState = useState(gloabalState)[1];

    const dispatch = (actionIdentifier) => {
        const newState = actions[actionIdentifier](gloabalState);
        gloabalState = {...gloabalState, ...newState};

        for(const listener of listeners){
            listener(gloabalState);
        }
    }

    useEffect(() => {
        listeners.push(setState);

        return () => {
            listeners = listeners.filter(li => li !== setState) 
        }
    }, [setState]);

    return [gloabalState, dispatch]
}

export const initStore = (userActions, initialState) => {
    if(initialState){
        gloabalState = {...gloabalState, ...initialState}
    }
    actions = {...actions, ...userActions}
}

