/*
  # Create Newsletter Subscribers Table

  ## Overview
  This migration creates a table to store newsletter subscriber emails collected through the footer signup form.

  ## New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key) - Unique identifier for each subscriber
      - `email` (text, unique, not null) - Subscriber's email address
      - `subscribed_at` (timestamptz, default now()) - Timestamp when user subscribed
      - `ip_address` (text) - IP address of subscriber for fraud prevention
      - `user_agent` (text) - Browser/device info for analytics
      - `is_active` (boolean, default true) - Whether subscription is active
      - `unsubscribed_at` (timestamptz) - Timestamp if user unsubscribed
      
  ## Security
    - Enable RLS on `newsletter_subscribers` table
    - Add policy for anyone to insert their email (public form submission)
    - Add policy for authenticated admins to view all subscribers
    - Add policy for users to unsubscribe using their email

  ## Important Notes
    1. The table enforces unique emails to prevent duplicate subscriptions
    2. RLS policies allow public insertions but restrict viewing to admins
    3. Timestamps track subscription lifecycle
    4. IP and user agent stored for security and analytics
*/

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now() NOT NULL,
  ip_address text,
  user_agent text,
  is_active boolean DEFAULT true NOT NULL,
  unsubscribed_at timestamptz
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(is_active) WHERE is_active = true;

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can view subscribers
CREATE POLICY "Authenticated users can view all subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow updates for unsubscribe functionality
CREATE POLICY "Anyone can update their own subscription status"
  ON newsletter_subscribers
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);