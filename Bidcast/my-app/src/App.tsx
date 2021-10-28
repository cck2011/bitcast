import React, { useEffect, useState, useRef } from "react";
import "react-custom-scroll/dist/customScroll.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.scss";
import LiveStream from "./pages/LiveStream/LiveStream";
import { Route, Switch } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { HomePageNavbar } from "./pages/homepage/Navbar";
import { Footer } from "./pages/homepage/Footer";
import { CreateBids } from "./pages/createbids/CreateBids";
import LiveStreamSeller from "./pages/LiveStream/LiveStreamSeller";
import { Homepage } from "./pages/homepage/Homepage";
import { ProfilePage } from "./pages/Profile-Page/Profilepage";
import { SearchResults } from "./pages/categories/SearchResult";
import { useDispatch, useSelector } from "react-redux";
import { checkCurrentUser } from "./redux/user/actions";
// import { CreateBids } from "./pages/createbids/CreateBids";
import { useAdBlockDetector } from "adblock-detector-hook";
import { RootState } from "./store";

import { CategoriesFilter } from "./pages/categories/CategoriesFilter";
import { FilterProducts } from "./pages/categories/FilterProducts";
import { menuIconClick } from "./redux/utility/actions";

function App() {
    const dispatch = useDispatch();
    const [isAlertChecked, setIsAlertChecked] = useState(false);
    const userInfo = useSelector((state: RootState) => state.authState.user);
    const isAuthenticate = useSelector(
        (state: RootState) => state.user.isAuthenticate
    );
    const menuCollapse = useSelector(
        (state: RootState) => state.utility.menuCollapse
    );
    const appRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const closeMenu = (e: MouseEvent) => {
            if (!menuCollapse && e.clientY > 374) {
                dispatch(menuIconClick(menuCollapse, true));
            }
        };
        if (appRef && appRef.current) {
            appRef.current.addEventListener("click", closeMenu);
            return () => {
                if (appRef && appRef.current) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    appRef.current.removeEventListener("click", closeMenu);
                }
            };
        }
    }, [dispatch, menuCollapse]);

    // const history = useHistory();
    // const toaster = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if (!isAlertChecked) {
            dispatch(checkCurrentUser());

            setIsAlertChecked(true);
        }
        // (dispatch(push('/profilePage/accountDetails')))
        // //    ( isAlertChecked(`請到個人頁面更改電話號碼`))
    }, [dispatch, isAlertChecked, userInfo, isAuthenticate]);

    const { detected } = useAdBlockDetector();
    <div>AdBlocker Detected: {JSON.stringify(detected)}</div>;

    const dummy = useSelector((state: RootState) => state.liveStream.dummy);

    return (
        <div className="App" ref={appRef}>
            {/* {} */}
            {detected ? (
                <div className="turn_off_adblock">
                    Please Turn Off Your Adblock!!
                </div>
            ) : (
                <>
                    <HomePageNavbar />
                    {/* <LiveStream /> */}
                    {/* <CreateBids /> */}

                    <Switch>
                        {/* <Route path="/" ><Homepage /></Route> */}
                        <Route path="/" exact>
                            <Homepage />
                        </Route>
                        <Route path="/createBids">
                            <CreateBids />
                        </Route>
                        <Route path="/liveStreaming" key={dummy}>
                            <LiveStream />
                        </Route>
                        <Route path="/liveStreamingSeller">
                            <LiveStreamSeller />
                        </Route>
                        <Route path="/searchResult">
                            <SearchResults />
                        </Route>
                        <Route path="/categoryResult">
                            <CategoriesFilter />
                        </Route>
                        <Route path="/filteredProducts">
                            <FilterProducts />
                        </Route>
                        <Route path="/profilePage">
                            <ProfilePage />
                        </Route>
                        <Route path="/loginPage">
                            <LoginPage />
                        </Route>
                    </Switch>
                    <Footer />
                </>
            )}
        </div>
    );
}

export default App;
