// ms — Micro State
// hook - React Hook

import { useState, useEffect } from 'react';
import { createObserver } from '../global/observer';

// Create a observable object that we can be notified
// about on mutation
const [msState, listeners] = createObserver({ mode: '' });

// The actual hook
export function useMicroState() {
    // Create a hook with the current state
    const [state, dispatch] = useState(msState);

    useEffect(
        () => {
            // when the value is updated, update local state
            listeners.add(dispatch);
            // update the state if it was changed
            msState.mode = state;
            console.log(`state micro state was update to ${state.mode}`);

            // remove listener
            return () => listeners.delete(dispatch);
        },
        [state]
    );

    return [state, dispatch];
}


export default useMicroState;
