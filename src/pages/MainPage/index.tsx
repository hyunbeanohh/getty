import React from "react";
import Header from "../../components/Header"
import SearchBar from "../../components/SearchBar"
import NowApplyClub from "../../components/NowApplyClub"

function MainPage() {
    return (
        <div className="w-full h-screen bg-gray-100">
            <Header />
            <SearchBar />
            <NowApplyClub />
        </div>
    );
}

export default MainPage;