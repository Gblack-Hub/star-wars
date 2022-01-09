import React from 'react'
import Navbar from '../../components/dashboard/navbar/Navbar';
import SearchBox from '../../components/dashboard/search-box/SearchBox';
import SearchResults from '../../components/dashboard/search-results/SearchResults';

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <SearchBox />
            <SearchResults />
        </>
    )
}