import React from 'react';
import './Table.css';

export const Tr = ({children}) => {
    return <tr>{children}</tr>
}

export const Td = ({children}) => {
    return <td className="cell">{children}</td>
}

export const Th = ({column, onClick}) => {
    const className = `th ${column.sortField ? 'cursor-pointer' : ''}`

    const onClickHandler = (event) => {
        if (column.sortField) {
            onClick(column.sortField);
        }
    }

    return <th className={className} onClick={onClickHandler}>
        {column.title}
    </th>
}

const Table = ({ columns, children, onClickSort }) => {
    return (
        <table className="table" border={1}>
            {columns &&
                <thead>
                    <tr>
                        {columns.map((column, index) => {
                            return <Th
                                key={`th_${index}`}
                                onClick={onClickSort}
                                column={column}
                            />
                        })}
                    </tr>
                </thead>
            }
            <tbody>
                {children}
            </tbody>
        </table>
    );
};

export default Table;
