/*
  # Contact Form Submissions Schema

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Contact's full name
      - `email` (text) - Contact's email address
      - `message` (text) - Message content from contact
      - `service_interest` (text) - Type of service interested in (Website/Automation/Subscription)
      - `submission_type` (text) - Type of form submission (contact/chat_widget)
      - `created_at` (timestamptz) - Timestamp of submission
      - `status` (text) - Status of lead (new/contacted/qualified/closed)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for inserting submissions (public access for form submissions)
    - Add policy for reading submissions (authenticated admin access only)

  3. Important Notes
    - Public can insert new submissions (lead capture)
    - Only authenticated users can view submissions (admin/staff access)
    - Submissions are tracked with status for CRM purposes
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  service_interest text NOT NULL,
  submission_type text DEFAULT 'contact',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submission status"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
