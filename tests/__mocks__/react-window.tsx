import React from "react";

export const FixedSizeList = ({ children, ...rest }: any) => {
    return (
        <div>
            {Array.from({ length: 10 }).map((_, index) => children({ index, style: {} }))}
        </div>
    );
};