import React from 'react';
import MainLayout from "./layouts/main.layout";
import InputSearch from "./components/search/InputSearch";

function App() {
    //@TODO ???
    const [value, setValue] = React.useState('');
    return (
        <MainLayout>
            <h1>TODO_APP</h1>
            <InputSearch text={value} />
        </MainLayout>
    )
}

export default App;
