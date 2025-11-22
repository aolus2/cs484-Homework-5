import {
    render,
    screen,
    fireEvent,
    waitFor,
    act,
} from "@testing-library/react";
import {
    beforeAll,
    afterAll,
    beforeEach,
    afterEach,
    vi,
    describe,
    test,
    expect,
} from "vitest";
import React from "react";
import { Profiler, ProfilerOnRenderCallback } from "react";
import App from "../src/components/Problem1";
import MockWorker from "./__mocks__/Worker";

// Setup and teardown for mocking global Worker
beforeAll(() => {
    vi.stubGlobal("Worker", MockWorker as unknown as typeof Worker);
});

afterAll(() => {
    vi.unstubAllGlobals();
});

describe("Problem1: Fibonacci Calculator with Web Worker", () => {
    beforeEach(() => {
        // Reset the instances array before each test to ensure isolation
        MockWorker.instances = [];
        vi.resetAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test("(20 points) renders correctly and handles computation", async () => {
        const renderCounts: number[] = [];
        const onRender: ProfilerOnRenderCallback = () => {
            renderCounts.push(renderCounts.length + 1);
        };

        render(
            <Profiler id="AppProfiler" onRender={onRender}>
                <App />
            </Profiler>,
        );

        // Initial render assertions
        expect(
            screen.getByText("Problem 1: Fibonacci Calculator"),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Calculate/i }),
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/Enter a number/i)).toBeInTheDocument();
        expect(screen.getByRole("slider")).toBeInTheDocument();

        // Identify the MockWorker instance created by the component
        expect(MockWorker.instances.length).toBe(1);
        const mockWorkerInstance = MockWorker.instances[0];

        // Simulate user input and button click
        const numberInput = screen.getByLabelText(
            /Enter a number/i,
        ) as HTMLInputElement;
        const calculateButton = screen.getByRole("button", {
            name: /Calculate/i,
        });

        fireEvent.change(numberInput, { target: { value: "40" } });
        expect(numberInput.value).toBe("40");

        fireEvent.click(calculateButton);
        expect(calculateButton).toBeDisabled();
        expect(calculateButton).toHaveTextContent("Computing...");
        expect(mockWorkerInstance.postMessage).toHaveBeenCalledWith(40);

        // Simulate worker message
        const mockResult = { value: 102334155, duration: 10 };
        await act(async () => {
            mockWorkerInstance.simulateMessage(mockResult);
        });

        // Wait for UI updates
        await waitFor(() => {
            expect(
                screen.getByText(`Result: ${mockResult.value}`),
            ).toBeVisible();
            expect(screen.getByText(/Time taken: \d+\.\d+ms/)).toBeVisible();
            expect(calculateButton).toBeEnabled();
            expect(calculateButton).toHaveTextContent("Calculate");
        });

        // Assert render counts
        expect(renderCounts.length).toBeGreaterThanOrEqual(3); // Initial mount + input change + message received
        console.log("Render counts:", renderCounts.length);
    });

    test("(5 points) Profiler tracks render counts", async () => {
        const onRender = vi.fn();

        render(
            <Profiler id="AppProfiler" onRender={onRender}>
                <App />
            </Profiler>,
        );

        // Initial render
        expect(onRender).toHaveBeenCalledTimes(2);

        // Identify the MockWorker instance created by the component
        expect(MockWorker.instances.length).toBe(1);
        const mockWorkerInstance = MockWorker.instances[0];

        const numberInput = screen.getByLabelText(
            /Enter a number/i,
        ) as HTMLInputElement;
        const calculateButton = screen.getByRole("button", {
            name: /Calculate/i,
        });

        // Update input value
        fireEvent.change(numberInput, { target: { value: "20" } });
        expect(onRender).toHaveBeenCalledTimes(3);

        // Click calculate
        fireEvent.click(calculateButton);
        expect(onRender).toHaveBeenCalledTimes(4);

        // Simulate worker message
        const mockResult = { value: 6765, duration: 15 };
        await act(async () => {
            mockWorkerInstance.simulateMessage(mockResult);
        });

        // Final render after receiving message
        await waitFor(() => {
            expect(onRender).toHaveBeenCalledTimes(5);
        });
    });
});
