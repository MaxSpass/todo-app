import React from 'react';
import Container from '@material-ui/core/Container';


function MainLayout(props) {
    return(
        <div className="layout-main">
            <Container maxWidth="sm">
                {props.children}
            </Container>
        </div>
    )
}

export default MainLayout;