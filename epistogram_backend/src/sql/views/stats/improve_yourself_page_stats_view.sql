SELECT
    u.id user_id,

    -- most frequent time range
    '15:00-18:00' most_productive_time_range,
    'Monday' most_active_day
FROM public.user u