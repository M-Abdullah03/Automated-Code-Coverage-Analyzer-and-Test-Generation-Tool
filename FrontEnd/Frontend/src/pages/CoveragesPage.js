import React, { useState } from 'react';
import BarGraph from '../components/BarGraph.js';
import CoverageTable from '../components/CoverageTable.js';
import PercCoverages from '../components/PercCoverages.js';
import LineCoverage from '../components/LineCoverage.js';
import { Button } from '@mui/material';
import html2pdf from 'html2pdf.js';
import '../styles/CoveragesPage.css'

const data = [
    { name: 'Statements', percentage: 100 },
    { name: 'Branches', percentage: 90 },
    { name: 'Decisions', percentage: 75 },
    { name: 'Conditions', percentage: 85 },
    { name: 'MCDC', percentage: 70 },
    { name: 'Functions', percentage: 95 },
    // add more data as needed
];

const CoveragesPage = () => {

    
    
    const exportPDF = () => {
        const element = document.querySelector('.coverage');
        const opt = {
            margin: 1,
            filename: 'CoverageReport.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'Tabloid', orientation: 'landscape' }
        };
        html2pdf().from(element).set(opt).save();
    };

    return (
        <>
            <div className="coverage">
                <div className='heading'>
                    <h1>Coverage Report</h1>
                    <Button className='exp-btn' onClick={exportPDF}>Export PDF</Button>
                </div>
                <div className='top'>
                    <BarGraph data={data} />
                    <CoverageTable data={data} />
                </div>
                <PercCoverages />
                <LineCoverage />
            </div>
        </>
    );
};

export default CoveragesPage;