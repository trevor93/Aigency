/*
  # Admin Dashboard Schema

  1. New Tables
    - `clients`
      - `id` (uuid, primary key) - Unique identifier for each client
      - `name` (text) - Client's full name or company name
      - `email` (text, unique) - Client's email address
      - `phone` (text) - Client's phone number
      - `company` (text) - Company name if applicable
      - `subscription_tier` (text) - Subscription level (basic/pro/enterprise)
      - `status` (text) - Client status (active/suspended/cancelled)
      - `payment_status` (text) - Current payment status (current/overdue/pending)
      - `monthly_recurring_revenue` (numeric) - MRR amount
      - `next_payment_date` (date) - Date of next scheduled payment
      - `created_at` (timestamptz) - Client account creation date
      - `last_payment_date` (date) - Date of last successful payment
      - `notes` (text) - Admin notes about the client

    - `automation_logs`
      - `id` (uuid, primary key) - Unique identifier for each log entry
      - `client_id` (uuid, foreign key) - Reference to client
      - `automation_type` (text) - Type of automation (payment_reminder/suspension/reactivation/report)
      - `status` (text) - Log status (success/failed/pending)
      - `message` (text) - Log message details
      - `metadata` (jsonb) - Additional data in JSON format
      - `created_at` (timestamptz) - When the automation was triggered

    - `payment_transactions`
      - `id` (uuid, primary key) - Unique identifier for each transaction
      - `client_id` (uuid, foreign key) - Reference to client
      - `amount` (numeric) - Transaction amount
      - `status` (text) - Payment status (completed/failed/pending/refunded)
      - `payment_method` (text) - Payment method used
      - `transaction_date` (timestamptz) - When transaction occurred
      - `notes` (text) - Transaction notes

  2. Security
    - Enable RLS on all tables
    - Authenticated users (admins) can view and manage all records
    - No public access to admin data

  3. Important Notes
    - All tables require authentication to access
    - Comprehensive tracking for client management and automation
    - JSON metadata for flexible automation log data
    - Foreign key relationships for data integrity
*/

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  company text,
  subscription_tier text DEFAULT 'basic',
  status text DEFAULT 'active',
  payment_status text DEFAULT 'current',
  monthly_recurring_revenue numeric DEFAULT 0,
  next_payment_date date,
  last_payment_date date,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS automation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  automation_type text NOT NULL,
  status text DEFAULT 'pending',
  message text NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  status text DEFAULT 'pending',
  payment_method text,
  transaction_date timestamptz DEFAULT now(),
  notes text
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view clients"
  ON clients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert clients"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update clients"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete clients"
  ON clients
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view automation logs"
  ON automation_logs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert automation logs"
  ON automation_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update automation logs"
  ON automation_logs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete automation logs"
  ON automation_logs
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view payment transactions"
  ON payment_transactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert payment transactions"
  ON payment_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update payment transactions"
  ON payment_transactions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete payment transactions"
  ON payment_transactions
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_payment_status ON clients(payment_status);
CREATE INDEX IF NOT EXISTS idx_automation_logs_client_id ON automation_logs(client_id);
CREATE INDEX IF NOT EXISTS idx_automation_logs_created_at ON automation_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_client_id ON payment_transactions(client_id);
