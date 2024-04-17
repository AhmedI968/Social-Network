"use client"
import styles from '@/app/ui/welcome/scorecard/scorecard.module.css';
import Card from '../../ui/welcome/card/card';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import React from 'react';
import { useTable, useExpanded } from 'react-table';

type Match = {
    ratingUser: string;
    lastUpdated: string;
    ratingReceived: number;
    ratingGiven: number;
    categoryRatings: { category: string, rating: number }[];
    interestRatings: { interest: string, rating: number }[];
    feedback: string;
}

const Scorecard = () => {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const session = await getSession();
            const response = await fetch('/api/getFullRatingHistory', {
                headers: {
                    'Authorization': 'Bearer ' + session?.user.name
                }
            });
            const data = await response.json();
            setMatches(data);
        };

        fetchMatches();
    }, []);

    const data = React.useMemo(() => matches, [matches]);

    const columns = React.useMemo(() => [
        { Header: 'Name', accessor: 'ratingUser' },
        { Header: 'Date', accessor: 'lastUpdated' },
        { Header: 'Rating Received', accessor: 'ratingReceived' },
        { Header: 'Rating Given', accessor: 'ratingGiven' },
        { Header: 'Feedback', accessor: 'writtenFeedback' }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns
    } = useTable({ columns, data }, useExpanded);

    return (
        <div className={styles.container}>
            <Card />
            <h2 className={styles.title}>Your Match History</h2>
            <div className={styles.table}>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup: any) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row: any) => {
                            prepareRow(row);
                            return (
                                <React.Fragment>
                                    <tr {...row.getRowProps()} onClick={() => row.toggleRowExpanded(!row.isExpanded)}>
                                        {row.cells.map((cell: any) => {
                                            return (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            );
                                        })}
                                    </tr>
                                    {row.isExpanded ? (
                                        <tr>
                                            <td colSpan={visibleColumns.length}>
                                                <h3>Interest Ratings</h3>
                                                {row.original.interestRatings.map((interestRating: any) => (
                                                    <p>{interestRating.interest}: {interestRating.rating}</p>
                                                ))}
                                                <h3>Category Ratings</h3>
                                                {row.original.categoryRatings.map((categoryRating: any) => (
                                                    <p>{categoryRating.category}: {categoryRating.rating}</p>
                                                ))}
                                            </td>
                                        </tr>
                                    ) : null}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div >
        </div >
    );
}

export default Scorecard;