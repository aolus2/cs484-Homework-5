const calculateFactorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * calculateFactorial(n - 1);
};

export default calculateFactorial;
