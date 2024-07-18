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
# User Signup
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
```python
# otp function
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import random

def main(req):
    data = json.loads(req) if isinstance(req, str) else req
    sender_email = "rookie-admin@rookiecab.com"
    receiver_email = data.get('user_email')
    password = "dummy@12345"

    random_number = random.randint(10000, 99999)

    # Create a multipart message
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "Verfication Email from RookieCab"

    # Body of the email
    body = "This is a verification email sent from a RookieCab. Your Verification Code is " + str(random_number);
    msg.attach(MIMEText(body, "plain"))

    try:
        # Connect to the SMTP server
        server = smtplib.SMTP_SSL("mail.privateemail.com", 465)
        #server.starttls()  # Upgrade the connection to secure
        server.login(sender_email, password)

        # Send the email
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': "Email sent successfully!", 'code': random_number})
        }
    except Exception as e:
        return {"error": str(e)}
```
```python
# Checking the User in DB
import json
import mysql.connector
import os

def main(req):
    data = json.loads(req) if isinstance(req, str) else req
    email = data.get('user_email')

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
    
    # Check if the user exists with the given password
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    # Close the database connection
    cursor.close()
    conn.close()

    # Return the appropriate response
    if user:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'User already exists with this username', 'redirect': '/login'})
        }
    else:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'Great', 'redirect': '/login'})
        }
```
```python
# login functionality
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
    
    # Check if the user exists with the given password
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()

    # Close the database connection
    cursor.close()
    conn.close()

    # Return the appropriate response
    if user:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'Login successful', 'redirect': '/dashboard'})
        }
    else:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'Invalid credentials', 'redirect': '/login'})
        }
```
```python
# Forgot Password Functionality
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

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user:
        cursor.execute("UPDATE users SET password = %s WHERE email = %s", (password, email))
        conn.commit()  # Commit the changes

        response = {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': 'Password Updated', 'redirect': '/dashboard'})
        }
    else:
        response = {
            'statusCode': 200,  # User not found
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'message': "User Doesn't exist", 'redirect': '/dashboard'})
        }

    # Close the database connection
    cursor.close()
    conn.close()

    # Return the appropriate response
    return response
```
