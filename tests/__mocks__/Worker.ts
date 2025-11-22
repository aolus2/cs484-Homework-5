import { vi } from "vitest";

export default class MockWorker extends EventTarget implements Worker {
    // Static array to keep track of all MockWorker instances
    static instances: MockWorker[] = [];

    public onmessage: ((this: Worker, ev: MessageEvent<any>) => any) | null =
        null;
    public onmessageerror:
        | ((this: Worker, ev: MessageEvent<any>) => any)
        | null = null;
    public onerror: ((this: Worker, ev: ErrorEvent) => any) | null = null;

    public postMessage = vi.fn();
    public terminate = vi.fn();

    public addEventListener = vi.fn();
    public removeEventListener = vi.fn();
    public dispatchEvent = vi.fn();

    constructor(...args: any[]) {
        super();
        MockWorker.instances.push(this);
    }
    // Method to simulate worker sending a message back to the main thread
    public simulateMessage(data: { value: number; duration: number }) {
        const event = new MessageEvent("message", { data });
        if (this.onmessage) {
            this.onmessage(event);
        }
    }

    // Optionally, methods to simulate errors
    public simulateError(error: ErrorEvent) {
        const event = new ErrorEvent("error", { error });
        if (this.onerror) {
            this.onerror(event);
        }
    }
}
