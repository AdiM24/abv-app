import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import "./DataTable.css";

export interface GridColumnDef {
    field: string;
    headerName: string;
    width: number;
}

interface HeaderType {
    column: GridColumnDef;
    ref: MutableRefObject<any>
}

interface DataTableProps {
    headers: GridColumnDef[];
    rows: any[];
    minCellWidth: number;
}

const createColumns = (headers: GridColumnDef[]): HeaderType[] => {
    return headers.map((item: GridColumnDef) => ({
        column: item,
        ref: useRef(),
    }));
}

const DataTable = ({ headers, rows, minCellWidth }: DataTableProps) => {
    const [tableHeight, setTableHeight] = useState<any>('auto');
    const [activeIndex, setActiveIndex] = useState<any>(null);
    const tableElement = useRef<HTMLTableElement>(null);

    const columns: HeaderType[] = createColumns(headers);

    useEffect(() => {
        setTableHeight(tableElement?.current?.offsetHeight);

        const gridColumnWidths = headers.map((column: GridColumnDef) => {
            return column.width;
        })

        tableElement!.current!.style.gridTemplateColumns = `${gridColumnWidths.join(' ')}`
    }, [tableElement, headers]);

    const mouseMove = useCallback((event: any) => {
        const gridColumns = columns.map((column: HeaderType, index: number) => {
            if (index === activeIndex) {
                const width = event.clientX - column.ref.current.offsetLeft;

                if (width >= minCellWidth) {
                    return `${width}px`;
                }
            }

            return `${column.ref.current.offsetWidth}px`;
        });

        tableElement!.current!.style.gridTemplateColumns =
            `${gridColumns.join(' ')}`;

    }, [activeIndex, columns, minCellWidth]);

    const removeListeners = useCallback(() => {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', removeListeners);
    }, [mouseMove]);

    const mouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    }, [setActiveIndex, removeListeners]);

    useEffect(() => {
        if (activeIndex !== null) {
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
        }

        return () => {
            removeListeners();
        }
    }, [activeIndex, mouseMove, mouseUp, removeListeners]);

    return (
        <Box className='table-wrapper'>
            <Table className='resizable-table' ref={tableElement}>
                <TableHead>
                    <TableRow>
                        {columns.map((header: HeaderType, index: number) => {
                            return <TableCell width={header.column.width} ref={header.ref} key={header.column.field}>
                                <span>{header.column.headerName}</span>
                                <div
                                    style={{ height: tableHeight }}
                                    onMouseDown={() => setActiveIndex(index)}
                                    className={`resize-handle ${activeIndex === index ? "active" : "idle"
                                        }`}
                                />
                            </TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any, index: number) => (
                        <TableRow key={`${index}-${row}`}>
                            <TableCell>
                                {row}
                            </TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </Box>
    )
};

export default DataTable;