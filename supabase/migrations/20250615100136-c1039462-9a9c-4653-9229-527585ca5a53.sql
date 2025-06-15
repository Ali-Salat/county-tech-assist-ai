
-- Insert Ali Salat as a super user
INSERT INTO public.users (
  email, 
  name, 
  role, 
  department, 
  title
) VALUES (
  'ellisalat@gmail.com',
  'Ali Salat',
  'superuser',
  'ICT, Trade, Investment and Industry',
  'System Administrator'
) ON CONFLICT (email) DO UPDATE SET
  name = 'Ali Salat',
  role = 'superuser',
  department = 'ICT, Trade, Investment and Industry',
  title = 'System Administrator',
  updated_at = now();
