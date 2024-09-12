export const fetchCandlestickData = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/candlestick-data/');
    return await response.json();
};

export const fetchLineChartData = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/line-chart-data/');
    return await response.json();
};

export const fetchBarChartData = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/bar-chart-data/');
    return await response.json();
};

export const fetchPieChartData = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/pie-chart-data/');
    return await response.json();
};
