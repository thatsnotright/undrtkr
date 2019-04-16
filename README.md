# undrtkr
Undrtkr: Task Management

To run backend python:
Designed to run against PostGRES, please ensure that backend/settings.py has credentials required to create the schema

To run the backend tests:
cd backend
./manage.py test

To run as a dev server:
./manage.py runserver


For the React front end:

Ensure you have node and nvm:
$ node -v
v11.13.0
$ npm -v
6.7.0

cd frontend
npm i && npm run start

This will launch webpack dev server and you should be able to navigate to http://localhost:3000/

NOTE: please ensure you alias testserver to resolve to your local address, you can do this by modifying /etc/hosts and adding the entry:
127.0.0.1	testserver


