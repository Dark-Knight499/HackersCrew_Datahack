import mysql.connector
from mysql.connector import pooling
import os
from dotenv import load_dotenv

load_dotenv()

db_config = {
    "host": os.getenv("DATABASE_HOST"),
    "user": os.getenv("DATABASE_USER"),
    "password": os.getenv("DATABASE_PASSWORD"),
    "database": os.getenv("DATABASE"),
    "pool_name": "mypool",
    "pool_size": 5
}

connection_pool = mysql.connector.pooling.MySQLConnectionPool(**db_config)

async def create_user(email_id, username, password):
    connection = connection_pool.get_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute(
            "INSERT INTO user (emailId, password) VALUES (%s, %s)",
            (email_id, password)
        )
        connection.commit()
    finally:
        cursor.close()
        connection.close()

async def linechart(user):
    connection = connection_pool.get_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        query = """
        SELECT COUNT(ques.q_check) as correct_count
        FROM quiz q
        LEFT JOIN question ques ON q.quiz_id = ques.quiz_id
        WHERE q.email = %s AND ques.q_check = 1
        GROUP BY q.quiz_id
        ORDER BY q.quiz_id
        """
        cursor.execute(query, (user))

        results = [count[0] for count in cursor.fetchall()]
        connection.commit()
        return results
        
    finally:
        cursor.close()
        connection.close()

async def piechart(user):
    connection = connection_pool.get_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        query = """
        SELECT 
            ques.q_check,
            COUNT(*) as count
        FROM quiz q
        JOIN question ques ON q.quiz_id = ques.quiz_id
        WHERE q.email = %s
        GROUP BY ques.q_check
        ORDER BY ques.q_check
        """
        cursor.execute(query, (user))

        counts = {0: 0, 1: 0, 2: 0}
        for (check_value, count) in cursor:
            counts[check_value] = count

        connection.commit()
        return [counts[0], counts[1], counts[2]]
      
    finally:
        cursor.close()
        connection.close()

async def radarchart(user):
    connection = connection_pool.get_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        query = """
        SELECT 
            ques.diff,
            COUNT(*) as count
        FROM quiz q
        JOIN question ques ON q.quiz_id = ques.quiz_id
        WHERE q.email = %s
        GROUP BY ques.diff
        ORDER BY ques.diff
        """
        
        cursor.execute(query, (user))
        
        counts = [0] * 10
        
        for (diff, count) in cursor:
                counts[diff-1] = count
                
        return counts
      
    finally:
        cursor.close()
        connection.close()

async def radialchart(user):
    count = piechart(user)
    return count[1]/(count[0] + count[1] + count[2])

