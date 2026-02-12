
-- Profiles
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  display_name text,
  is_admin boolean DEFAULT false,
  readiness_score int DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Topics
CREATE TABLE topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true
);

-- Concepts
CREATE TABLE concepts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  summary text,
  formula text,
  is_active boolean DEFAULT true
);

-- Questions
CREATE TABLE questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES topics(id),
  difficulty int CHECK (difficulty BETWEEN 1 AND 5),
  question_type text CHECK (question_type IN ('single', 'multi')),
  prompt text NOT NULL,
  explanation_short text,
  hint text,
  source text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Choices
CREATE TABLE question_choices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  choice_key text NOT NULL,
  text text NOT NULL,
  is_correct boolean DEFAULT false
);

-- Link Questions to Concepts
CREATE TABLE question_concepts (
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  concept_id uuid REFERENCES concepts(id) ON DELETE CASCADE,
  weight float DEFAULT 1.0,
  PRIMARY KEY (question_id, concept_id)
);

-- Mastery Tracking
CREATE TABLE concept_mastery (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  concept_id uuid REFERENCES concepts(id) ON DELETE CASCADE,
  mastery_level int DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 5),
  lifetime_attempts int DEFAULT 0,
  lifetime_correct int DEFAULT 0,
  recent_streak int DEFAULT 0,
  last_attempt_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (user_id, concept_id)
);

-- Spaced Repetition Queue
CREATE TABLE review_queue (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  concept_id uuid REFERENCES concepts(id) ON DELETE CASCADE,
  due_at timestamp with time zone DEFAULT now(),
  interval_days int DEFAULT 1,
  PRIMARY KEY (user_id, concept_id)
);

-- Practice Sessions
CREATE TABLE practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  mode text NOT NULL,
  topic_id uuid REFERENCES topics(id),
  started_at timestamp with time zone DEFAULT now(),
  ended_at timestamp with time zone,
  target_count int NOT NULL,
  correct_count int DEFAULT 0,
  question_count int DEFAULT 0
);

-- User Answers
CREATE TABLE user_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  session_id uuid REFERENCES practice_sessions(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id),
  selected_choice_ids jsonb NOT NULL,
  is_correct boolean NOT NULL,
  time_ms int,
  answered_at timestamp with time zone DEFAULT now()
);

-- Resources
CREATE TABLE resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  url text,
  description text,
  is_active boolean DEFAULT true
);

-- Row Level Security (Simple Example)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- (Repeat for other tables following the logic in prompt)
