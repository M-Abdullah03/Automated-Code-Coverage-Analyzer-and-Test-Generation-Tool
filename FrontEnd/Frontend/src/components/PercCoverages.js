import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';

const PercCoverages = () => {
    const [divContent, setDivContent] = useState('');

    useEffect(() => {
        fetch('main.js.html')   //
            .then((response) => response.text())
            .then((data) => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(data, 'text/html');
                const div = htmlDocument.querySelector('div.clearfix');
                if (div) {
                    setDivContent(div.outerHTML);
                } else {
                    console.error('Element with selector "table.coverage" not found');
                }
            });
    }, []);

    return (
        <Card style={{ boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)' }}>
            <CardContent>
                <div className="perc-cov" dangerouslySetInnerHTML={{ __html: divContent }} />
            </CardContent>
        </Card>
    );
};

export default PercCoverages;