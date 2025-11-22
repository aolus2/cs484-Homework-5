import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import React from "react";
import * as ParentModule from "../src/components/Problem3";

vi.mock("../src/components/Problem3", async () => {
    const ParentModule = await vi.importActual("../src/components/Problem3");
    return {
        ...ParentModule,
        MemoizedTaskItem: {
            ...(typeof ParentModule.MemoizedTaskItem === "object"
                ? ParentModule.MemoizedTaskItem
                : {}),
            type: vi.spyOn(ParentModule.MemoizedTaskItem, "type"),
        },
    };
});

describe("Problem3: useCallback", () => {
    test("(5 points) Selecting checkbox only triggers re-render of involved element", async () => {
        render(<ParentModule.default />);
        vi.clearAllMocks();

        // Get the checkboxes
        const checkboxes = screen.getAllByRole("checkbox");
        fireEvent.click(checkboxes[0]);
        expect(ParentModule.MemoizedTaskItem.type).toHaveBeenCalledTimes(1);
        fireEvent.click(checkboxes[5]);
        expect(ParentModule.MemoizedTaskItem.type).toHaveBeenCalledTimes(2);
    });

    test("(10 points) Adding a task does not re-render entire list", async () => {
        render(<ParentModule.default />);
        vi.clearAllMocks();

        const button = screen.getByRole("button", { name: /Add Task/i });
        const input = screen.getByRole("textbox");

        fireEvent.change(input, { target: { value: "Example Task" } });
        fireEvent.click(button);

        expect(ParentModule.MemoizedTaskItem.type).toHaveBeenCalledTimes(1);
    });

    test("(10 points) Deleting a task does not re-render entire list", async () => {
        render(<ParentModule.default />);
        vi.clearAllMocks();
        const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        const deleteButtons = screen.getAllByRole("button", {
            name: /Delete/i,
        });
        fireEvent.click(deleteButtons[0]);

        // expect(ParentModule.MemoizedTaskItem.type).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toHaveBeenCalledTimes(0);
    });
});
