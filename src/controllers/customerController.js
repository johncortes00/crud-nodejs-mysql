const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            console.log(customers);
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer set ?', [data], (err, customer) => {
            if (err) {
                console.log("err: " + err);
            }
            console.log("customer: " + customer);
            res.redirect('/');
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM CUSTOMER WHERE id = ?', [id], (err, customer) => {
            console.log(customer);
            res.render('customer_edit', {
                data: customer[0]
            });
        });
        /*        conn.query('UPDATE CUSTOMER SET ? WHERE id = ?', [id], (err, rows) => {
        
                });*/
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    /*console.log(req.params.id);
    res.send("works");*/
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer where id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};

module.exports = controller;
