const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors');


app.use(cors());
app.use(express.json());


const db = mysql2.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'M@rquefen87',
    database: 'blood_bank_ms'
});

app.post('/create', (req, res) => {
    const nationalId = req.body.nationalId;
    const donorName = req.body.donorName;
    const birthDate = req.body.birthDate;
    const gender = req.body.gender;
    const bloodGroup = req.body.bloodGroup;
    const address = req.body.address;
    const contactNumber = req.body.contactNumber;
    const email = req.body.email;
    const diseases = req.body.diseases;
    

    db.query(
        'INSERT INTO all_donors (national_id, full_name, birth_date, gender, blood_group, address, contact_number, email, diseases) VALUES (?,?,?,?,?,?,?,?,?)',
        [nationalId, donorName, birthDate, gender, bloodGroup, address, contactNumber, email, diseases],
        (err, result) => {
           if(err){
               console.log(err);
           }
           else{
               res.send('Values Inserted');
           }
        }
    );
});

app.post('/makerequest', (req, res) => {
    const hospitalName = req.body.hospitalName;
    const doctorName = req.body.doctorName;
    const patientName = req.body.patientName;
    const location = req.body.location;
    const bloodUnits = req.body.bloodUnits;
    const bldGrp = req.body.bldGrp;
    const reason = req.body.reason;
    const status = 'Pending';

    db.query(
        'INSERT INTO requests (hospital_name, doctor_name, patient_name, location, blood_units, blood_group, reason, status) VALUES (?,?,?,?,?,?,?,?)',
        [hospitalName, doctorName, patientName, location, bloodUnits, bldGrp, reason, status],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send('request successfully added');
            }
        }
    )
})

app.post('/newdonation', (req, res) => {
    const donorId = req.body.donorId;
    const donQuantity = req.body.donQuantity;
    const donBloodGrp = req.body.donBloodGrp;
    const donBloodBank = req.body.donBloodBank;

    db.query(
        'INSERT INTO donations (donor_id, quantity, blood_group, blood_bank) VALUES (?,?,?,?)',
        [donorId, donQuantity, donBloodGrp, donBloodBank],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send('success');
            }
        }
    )
})

app.post('/donorlogin', (req, res) => {
    const loginUsername = req.body.loginUsername;
    const loginPassword = req.body.loginPassword;

    db.query(
        'SELECT * FROM all_donors WHERE full_name = ? AND national_id = ?',
        [loginUsername, loginPassword],
        (err, result) => {
            if(err){
                res.send({err: err});
            } else if(result.length > 0){
                res.send(result);
            } else {
                res.send({message: 'Invalid username/password'});
            }
        }
    )
})

app.get('/bbank', (req, res) => {
    db.query('SELECT * FROM blood_banks', (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
    })
})

app.get('/allbloods', (req, res) => {
    db.query('SELECT SUM(a_pos_quantity), SUM(b_pos_quantity), SUM(ab_pos_quantity), SUM(o_pos_quantity), SUM(a_neg_quantity), SUM(b_neg_quantity), SUM(ab_neg_quantity), SUM(o_neg_quantity)  FROM blood_banks', (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
    
})

app.get("/donors", (req, res) => {
    db.query('SELECT * FROM all_donors', (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get('/showrequests', (req, res) => {
    db.query('SELECT * FROM requests', (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get('/approvestatus', (req, res) => {
    db.query('SELECT * FROM requests WHERE status = ?',
    ['Approved'],
    (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

app.get('/allstatus', (req, res) => {
    db.query('SELECT * FROM requests', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

app.put("/updateapos", (req, res) => {
    
    const donBloodBank = req.body.donBloodBank;
    const donQuantity = req.body.donQuantity;

    db.query(
        'UPDATE blood_banks SET a_pos_quantity = a_pos_quantity + ? WHERE bank_name = ?',
        [donQuantity, donBloodBank],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result)
                console.log(result);
            }
        }
    )
})

app.put("/updateaneg", (req, res) => {
    
    const donBloodBank = req.body.donBloodBank;
    const donQuantity = req.body.donQuantity;

    db.query(
        'UPDATE blood_banks SET a_neg_quantity = a_neg_quantity + ? WHERE bank_name = ?',
        [donQuantity, donBloodBank],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result)
                console.log(result);
            }
        }
    )
})

app.put("/updatebpos", (req, res) => {
    
    const donBloodBank = req.body.donBloodBank;
    const donQuantity = req.body.donQuantity;

    db.query(
        'UPDATE blood_banks SET b_pos_quantity = b_pos_quantity + ? WHERE bank_name = ?',
        [donQuantity, donBloodBank],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result)
                console.log(result);
            }
        }
    )
})

app.put("/updatebneg", (req, res) => {
    
    const donBloodBank = req.body.donBloodBank;
    const donQuantity = req.body.donQuantity;

    db.query(
        'UPDATE blood_banks SET b_neg_quantity = b_neg_quantity + ? WHERE bank_name = ?',
        [donQuantity, donBloodBank],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result)
                console.log(result);
            }
        }
    )
})

app.put("/updateabpos", (req, res) => {
    
    const donBloodBank = req.body.donBloodBank;
    const donQuantity = req.body.donQuantity;

    db.query(
        'UPDATE blood_banks SET ab_pos_quantity = ab_pos_quantity + ? WHERE bank_name = ?',
        [donQuantity, donBloodBank],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result)
                console.log(result);
            }
        }
    )
})

app.put("/updateabneg", (req, res) => {
    
    const donBloodBank = req.body.donBloodBank;
    const donQuantity = req.body.donQuantity;

    db.query(
        'UPDATE blood_banks SET ab_neg_quantity = ab_neg_quantity + ? WHERE bank_name = ?',
        [donQuantity, donBloodBank],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result)
                console.log(result);
            }
        }
    )
})

app.put("/updateopos", (req, res) => {
    
    const donBloodBank = req.body.donBloodBank;
    const donQuantity = req.body.donQuantity;

    db.query(
        'UPDATE blood_banks SET o_pos_quantity = o_pos_quantity + ? WHERE bank_name = ?',
        [donQuantity, donBloodBank],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result)
                console.log(result);
            }
        }
    )
})

app.put("/updateoneg", (req, res) => {
    
    const donBloodBank = req.body.donBloodBank;
    const donQuantity = req.body.donQuantity;

    db.query(
        'UPDATE blood_banks SET o_neg_quantity = o_neg_quantity + ? WHERE bank_name = ?',
        [donQuantity, donBloodBank],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result)
                console.log(result);
            }
        }
    )
})

app.put('/reqapprove', (req, res) => {
    const status = req.body.status;
    const id = req.body.id;

    db.query(
        'UPDATE requests SET status = ? WHERE id = ?',
        [status, id],
        (err, result) => {
            if(err){
                console.log(err);
            }else {
                res.send(result);
            }
        }
    )
})

app.put('/reqreject', (req, res) => {
    const status = req.body.status;
    const id = req.body.id;

    db.query(
        'UPDATE requests SET status = ? WHERE id = ?',
        [status, id],
        (err, result) => {
            if(err){
                console.log(err);
            }else {
                res.send(result);
            }
        }
    )
})

app.listen(3001, () => {
    console.log('your server is running')
})