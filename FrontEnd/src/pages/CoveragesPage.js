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
        let coverages = JSON.parse(localStorage.getItem('coverages'));
        let conditionalcovg=[];
        let descisioncovg=[];

        // let groupedData = coverages.reduce((acc, coverage) => 
        if(coverages.error)
        {
            alert("Error in getting coverages");
            return
        }
       
        // const tempData = coverages.map(coverage => ({
        //     name: coverage.type.charAt(0).toUpperCase() + coverage.type.slice(1),
        //     percentage: coverage.coverage
        // }));
        // tempData.push({
        //     name: 'Functional',
        //     percentage: 100
        // });
     
        let groupedData = coverages.reduce((acc, coverage) => {
            const key = coverage.functionName;
            if (!acc[key]) {
                acc[key] = {
                    name: key,
                    types: []
                };
            }
            acc[key].types.push({
                name: coverage.type.charAt(0).toUpperCase() + coverage.type.slice(1),
                percentage: coverage.coverage,
                testCases: coverage.testCases
            });

            return acc;
        }, {});
        console.log(groupedData);
    //    for(let i=0;i<coverages.length;i++){
    //             let x,y;
    //             groupedData[coverages[i].functionName].types.push({
    //                 name: "Functional",
    //                 percentage: 100,
    //                 testCases: coverages[i].testCases
    //             });
    //             groupedData[coverages[i].functionName].types.foreach((element)=>
    //             {
    //                 if(element.name=="Condition"){
    //                     conditionalcovg.push(element.percentage);
    //                     x=element.percentage;
    //                 }
    //                 else if(element.name=="Decision"){
    //                     descisioncovg.push(element.percentage);
    //                     y=element.percentage;
    //                 }

    //             });
    //             groupedData[coverages[i].functionName].types.push({
    //                 name: "mcdc",
    //                 percentage: (x+y)/2,
    //                 testCases: coverages[i].testCases
    //             });
    //         }


        let groupedDataArray = Object.values(groupedData);
        console.log(groupedDataArray);
        groupedDataArray.forEach((element)=>{
            let x=0,y=0;
           
            element.types.push({
                name: "Functional",
                percentage: 100,
                testCases: element.testCases
            });
            element.types.forEach((elements)=>
            {
                console.log(elements.name);
                console.log(elements.percentage);
            
                if(elements.name=="Condition"){
                    conditionalcovg.push(elements.percentage);
                    x=elements.percentage;
                }
                else if(elements.name=="Branch"){
                    descisioncovg.push(elements.percentage);
                    y=elements.percentage;
                }

            });
            element.types.push({
                name: "mcdc",
                percentage: (x+y)/2,
                testCases: element.testCases
            });


        });
      
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