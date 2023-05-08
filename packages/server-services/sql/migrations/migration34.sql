CREATE TABLE IF NOT EXISTS course_category_assignment_bridge (
    id SERIAL PRIMARY KEY,
    course_category_id INT NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY (course_category_id) REFERENCES public.course_category(id),
    FOREIGN KEY (company_id) REFERENCES public.company(id)
);

-- Create course_category assignments to EpistoGram
INSERT INTO public.course_category_assignment_bridge (company_id, course_category_id)
SELECT
    co.id company_id,
    cc.id course_category_id
FROM public.company co, public.course_category cc

WHERE co.id = 2;