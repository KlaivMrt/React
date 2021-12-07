import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./components/Welcome";
import Grid from "./components/Grid";
import Field from "./components/Field";
import GlobalProvider from "./components/context/GlobalProvider";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom"


function App(){


    return(
        <BrowserRouter>
                <Routes>
                    <Route exact={"/"} path={"/"} element={<Welcome/>}/>
                    <Route path={"/archive"} element={<GlobalProvider><Grid/></GlobalProvider>}/>
                    <Route path={"your-field"} element={<GlobalProvider><Field/></GlobalProvider>}/>
                    {/*<Route element={<Global.Provider><Menu/></Global.Provider>}/>*/}
                </Routes>
        </BrowserRouter>
    )
}

ReactDOM.render(<App/>, document.getElementById("root"))