# Create A Book Review Site

## Scaffolding

- Recommend using Express Generator `express --no-view [my folder name]`
- Be sure to add: `pg-promise`
- Be sure to add: ES6 Render Templates
- Be sure to add: `bycrypt`
- Be sure to add: `express-session`

## Database Tables

- Users
- Books
- Reviews

** _CREATE A `SCHEMA.SQL` FILE!_ **

- What tables do I need?
- What goes in those tables?
- What are the relationships??

** _CREATE A `SEED.SQL` FILE!_ **

Save some sample data...

## Node + Express

- `pg-promise` - This talks to squirrels (j/k, it talks to Postgres)
- ES6 Render Template - Creates our views
- `bcrypt` + `express-session` - User password hashing/session management

## App Structue (10,000 ft view)

- BOOKS -> have data -> saved in PSQL
- USERS -> bcrypt -> login to the App, that's running in Node and Express -> have data -> saved in PSQL
- REVIEWS -> have data, that is linked to BOOKS and USERS -> saved in PSQL

## App Flow (suggested)

- HOMEPAGE
  - localhost:3000
- BOOKS ROUTE -> Plural -> Singular
  - `GET` localhost:3000/books
  - `GET` localhost:3000/books/:books_id
- BOOKS (singular) -> Details -> Read Reviews/Add Review
- USERS (Who are logged in) -> Submit a Review
- USERS (Not logged in) -> Read Reviews

## ** _Possible Stretch Goals_ **

- Just gonna leave this here (api for book data from ISBN lookup)... https://isbndb.com/apidocs/v2
- Just gonna leave this here as well (Goodreads api data)... https://www.goodreads.com/api/documentation
