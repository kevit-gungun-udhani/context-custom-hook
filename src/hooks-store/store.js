const { useState, useEffect } = require("react");

let gloabalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
    const setState = useState(gloabalState)[1];

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](gloabalState, payload);
        gloabalState = {...gloabalState, ...newState};

        for(const listener of listeners){
            listener(gloabalState);
        }
    }

    useEffect(() => {
        if(shouldListen){
            listeners.push(setState);
        }
        
        return () => {
            if(shouldListen){
                listeners = listeners.filter(li => li !== setState)
            } 
        }
    }, [setState, shouldListen]);

    return [gloabalState, dispatch]
}

export const initStore = (userActions, initialState) => {
    if(initialState){
        gloabalState = {...gloabalState, ...initialState}
    }
    actions = {...actions, ...userActions}
}

