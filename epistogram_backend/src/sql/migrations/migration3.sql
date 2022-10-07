-- select * from role_permission_bridge rpb 
-- left join public.role r
-- ON r.id = rpb.role_id

-- left join public.permission pe
-- ON pe.id = rpb.permission_id

-- select * from public.permission 
-- select * from public.role 

	
-- Make ADMINISTRATE_COMPANY a company scoped permission
update public.permission 
set 
	scope = 'COMPANY', 
	code = 'ADMINISTRATE_COMPANY' 
where id = 41

-- Create new bridge between 'Company HR Viewer' role and 'ADMINISTRATE_COMPANY' permission
insert into public.role_permission_bridge (role_id, permission_id)
valuesw
	(2, 41)

-- Create new bridge between 'Company Owner' and 'ADMINISTRATE_COMPANY' permission
insert into public.role_permission_bridge (role_id, permission_id)
values
	(1, 41)
	
