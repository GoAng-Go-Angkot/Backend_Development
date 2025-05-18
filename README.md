# Goang - Backend

<hr/>


## Local Setup Guide

Follow these steps to run the REST API locally.

#### 1. Prerequisites

* **Git** installed on your machine
* **Node.js** (v14 or higher) and **npm**
* **PostgreSQL**

#### 2. Clone the Repository

```bash
# Replace the url with this repo's url
git clone https://github.com/username/repo-name.git
cd repo-name
```

#### 3. Install Dependencies

```bash
npm install
```


#### 4. Create the Database

Create a new database:

   * **macOS/Linux (psql CLI):**

     ```bash
     psql -U postgres -c "CREATE DATABASE goang;"
     ```
   * **Windows (PowerShell or CMD):**

     ```powershell
     psql -U postgres -c "CREATE DATABASE goang;"
     ```

     *Or use pgAdmin UI to right-click on Databases → Create → Database and fill in the name. database must be run first*


#### 5. Configure Environment Variables

1. Open or create `.env` in your editor and copy paste the content from .env.example:

   ```dotenv
    POSTGRESQL_HOST=fill_yours
    POSTGRESQL_PORT=fill_yours
    POSTGRESQL_USERNAME=fill_yours
    POSTGRESQL_PASSWORD=fill_yours
    POSTGRESQL_DB=fill_yours
    JWT_SECRET_DRIVER=fill_yours
    JWT_SECRET_CLIENT=fill_yours
   ```
    you can use random string generator to fill JWT_SECRET_DRIVER and JWT_SECRET_CLIENT
2. Save the file.

#### 6. Run Database Seeder

```bash
npm run seed
```

*(This will create the required tables.)*

#### 7. Start the Server

```bash
npm run dev
```

You should see a message like:

```
Server running on port 3000
```

#### 8. Access the API Documentation

Open your browser and navigate to the provided docs URL:

```
http://localhost:3000/api-docs/
```

You should see the interactive Swagger documentation.


You’re all set! If you encounter issues, check your terminal logs and ensure your `.env` credentials match your database settings.


<hr/>

## Web Socket Usage

Tracking Model : [excalidraw](https://excalidraw.com/#json=CrAvZ6N7gbWDDndokfLqm,jQemgkFEkTERY8DT_frFJQ)
Example Connection(Postman) : [postman](https://www.postman.com/lujir/workspace/goang/collection/68296359f71692b64e5fceaa?action=share&creator=30286824)

#### 1. Connection
Url :
- http://localhost (Client)
- http://localhost/driver (Driver)

Header : 
- authorization : token


#### 2. Publish Location (Driver)
Event : driver/location
Format (json) :
```json
{
    "token": "string",
    "isFull": false,
    "location": {
        "lat": 38.8951,
        "long": -77.0364 
    }
}
```
if it's not valid, location will not be forwarded to client.



#### 3. Subscribe (Client)
Available Event :
- route/01
- route/02
- route/03
- route/04
- route/05
- route/06
- route/07
- route/08
- route/09
- route/10

Received Data (json) : 
```json
{
    "driverId": "string",
    "isFull": false,
    "location": {
        "lat": 38.8951,
        "long": -77.0364
    }
}
```
Always validate the location before use, make sure it's right lat and long format with type number
