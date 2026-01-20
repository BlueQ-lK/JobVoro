-- Create job_timeline table to track status changes
CREATE TABLE IF NOT EXISTS job_timeline (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL CHECK (status IN ('Applied', 'Interview', 'Offer', 'Rejected', 'Waiting')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_timeline_job_id ON job_timeline(job_id);
CREATE INDEX IF NOT EXISTS idx_job_timeline_created_at ON job_timeline(created_at);

-- Add trigger for updated_at (function update_updated_at_column should already exist from script 03)
DROP TRIGGER IF EXISTS update_job_timeline_updated_at ON job_timeline;
CREATE TRIGGER update_job_timeline_updated_at 
    BEFORE UPDATE ON job_timeline
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
