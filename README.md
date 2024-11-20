# Receipt Processor API

A simple receipt processor API that calculates points based on receipts.

## Features

- Submit a receipt for processing and receive a unique receipt ID
- Retrieve the points awarded for a specific receipt using the receipt ID
- Points calculation based on predefined rules

## How to Run Using Docker

### Prerequisites

- Docker must be installed on your system

### Steps

1. Clone the Repository

```bash
git clone https://github.com/yourusername/receipt-processor.git
cd receipt-processor
```

2. Build and Run with Docker

```bash
docker build -t receipt-processor .
docker run -p 3000:3000 receipt-processor
```

The API will be available at `http://localhost:3000`

## API Endpoints

### 1. Process Receipts

- **Endpoint**: `/receipts/process`
- **Method**: POST
- **Description**: Submits a receipt for processing and returns a unique receipt ID

**Request Body:**

```json
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    }
  ],
  "total": "6.49"
}
```

**Response:**

```json
{
  "id": "unique-receipt-id"
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/receipts/process \
-H "Content-Type: application/json" \
-d '{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [{"shortDescription": "Mountain Dew 12PK", "price": "6.49"}],
  "total": "6.49"
}'
```

### 2. Get Points

- **Endpoint**: `/receipts/{id}/points`
- **Method**: GET
- **Description**: Retrieves the points awarded for a receipt
- **Path Parameter**: `id` (string) - The unique receipt ID

**Response:**

```json
{
  "points": 50
}
```

**Example Request:**

```bash
curl -X GET http://localhost:3000/receipts/{id}/points
```

## Points Calculation Rules

1. One point for every alphanumeric character in the retailer name
2. 50 points if the total is a round dollar amount with no cents
3. 25 points if the total is a multiple of 0.25
4. 5 points for every two items on the receipt
5. For items with description length multiple of 3:
   - Multiply price by 0.2
   - Round up to nearest integer
6. 6 points if the day in the purchase date is odd
7. 10 points if purchase time is between 2:00 PM and 4:00 PM

## Running Without Docker

```bash
# Install Dependencies
npm install

# Run the Application
node app.js
```

The API will be running at `http://localhost:3000`

## Notes

- Data is stored in memory and does not persist between application restarts
- Replace `{id}` with the actual receipt ID when testing the points endpoint
