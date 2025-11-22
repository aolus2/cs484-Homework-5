// Fibonacci calculation in the worker
function fibonacci(n: number): number {
    return -1;
}

self.addEventListener("message", (e) => {
    const startTime = null;
    const result = fibonacci(null);
    const endTime = null;

    self.postMessage({
        value: null,
        duration: null,
    });
});
