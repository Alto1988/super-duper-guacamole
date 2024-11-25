import {configureStore} from "@/app/redux-files/Store";
import {Provider} from "react-redux";
import React from "react";

const store = configureStore();

export const QARootComponent = () => {
    return (
        // eslint-disable-next-line react/no-children-prop
        <Provider store={store} children={undefined}>

        </Provider>
    );
};