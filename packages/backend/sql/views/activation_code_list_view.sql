SELECT 
	ac.id activation_code_id,
	ac.code,
	ac.is_used,
	ac.company_id,
	
FROM public.activation_code ac