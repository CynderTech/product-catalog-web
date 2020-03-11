export function createObserver(value) {
    const listeners = new Set();

    return [
        // Now reactive object
        new Proxy(value, {
            // mutation trap
            set(target, property, value) {
                // If the value did not change we do not want
                // to trigger an update
                if (target[property] === value) return true;

                // Mutate the value
                target[property] = value;

                // Notify listeners
                listeners.forEach(c => c(value));

                return true;
            }
        }),

        // Listeners so the consumer can add and remove
        listeners
    ];
}

export default createObserver;