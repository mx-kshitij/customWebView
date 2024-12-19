import { ReactElement, createElement, useEffect, useState } from "react";
import { TextStyle, ViewStyle, View, Linking } from "react-native";
import { Style } from "@mendix/pluggable-widgets-tools";
import { WebView as RNWebView, WebViewNavigation } from "react-native-webview";
// import { HelloWorld } from "./components/HelloWorld";
import { CustomWebViewProps } from "../typings/CustomWebViewProps";
import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";
import { ValueStatus } from 'mendix';

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export function CustomWebView({
    style,
    name,
    url,
    appIP,
    onLoad,
    onError,
    onMessage,
    onMessageInput,
    userAgent,
    openLinksExternally
}: CustomWebViewProps<CustomStyle>): ReactElement {

    const [uri, setUri] = useState<string>('');
    const styles = mergeNativeStyles(defaultWebViewStyle, style);

    useEffect(() => {
        if (appIP && uri.startsWith('http://localhost'))
            //@ts-ignore
            setUri(uri.replace('localhost', appIP?.value))
    }, [uri])

    useEffect(() => {
        if (url && url.status === ValueStatus.Available) {
            setUri(url.value);
        }
    }, [url]);

    if (url && url?.status != ValueStatus.Available) {
        return <View />;
    }

    const onLoadHandler = () => {
        if (onLoad?.canExecute && !onLoad.isExecuting)
            onLoad?.execute();
    }

    const onErrorHandler = () => {
        if (onError?.canExecute && !onError.isExecuting)
            onError?.execute();
    }

    const onMessageHandler = (input: string) => {
        onMessageInput?.setTextValue(input);
        if (onMessage?.canExecute && !onMessage.isExecuting)
            onMessage?.execute();
    }

    const sanitize = (url: string) => {
        return url.toLowerCase().replace(/\/$/, "");
    }

    const navStateChangeHandler = (navigationState: WebViewNavigation) => {
        let wvuri = navigationState.url;
        if (appIP && wvuri.startsWith('http://localhost'))
            //@ts-ignore
            setUri(wvuri.replace('localhost', appIP?.value))
    }

    return (
        <View style={styles.container} testID={name}>
            <RNWebView
                source={{ uri: uri! }}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                onLoad={onLoadHandler}
                onError={onErrorHandler}
                onMessage={event => {
                    onMessageHandler(event.nativeEvent.data);
                }}
                onNavigationStateChange={(navState) => {navStateChangeHandler(navState)}}
                userAgent={userAgent}
                onShouldStartLoadWithRequest={({ url }) => {
                    const sanitizedUrl = sanitize(url);
                    const openExternally =
                        openLinksExternally &&
                        (uri && sanitizedUrl !== sanitize(uri));
                    if (openExternally) {
                        Linking.openURL(url);
                        return false;
                    }
                    return true;
                }}
            />
        </View>
    );
}

const defaultWebViewStyle: Style = {
    container: {
        flex: 1,
        height: "100%",
        minHeight: 300
    },
    errorContainer: {},
    errorText: {
        color: "red",
        fontWeight: "bold"
    }
};