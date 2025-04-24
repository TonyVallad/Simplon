**<h1 align="center">Python APIs: Overview and Usage</h1>**

## What is a Python API?

An **Application Programming Interface (API)** in Python is a set of rules, protocols, and tools that allows different software applications to communicate with each other. APIs define the methods and data formats that applications can use to request and exchange information.

In the Python ecosystem, APIs can refer to:

1. **Python's Standard Library APIs** - Built-in modules and functions that come with Python
2. **Third-party Library APIs** - External packages with their own interfaces
3. **Web APIs** - HTTP-based services that Python can interact with
4. **Framework APIs** - Interfaces provided by Python frameworks like Django or Flask

## Types of Python APIs

### 1. Python's Standard Library APIs

Python's standard library offers extensive APIs for various tasks:

- **File Operations**: `open()`, `os` module
- **Data Structures**: `list`, `dict`, `set`
- **Networking**: `socket`, `http.client`
- **Data Processing**: `json`, `csv`, `xml`

```python
import json

# Using the json API to parse a string
data = json.loads('{"name": "John", "age": 30}')
print(data['name'])  # Output: John
```

### 2. Third-party Library APIs

Popular third-party Python libraries provide powerful APIs:

- **Data Science**: NumPy, Pandas, SciPy
- **Web Scraping**: BeautifulSoup, Scrapy
- **Machine Learning**: TensorFlow, PyTorch, scikit-learn
- **Web Development**: Django, Flask

```python
import pandas as pd

# Using Pandas API to read a CSV file
df = pd.read_csv('data.csv')
filtered_data = df[df['age'] > 25]
```

### 3. Web APIs

Python can interact with remote services through HTTP requests:

- **RESTful APIs** - The most common web API architecture
- **GraphQL APIs** - Query language for APIs
- **SOAP APIs** - Protocol for exchanging structured information

```python
import requests

# Making a GET request to a REST API
response = requests.get('https://api.example.com/data')
if response.status_code == 200:
    data = response.json()
    print(data)
```

### 4. Creating Your Own APIs

Python allows developers to create their own APIs:

- **Function-based APIs** - Collections of functions
- **Class-based APIs** - Object-oriented interfaces
- **Web APIs** - Using frameworks like Flask or FastAPI

```python
# A simple function-based API
def calculate_area(shape, **kwargs):
    if shape == 'rectangle':
        return kwargs['width'] * kwargs['height']
    elif shape == 'circle':
        return 3.14 * kwargs['radius'] ** 2
    else:
        raise ValueError("Unsupported shape")
```

## Working with Web APIs in Python

### RESTful API Basics

REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs typically:

1. Use HTTP methods (GET, POST, PUT, DELETE)
2. Are stateless
3. Have resource-based URLs
4. Transfer data in standard formats (JSON, XML)

### Making API Requests

The `requests` library is the standard for HTTP requests in Python:

```python
import requests

# GET request
response = requests.get('https://api.github.com/users/python')

# POST request with JSON data
new_user = {'name': 'John', 'job': 'Developer'}
response = requests.post('https://reqres.in/api/users', json=new_user)

# PUT request to update a resource
updated_data = {'name': 'John Smith'}
response = requests.put('https://reqres.in/api/users/1', json=updated_data)

# DELETE request
response = requests.delete('https://reqres.in/api/users/1')
```

### Authentication Methods

Many APIs require authentication:

```python
# Basic Authentication
response = requests.get('https://api.example.com/data',
                      auth=('username', 'password'))

# API Key Authentication
params = {'api_key': 'your_api_key'}
response = requests.get('https://api.example.com/data', params=params)

# OAuth2 Authentication
headers = {'Authorization': 'Bearer your_access_token'}
response = requests.get('https://api.example.com/data', headers=headers)
```

### Handling API Responses

Processing API responses properly is crucial:

```python
response = requests.get('https://api.example.com/data')

# Check if request was successful
if response.status_code == 200:
    # Parse JSON response
    data = response.json()
    
    # Process the data
    for item in data['items']:
        print(item['name'])
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```

## Building APIs with Python

### Creating a Simple API with Flask

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample data
books = [
    {'id': 1, 'title': 'The Great Gatsby', 'author': 'F. Scott Fitzgerald'},
    {'id': 2, 'title': 'To Kill a Mockingbird', 'author': 'Harper Lee'}
]

# GET endpoint to retrieve all books
@app.route('/api/books', methods=['GET'])
def get_books():
    return jsonify(books)

# GET endpoint to retrieve a specific book
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = next((book for book in books if book['id'] == book_id), None)
    if book:
        return jsonify(book)
    return jsonify({'error': 'Book not found'}), 404

# POST endpoint to add a new book
@app.route('/api/books', methods=['POST'])
def add_book():
    if not request.json or 'title' not in request.json:
        return jsonify({'error': 'Invalid data'}), 400
    
    book = {
        'id': books[-1]['id'] + 1 if books else 1,
        'title': request.json['title'],
        'author': request.json.get('author', '')
    }
    books.append(book)
    return jsonify(book), 201

if __name__ == '__main__':
    app.run(debug=True)
```

### Modern API Development with FastAPI

FastAPI is a modern, fast web framework for building APIs:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI()

# Data model
class Book(BaseModel):
    id: Optional[int] = None
    title: str
    author: str

# Sample data
books = [
    Book(id=1, title="The Great Gatsby", author="F. Scott Fitzgerald"),
    Book(id=2, title="To Kill a Mockingbird", author="Harper Lee")
]

# GET endpoint to retrieve all books
@app.get("/api/books", response_model=List[Book])
def get_books():
    return books

# GET endpoint to retrieve a specific book
@app.get("/api/books/{book_id}", response_model=Book)
def get_book(book_id: int):
    book = next((b for b in books if b.id == book_id), None)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

# POST endpoint to add a new book
@app.post("/api/books", response_model=Book, status_code=201)
def add_book(book: Book):
    book.id = max(b.id for b in books) + 1 if books else 1
    books.append(book)
    return book
```

## Best Practices for API Development

### 1. Documentation

Always document your APIs thoroughly:

- Use docstrings for functions and classes
- Consider tools like Swagger/OpenAPI for web APIs
- Include examples of usage

### 2. Error Handling

Implement robust error handling:

```python
def get_user_data(user_id):
    try:
        response = requests.get(f"https://api.example.com/users/{user_id}")
        response.raise_for_status()  # Raise exception for HTTP errors
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except requests.exceptions.ConnectionError:
        print("Connection error occurred")
    except requests.exceptions.Timeout:
        print("Request timed out")
    except requests.exceptions.RequestException as err:
        print(f"Error occurred: {err}")
    return None
```

### 3. Rate Limiting

Respect API rate limits and implement throttling:

```python
import time
import requests

def rate_limited_request(url, max_calls, period):
    """Make requests while respecting rate limits"""
    responses = []
    
    for i in range(max_calls):
        response = requests.get(url)
        responses.append(response)
        
        # Sleep to respect rate limit if we have more calls to make
        if i < max_calls - 1:
            time.sleep(period / max_calls)
            
    return responses
```

### 4. Versioning

Version your APIs to maintain backward compatibility:

- URL versioning: `/api/v1/resources`
- Header versioning: `Accept: application/vnd.company.v1+json`
- Parameter versioning: `/api/resources?version=1`

## Common Python API Libraries

### For Consuming APIs:
- **requests**: HTTP library for making API calls
- **aiohttp**: Asynchronous HTTP client/server
- **gRPC**: High-performance RPC framework
- **zeep**: SOAP client
- **graphql-client**: GraphQL client

### For Building APIs:
- **Flask**: Lightweight web framework
- **Django REST Framework**: Powerful API toolkit for Django
- **FastAPI**: Modern, high-performance API framework
- **Falcon**: Minimalist WSGI API framework
- **Quart**: Asynchronous Flask-like framework

## Conclusion

Python APIs are essential tools for modern software development, enabling applications to communicate, share data, and integrate with services. Whether you're consuming third-party APIs or building your own, Python offers a rich ecosystem of libraries and frameworks to simplify API development and interaction.

By following best practices and leveraging Python's strengths, developers can create robust, efficient, and user-friendly APIs that enhance the functionality and interoperability of their applications.

## References

1. Python Requests Library Documentation: https://docs.python-requests.org/
2. Flask Documentation: https://flask.palletsprojects.com/
3. FastAPI Documentation: https://fastapi.tiangolo.com/
4. RESTful API Design Best Practices: https://restfulapi.net/
5. OpenAPI Specification: https://swagger.io/specification/ 