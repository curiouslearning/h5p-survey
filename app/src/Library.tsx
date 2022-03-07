import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';

declare var H5P: any;

import App from './App';
import store from './store';

export default class Library extends (H5P.EventDispatcher as { new(): any }) {
    constructor(config: any, contentId: string, contentData: any = {}) {
        super();
        this.config = config;
        this.contentId = contentId;
        this.$element = document.createElement('div');
        this.$element.style = 'min-height: 600px; display: flex; height: 100%;';
    }

    attach = function($wrapper: JQuery) {
        $wrapper.get(0).appendChild(this.$element);
        const $ = H5P.jQuery;

        $(document).ready(() => {
            render(
                <Provider store={store}>
                    <App
                        buckets={this.config.buckets}
                        config={this.config}
                        contentId={this.contentId}
                    />
                </Provider>,
                this.$element
            );
        })
    }
}
