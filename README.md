# RookieCab.com

This project was created with an idea to provide a platform for students to give rides and a interfact for students to ask for rides.

## Running this code

To run this code you need to have npm install and 'angular-cli'.

After successfully installing all the dependencies you can run it using the following command:

```bash
ng serve
```

## Prerequisites 

You wouldn't be able to run the entire applucation since you do not have the backend logic which you need to send requests to database (for which I have used Digital Ocean). You can run and use the frond end side of the project without any issue. To run the entire and test the entire application you might find the following code snippets helful.

```python
import json
import mysql.connector
import os

def main(req):
    data = json.loads(req) if isinstance(req, str) else req
    email = data.get('user_email')
    password = data.get('user_password')

    # Get database credentials from environment variables
    db_config = {
        'host': os.getenv('DATABASE_URL'),
        'user': os.getenv('DATABASE_USER'),
        'password': os.getenv('DATABASE_PASSWORD'),
        'database': os.getenv('DATABASE_NAME'),
        'port': 25060
    }

    # Connect to the database
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    insert_query_details = "INSERT INTO userDetails (email) VALUES (%s)"
    cursor.execute(insert_query_details, (email,))
    
    # Check if the user exists with the given password
    insert_query = "INSERT INTO users (email, password) VALUES (%s, %s)"
    cursor.execute(insert_query, (email, password))
    conn.commit()

    # Close the database connection
    cursor.close()
    conn.close()

    # Return the appropriate response
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'message': 'User Created', 'redirect': '/dashboard'})
    }
```
