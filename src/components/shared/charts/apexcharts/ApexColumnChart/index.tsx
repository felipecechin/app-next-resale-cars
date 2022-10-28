import { useEffect, useState } from 'react';

import Chart from 'react-apexcharts';
import _ from 'lodash';

interface ApexColumnChartProps {
    data: object[];
    categoriesKey: string;
    dataKey: string;
    id: string;
    height: string[];
    dataName: string;
    xAxisLabelsOptions?: object;
}


function ApexColumnChart({ data, categoriesKey, dataKey, id, height, dataName, xAxisLabelsOptions = {} }: ApexColumnChartProps): JSX.Element {
    const [series, setSeries] = useState<ApexAxisChartSeries>([]);
    const [options, setOptions] = useState({});

    useEffect(() => {
        const seriesData = _.map(data, dataKey);
        const categories = _.map(data, categoriesKey);
        const breakpoints = [640, 768, 1024, 1280]
        const responsiveHeights = _.map(height, (item, index) => {
            return {
                breakpoint: breakpoints[index],
                options: {
                    chart: {
                        height: item ? item : 'auto'
                    }
                }
            }
        })
        const series = [{
            name: dataName,
            data: [
                ...seriesData || [30, 20, 50]
            ]
        }];
        setSeries(series)
        const options = {
            chart: {
                id: id || 'basic-chart',
                height: height ? height[0] : 'auto',
                toolbar: {
                    show: false,
                }
            },
            xaxis: {
                labels: {
                    ...xAxisLabelsOptions
                },
                categories: [...categories] || [1995, 1992, 2001],
            },
            colors: ['#0e7490'],
            responsive: [...responsiveHeights]
        }
        setOptions(options)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <Chart
            height={height && height[height.length - 1] ? height[height.length - 1] : 'auto'}
            options={options}
            series={series}
            type="bar"
        />
    );
}

export default ApexColumnChart;