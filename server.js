import express from 'express';
import cors from 'cors';
import pg from 'pg';
import Knex from 'knex';
import bcrypt from 'bcrypt';
import {handleRegister} from './Controllers/register.js';
import {handleSignin} from './Controllers/signin.js';
import {handleProfileGet} from './Controllers/profile.js';
import {handleImage, handleApiCall} from './Controllers/image.js';



const db = Knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'john',
    password : 'Guitar$23',
    database : 'smart_brain'
  }
});



const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'John@gmail.com',
			// password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sylvia',
			email: 'Sylvia@gmail.com',
			// password: 'icecream',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) =>{
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
	handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
	handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
	handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
	handleApiCall(req, res)
})



app.listen(3001, () => {
	console.log("app is running on port 3001");
});

