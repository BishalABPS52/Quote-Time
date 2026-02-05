
CREATE TABLE IF NOT EXISTS quotes (
    -- Primary key - auto-incrementing quote ID
    quote_id SERIAL PRIMARY KEY,
    
    -- Quote content (unique to prevent duplicates)
    content TEXT NOT NULL UNIQUE,
    
    -- Author information
    author VARCHAR(255) NOT NULL,
    
    -- Tags/categories as array
    tags VARCHAR(50)[] DEFAULT '{}',
    
    -- Status tracking
    shown BOOLEAN DEFAULT FALSE NOT NULL,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    shown_at TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT check_content_not_empty CHECK (LENGTH(TRIM(content)) > 0),
    CONSTRAINT check_author_not_empty CHECK (LENGTH(TRIM(author)) > 0)
);

-- Index for filtering by shown status (most frequently used query)
CREATE INDEX IF NOT EXISTS idx_quotes_shown 
ON quotes(shown) 
WHERE shown = FALSE;

-- Index for searching by author
CREATE INDEX IF NOT EXISTS idx_quotes_author 
ON quotes(author);

-- Index for sorting by creation date
CREATE INDEX IF NOT EXISTS idx_quotes_created_at 
ON quotes(created_at DESC);

-- Composite index for common queries
CREATE INDEX IF NOT EXISTS idx_quotes_shown_created 
ON quotes(shown, created_at DESC);

-- ================================================================
-- Create useful views
-- ================================================================

-- View for unshown quotes
CREATE OR REPLACE VIEW unshown_quotes AS
SELECT quote_id, content, author, tags, created_at
FROM quotes
WHERE shown = FALSE
ORDER BY created_at DESC;

-- View for shown quotes
CREATE OR REPLACE VIEW shown_quotes AS
SELECT quote_id, content, author, tags, shown_at
FROM quotes
WHERE shown = TRUE
ORDER BY shown_at DESC;

-- ================================================================
-- Insert sample quotes (optional - for testing)
-- ================================================================

INSERT INTO quotes (content, author, tags, shown) VALUES
('The only way to do great work is to love what you do.', 'Steve Jobs', ARRAY['motivation', 'work'], FALSE),
('Innovation distinguishes between a leader and a follower.', 'Steve Jobs', ARRAY['innovation', 'leadership'], FALSE),
('Life is what happens when you''re busy making other plans.', 'John Lennon', ARRAY['life', 'wisdom'], FALSE)
ON CONFLICT (content) DO NOTHING;

-- ================================================================
-- Useful queries for management
-- ================================================================

-- Display table structure
\d quotes

-- Count total quotes
SELECT COUNT(*) as total_quotes FROM quotes;

-- Count shown vs not shown
SELECT 
    shown,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM quotes
GROUP BY shown;

-- Show all quotes with status
SELECT 
    quote_id,
    LEFT(content, 50) || '...' as content_preview,
    author,
    CASE WHEN shown THEN 'shown' ELSE 'not_shown' END as status,
    created_at
FROM quotes
ORDER BY quote_id;

-- ================================================================
-- Utility functions
-- ================================================================

-- Function to reset all quotes to not shown
CREATE OR REPLACE FUNCTION reset_all_quotes()
RETURNS void AS $$
BEGIN
    UPDATE quotes SET shown = FALSE, shown_at = NULL;
    RAISE NOTICE 'All quotes have been reset to not shown';
END;
$$ LANGUAGE plpgsql;

-- Function to mark a quote as shown
CREATE OR REPLACE FUNCTION mark_quote_shown(p_quote_id INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE quotes 
    SET shown = TRUE, shown_at = CURRENT_TIMESTAMP 
    WHERE quote_id = p_quote_id;
    RAISE NOTICE 'Quote % marked as shown', p_quote_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get random unshown quote
CREATE OR REPLACE FUNCTION get_random_unshown_quote()
RETURNS TABLE (
    quote_id INTEGER,
    content TEXT,
    author VARCHAR,
    tags VARCHAR[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT q.quote_id, q.content, q.author, q.tags
    FROM quotes q
    WHERE q.shown = FALSE
    ORDER BY RANDOM()
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- ================================================================
-- Usage examples
-- ================================================================

-- To reset all quotes:
-- SELECT reset_all_quotes();

-- To mark a specific quote as shown:
-- SELECT mark_quote_shown(1);

-- To get a random unshown quote:
-- SELECT * FROM get_random_unshown_quote();

-- ================================================================
-- Grants (if using specific user)
-- ================================================================

-- Grant permissions to qotd_user
GRANT ALL PRIVILEGES ON TABLE quotes TO qotd_user;
GRANT USAGE, SELECT ON SEQUENCE quotes_quote_id_seq TO qotd_user;
GRANT SELECT ON unshown_quotes TO qotd_user;
GRANT SELECT ON shown_quotes TO qotd_user;

-- ================================================================
-- Done!
-- ================================================================
\echo 'Database schema created successfully!'
\echo 'Table: quotes'
\echo 'Views: unshown_quotes, shown_quotes'
\echo 'Functions: reset_all_quotes(), mark_quote_shown(), get_random_unshown_quote()'
