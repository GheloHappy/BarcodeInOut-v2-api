const express = require('express');
const app = express();
const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'Passw0rd',
    server: '192.168.1.248',
    database: 'MLDIAPP',
    cryptoCredentialsDetails: {
        minVersion: 'TLSv1'
    },
    options:{
        trustedConnection: true,
        encrypt: false
    }
};

app.get('/api/v1/getDtSummary', (req, res) => {
    sql.connect(config, err => {
        if (err) console.log(err);

        const request = new sql.Request();
        request.query("SELECT * FROM barcodesys_summary_of_delivery_api", (err, result) => {
            if (err) console.log(err);

            res.send(result.recordset);
        });
    });
});

app.get('/api/v1/getDtSummaryByDate/:date', (req, res) => {
    const date = req.params.date;
    sql.connect(config, err => {
        if (err) console.log(err);
        const request = new sql.Request();
        request.input('date', date);
        request.query("SELECT * FROM barcodesys_summary_of_delivery_api WHERE QtyShip != 0 AND OrdDate = @date", (err, result) => {
            if (err) console.log(err);

            res.send(result.recordset);
        });
    });
});

app.get('/api/v2/getDtSummaryByDate/:date', (req, res) => {
    const date = req.params.date;
    sql.connect(config, err => {
        if (err) console.log(err);
        const request = new sql.Request();
        request.input('date', date);
        request.query("SELECT * FROM barcodesys_CutDt_api WHERE QtyShip != 0 AND OrdDate = @date", (err, result) => {
            if (err) console.log(err);

            res.send(result.recordset);
        });
    });
});

app.get('/api/v2/getVanByDate/:date', (req, res) => {
    const date = req.params.date;
    sql.connect(config, err => {
        if (err) console.log(err);
        const request = new sql.Request();
        request.input('date', date);
        request.query("SELECT * FROM a_mldi_transfer WHERE TranDate = @date", (err, result) => {
            if (err) console.log(err);

            res.send(result.recordset);
        });
    });
});

app.get('/api/v2/getOsByDate/:date', (req, res) => {
    const date = req.params.date;
    sql.connect(config, err => {
        if (err) console.log(err);
        const request = new sql.Request();
        request.input('date', date);
        request.query("SELECT * FROM barcodesys_summary_of_os_api WHERE User9 = @date", (err, result) => {
            if (err) console.log(err);

            res.send(result.recordset);
        });
    });
});

app.get('/api/v2/getIssueByDate/:date', (req, res) => {
    const date = req.params.date;
    sql.connect(config, err => {
        if (err) console.log(err);
        const request = new sql.Request();
        request.input('date', date);
        request.query("SELECT * FROM barcodesys_issuing_api WHERE TranDate = @date", (err, result) => {
            if (err) console.log(err);

            res.send(result.recordset);
        });
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
