SELECT 
    ase.user_id,
    ase.exam_version_id,
    ase.video_version_id,
    MAX(ase.id) answer_session_id
FROM public.answer_session ase
WHERE ase.exam_version_id IS NOT NULL 
OR ase.video_version_id IS NOT NULL
GROUP BY
    ase.user_id,
    ase.exam_version_id,
    ase.video_version_id