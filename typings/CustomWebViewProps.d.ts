/**
 * This file was generated from CustomWebView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export interface CustomWebViewProps<Style> {
    name: string;
    style: Style[];
    url: DynamicValue<string>;
    appIP?: DynamicValue<string>;
    onLoad?: ActionValue;
    onError?: ActionValue;
    onMessage?: ActionValue;
    onMessageInput?: EditableValue<string>;
    userAgent: string;
    openLinksExternally: boolean;
}

export interface CustomWebViewPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    url: string;
    appIP: string;
    onLoad: {} | null;
    onError: {} | null;
    onMessage: {} | null;
    onMessageInput: string;
    userAgent: string;
    openLinksExternally: boolean;
}
