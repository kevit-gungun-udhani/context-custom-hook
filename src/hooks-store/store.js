const { useState, useEffect } = require("react");

let gloabalState = {};
let listeners = [];
let actions = {};

const useStore = () => {
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
}