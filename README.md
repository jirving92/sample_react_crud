## Sample CRUD application to add, remove, edit, and delete users ##

### Frontend ###
* ReactJS
* Javascript
* HTML5
* CSS

### Backend ###
* MySQL (local)
* NodeJS
* Javascript
* ExpressJS

To create database to test locally:
```
CREATE DATABASE sample;
use sample;

CREATE TABLE users (
id INT AUTO_INCREMENT,
username VARCHAR(255) NOT NULL UNIQUE,
fname VARCHAR(255) NOT NULL,
lname VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);
```

### To Run ###
* Pull from git
* Ppen root of the project in two separate command line shells
* Install npm if not already installed on the system
* Run ```npm install``` to install all dependencies
* In the first command line shell, enter ```cd server\Backend```
* Run ```npm start```
* In the second command line shell, enter ```cd client\frontend```
* Run ```npm start``` 
* The app will then run at the url localhost:3000. Enjoy!


### Code Highlights ###
#### Backend ####
Code that controls the routing and the queries
```/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.connection.query('SELECT * from users', (err, results, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(results))
  });
});

// Create a new user
router.post('/create', (req, res, next) => {
  var create_sql = "INSERT INTO users(username, fname, lname, password) VALUES ('"+req.body.username+"','"+req.body.fname+"','"+req.body.lname+"','"+req.body.password+"')";
  res.locals.connection.query(create_sql, (err, results, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
});

// Edit a user
router.post('/edit', (req, res, next) => {
  var edit_sql = "UPDATE users SET fname = '"+req.body.fname+"', lname = '"+req.body.lname+"' WHERE id = '"+req.body.id+"'";
  res.locals.connection.query(edit_sql, (err, results, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
});

// Delete a user
router.post('/delete', (req, res, next) => {
  var delete_sql = "DELETE from users WHERE id = '"+req.body.id+"'";
  res.locals.connection.query(delete_sql, (err, results, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
}); 
```

#### Front End ####
Example of a front end component to create a user
```
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            fname: '',
            lname: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var data = {
            username: this.state.username,
            fname: this.state.fname,
            lname: this.state.lname,
        }

        fetch("/users/create", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server.");
            }
            window.location.reload();
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} method="POST">
                    <label>Username</label>
                    <input className="form-control" name='username' value={this.state.username} onChange={this.handleChange} />
                    <br></br>
                    <label>First Name</label>
                    <input className="form-control" name='fname' value={this.state.fname} onChange={this.handleChange} />
                    <br></br>
                    <label>Last Name</label>
                    <input className="form-control" name='lname' value={this.state.lname} onChange={this.handleChange} />
                    <br></br>
                    <div className="submit-section">
                        <button className="submit">Submit</button></div>
                </form>
            </div>
        );
    }
    ```
