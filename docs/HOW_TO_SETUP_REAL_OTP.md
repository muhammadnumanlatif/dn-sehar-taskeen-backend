# How to Setup Real WhatsApp OTP (Step-by-Step)

Currently, the system is in "Simulation Mode". To send **REAL** WhatsApp messages, you need to connect to a provider. The best and most reliable free option (for the first 1000 conversations/month) is the **Meta (Facebook) WhatsApp Cloud API**.

## Step 1: Get Meta Credentials
1. Go to [developers.facebook.com](https://developers.facebook.com/).
2. Create a **Business App**.
3. Add **WhatsApp** product to your app.
4. You will get a **Test Phone Number** and a temporary **Access Token**.
5. Add your own phone number (`00923379912300`) to the "Recipient List" in the dashboard to execute tests.

## Step 2: Set up the Backend Server
Real OTPs cannot be sent safely from the Frontend (React) because it would expose your API Keys. You need a small backend server.

We have created a `backend` folder for you.

1. Open a **New Terminal**.
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure your keys:
   - Create a `.env` file in the `backend/` folder.
   - Add the following content:
     ```
     PORT=5000
     # Get these from Meta Dashboard
     WHATSAPP_TOKEN= EAAV7snkh7MMBQSvfjckmNTkBIsQnIkF6TjOfvHFr8MvXTQlNZC43ZCKBsdKVmwlZBYkxMZA81jp3Qp1gwW4XLSeZCxBi1IZCZCK6sAM1VezgFpy5rEk9R8Fc8IH9tW1znz9BWcvKiw60RJBQ7sMo3wTUZBEX6Ej4F6vRHLQ514SmKkL7Kk8Sw9kE90YdBjEPjgtZACMtlnigon4wYTKO74Rt74JJGskIbSWF8avP4EB385qweYxeoOU5KZB1Aya3ffyTn66uBxQBnXZCAbQ7q0W5MkJyxaVQ2yoZCBEZD
     WHATSAPP_PHONE_ID= 00923379912300
     ```
5. Start the server:
   ```bash
   npm start
   ```

## Step 3: Connect Frontend
The `AuthContext.jsx` has already been updated to look for this server!

- If the server is running at `http://localhost:5000`, the App will try to send a real message.
- If the server is **not** running (or fails), the App will automatically fall back to "Simulation Mode" (Alert Box).

## Step 4: Verify
1. Ensure `npm start` is running in the `backend` folder.
2. Ensure `npm run dev` is running in the main project folder.
3. Go to `/admin` dashboard login.
4. Enter your phone number.
5. You should receive a **REAL WhatsApp message** with your code!
