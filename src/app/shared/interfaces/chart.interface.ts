export interface ChartResponseData {
    chart: Chart;
}

interface Chart {
    result: Result[];
}

export interface Result {
    timestamp: number[];
    indicators: Indicators;
}

interface Indicators {
    quote: Quote[];
}

interface Quote {
    open: number[]
}
