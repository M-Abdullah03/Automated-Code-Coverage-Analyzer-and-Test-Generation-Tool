import React, { useEffect, useState } from 'react';
import BarGraph from '../components/BarGraph.js';
import CoverageTable from '../components/CoverageTable.js';
import PercCoverages from '../components/PercCoverages.js';
import LineCoverage from '../components/LineCoverage.js';
import { Button } from '@mui/material';
import html2pdf from 'html2pdf.js';
import '../styles/CoveragesPage.css'

const CoveragesPage = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const coverages = JSON.parse(localStorage.getItem('coverages'));
        // const tempData = coverages.map(coverage => ({
        //     name: coverage.type.charAt(0).toUpperCase() + coverage.type.slice(1),
        //     percentage: coverage.coverage
        // }));
        // tempData.push({
        //     name: 'Functional',
        //     percentage: 100
        // });

        const data = [ /* your data */];

        // Group data by functionName and type
        const groupedData = data.reduce((acc, coverage) => {
            const key = coverage.functionName;
            if (!acc[key]) {
                acc[key] = {
                    name: key,
                    types: {}
                };
            }
            acc[key].types[coverage.type] = coverage;
            return acc;
        }, {});

        // Calculate MC/DC for each function
        Object.values(groupedData).forEach(functionData => {
            const conditionCoverage = functionData.types.condition ? functionData.types.condition.coverage : 0;
            const decisionCoverage = functionData.types.branch ? functionData.types.branch.coverage : 0;
            const mcdcCoverage = (conditionCoverage + decisionCoverage) / 2;
            functionData.types.mcdc = {
                type: 'MC/DC',
                coverage: mcdcCoverage,
                testCases: [] // Add appropriate test cases if available
            };
            functionData.types.mcdc = {
                type: 'Functional',
                coverage: 100,
                testCases: [] // Add appropriate test cases if available
            };
        });

        console.log(groupedData);
        let groupedDataArray = Object.values(groupedData);
        setData(groupedDataArray);

        console.log(groupedData);
        //console.log(tempData);
        setData(groupedDataArray);
    }, []);

    const exportPDF = async () => {
        const element = document.querySelector('.coverage');
        //remove button from pdf
        element.querySelector('.exp-btn').setAttribute('style', 'display: none');
        const opt = {
            margin: 1,
            filename: 'CoverageReport.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'Tabloid', orientation: 'landscape' }
        };
        await html2pdf().from(element).set(opt).save();
        //add button back
        element.querySelector('.exp-btn').setAttribute('style', 'display: block');

    };

    const getTests = () => {
        fetch('http://localhost:3000/getTests')
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                // the filename you want
                a.download = 'test.js';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <div className="coverage">
                <div className='heading'>
                    <h1>Coverage Report</h1>
                    <Button className='exp-btn' onClick={exportPDF}>Export PDF</Button>
                    <Button className='exp-btn2' onClick={getTests}>Get Tests</Button>
                </div>
                <div className='top'>
                    <div className='stats'>
                        {data.length > 0 && data.map((coverage, index) => (
                            <div className='stat-card'>
                                <h1>{coverage.name}</h1>
                                <div className='stat'>
                                    <BarGraph key={index} data={coverage.types} />
                                    <CoverageTable key={index} data={coverage.types} />
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <LineCoverage />
            </div>
        </>
    );
};

export default CoveragesPage;