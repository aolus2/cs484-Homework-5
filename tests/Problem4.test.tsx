import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import React from "react";
import Problem4 from "../src/components/Problem4";

describe("Problem4: List Virtualization with react-window", () => {
    test("(25 points) renders only the visible items initially", async () => {
        const initialCount = 100;
        render(<Problem4 initialCount={initialCount} />);

        // Calculate expectations
        const height = 600;
        const itemSize = 50;
        const visibleItemCount = Math.ceil(height / itemSize); // 12
        const overscanCount = 5;
        const totalRenderedItems = visibleItemCount + overscanCount; // 17

        // Get all rendered product rows
        const renderedItems = screen.getAllByTestId(/product-row-\d+/i);
        expect(renderedItems.length).toBeGreaterThanOrEqual(visibleItemCount);
        expect(renderedItems.length).toBeLessThanOrEqual(totalRenderedItems);

        // Optionally, verify specific items are rendered
        expect(screen.getByTestId("product-row-0")).toBeInTheDocument();
        expect(screen.getByTestId("product-row-16")).toBeInTheDocument();
    });

    // test("(25 points) renders new items upon scrolling", async () => {
    //     const initialCount = 100;
    //     render(<Problem4 initialCount={initialCount} />);

    //     // Calculate expectations
    //     const height = 600;
    //     const itemSize = 50;
    //     const visibleItemCount = Math.ceil(height / itemSize); // 12
    //     const overscanCount = 5;
    //     const totalRenderedItems = visibleItemCount + overscanCount; // 17

    //     // Get the List container by data-testid
    //     const listContainer = screen.getByTestId("product-list");
    // });
});