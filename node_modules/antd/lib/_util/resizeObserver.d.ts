import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
interface ResizeObserverProps {
    children?: React.ReactNode;
    disabled?: boolean;
    onResize?: () => void;
}
interface ResizeObserverState {
    height: number;
    width: number;
}
declare class ReactResizeObserver extends React.Component<ResizeObserverProps, ResizeObserverState> {
    resizeObserver: ResizeObserver | null;
    state: {
        width: number;
        height: number;
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    onComponentUpdated(): void;
    onResize: ResizeObserverCallback;
    destroyObserver(): void;
    render(): {} | null;
}
export default ReactResizeObserver;
