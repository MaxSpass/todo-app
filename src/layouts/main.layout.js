import React, {Component} from 'react';
// import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';

function mapStateToProps(state) {
    return {};
}

function MainLayout(props) {
    return(
        <div className="layout-main">
            <Container maxWidth="sm">
                {props.children}
            </Container>
        </div>
    )
}

// export default connect(
//     mapStateToProps,
// )(MainLayout);

export default MainLayout;